import type { Component } from 'svelte';
import type { ZodType } from 'zod';
import { asset } from '$app/paths';
import { eventSchema, personSchema, projectSchema } from './schemas';
import type { Event, EventSummary, Person, Project, ProjectWithEvent } from './types';

type MdsvexModule = {
	default: Component;
	metadata: Record<string, unknown>;
};

export type SketchMeta = { title: string; author?: string };

type SketchModule = {
	default?: unknown;
	meta: SketchMeta;
};

const EXTERNAL = /^(https?:|mailto:|tel:|data:|#|\/\/)/;

function resolveAssetUrl(url: string | undefined): string | undefined {
	if (!url) return url;
	if (EXTERNAL.test(url)) return url;
	return asset(url as `/${string}`);
}

function deriveSlug(path: string): string {
	const file = path.split('/').pop() ?? '';
	return file.replace(/\.md$/, '');
}

function validate<T>(modules: Record<string, MdsvexModule>, schema: ZodType<T>, kind: string) {
	const out: Array<T & { slug: string; component: Component }> = [];
	for (const [path, mod] of Object.entries(modules)) {
		const slug = deriveSlug(path);
		const result = schema.safeParse(mod.metadata ?? {});
		if (!result.success) {
			const issues = result.error.issues
				.map((i) => `  - ${i.path.join('.') || '(root)'}: ${i.message}`)
				.join('\n');
			throw new Error(`Invalid frontmatter in ${kind} "${slug}" (${path}):\n${issues}`);
		}
		out.push({ ...result.data, slug, component: mod.default });
	}
	return out;
}

const eventModules = import.meta.glob<MdsvexModule>('/src/content/events/*.md', {
	eager: true
});
const personModules = import.meta.glob<MdsvexModule>('/src/content/people/*.md', {
	eager: true
});
const projectModules = import.meta.glob<MdsvexModule>('/src/content/projects/**/*.md', {
	eager: true
});

const rawEvents = validate(eventModules, eventSchema, 'event');
const rawPeople = validate(personModules, personSchema, 'person');
const rawProjects = validate(projectModules, projectSchema, 'project');

function isUpcoming(event: Event): boolean {
	const today = new Date();
	today.setHours(0, 0, 0, 0);
	return new Date(event.date) >= today;
}

export { isUpcoming };

const events: Event[] = rawEvents;

const people: Person[] = rawPeople.map((p) => ({ ...p, avatar: resolveAssetUrl(p.avatar) }));
const projects: Project[] = rawProjects.map((p) => ({ ...p, image: resolveAssetUrl(p.image) }));

const eventSlugs = new Set(events.map((e) => e.slug));
for (const project of projects) {
	if (!eventSlugs.has(project.event)) {
		throw new Error(
			`Project "${project.slug}" references unknown event "${project.event}". ` +
				`Add the event file under src/content/events/ or fix the project's "event" field.`
		);
	}
}

function byDateDesc<T extends { date: string }>(a: T, b: T): number {
	return b.date.localeCompare(a.date);
}

function byDateAsc<T extends { date: string }>(a: T, b: T): number {
	return a.date.localeCompare(b.date);
}

function toEventSummary(event: Event): EventSummary {
	return { slug: event.slug, title: event.title };
}

function withEvent(project: Project): ProjectWithEvent {
	return { ...project, event: toEventSummary(getEvent(project.event)!) };
}

function getProjectDate(project: Project): string {
	return getEvent(project.event)!.date;
}

function projectsByEventDateDesc(a: Project, b: Project): number {
	const cmp = getProjectDate(b).localeCompare(getProjectDate(a));
	if (cmp !== 0) return cmp;
	return a.slug.localeCompare(b.slug);
}

export function getEvents(): Event[] {
	return [...events].sort(byDateDesc);
}

export function getUpcomingEvents(): Event[] {
	return events.filter(isUpcoming).sort(byDateAsc);
}

export function getNextEvent(): Event | undefined {
	return getUpcomingEvents()[0];
}

export function getEvent(slug: string): Event | undefined {
	return events.find((e) => e.slug === slug);
}

export function getEventSlugs(): string[] {
	return events.map((e) => e.slug);
}

function personSortKey(p: Person): string {
	return p.name ?? `@${p.slug}`;
}

export function getPeople(): Person[] {
	return [...people].sort((a, b) => personSortKey(a).localeCompare(personSortKey(b)));
}

export function getPerson(slug: string): Person | undefined {
	return people.find((p) => p.slug === slug);
}

export function getPersonDisplayName(person: Person): string {
	if (person.displayHandle || !person.name) {
		return `@${person.slug}`;
	}
	return person.name;
}

export function getAvatarString(person: Person): string | null {
	const displayName = getPersonDisplayName(person);
	if (person.avatar) return null;
	const firstChar = displayName.charAt(0);
	return firstChar === '@' ? displayName.charAt(1).toUpperCase() : firstChar;
}

export function getPersonSlugs(): string[] {
	return people.map((p) => p.slug);
}

export function getProjects(): ProjectWithEvent[] {
	return [...projects].sort(projectsByEventDateDesc).map(withEvent);
}

export function getProject(slug: string): Project | undefined {
	return projects.find((p) => p.slug === slug);
}

export function getProjectSlugs(): string[] {
	return projects.map((p) => p.slug);
}

export function getProjectsByEvent(eventSlug: string): ProjectWithEvent[] {
	return projects
		.filter((p) => p.event === eventSlug)
		.sort((a, b) => a.slug.localeCompare(b.slug))
		.map(withEvent);
}

export function getProjectsByPerson(slug: string): ProjectWithEvent[] {
	return projects
		.filter((p) => p.author === slug)
		.sort(projectsByEventDateDesc)
		.map(withEvent);
}

function isOrganiser(p: Person): boolean {
	return p.roles?.includes('organiser') ?? false;
}

export function getOrganisers(): Person[] {
	return people
		.filter(isOrganiser)
		.sort((a, b) => personSortKey(a).localeCompare(personSortKey(b)));
}

export function getCommunity(): Person[] {
	return people
		.filter((p) => !isOrganiser(p))
		.sort((a, b) => personSortKey(a).localeCompare(personSortKey(b)));
}

type P5Instance = InstanceType<typeof import('p5').default>;

export type Sketch = {
	slug: string;
	sketch: (p: P5Instance) => void;
	meta: SketchMeta;
};

const sketchModules = import.meta.glob<SketchModule>('/src/content/sketches/*.js', {
	eager: true
});

const sketches: Sketch[] = Object.entries(sketchModules).flatMap(([path, mod]) => {
	const slug = deriveSlug(path);
	if (typeof mod.default !== 'function') return [];
	const sketch: Sketch = {
		slug,
		sketch: mod.default as (p: P5Instance) => void,
		meta: mod.meta
	};
	return [sketch];
});

export function getSketches(): Sketch[] {
	return sketches;
}

import type { Component } from 'svelte';
import type { z } from 'zod';
import type { eventSchema, personSchema, projectSchema } from './schemas';

export type Event = z.infer<typeof eventSchema> & {
	title: string;
	slug: string;
	component: Component;
};

export type EventSummary = Pick<Event, 'slug' | 'title'>;

export type Person = z.infer<typeof personSchema> & {
	slug: string;
	component: Component;
};

export type Project = z.infer<typeof projectSchema> & {
	slug: string;
	component: Component;
};

export type ProjectWithEvent = Omit<Project, 'event'> & { event: EventSummary };

export type Link = { label: string; url: string };

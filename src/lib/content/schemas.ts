import { z } from 'zod';

const isoDateString = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'expected YYYY-MM-DD');

const isoDate = z.preprocess((val) => {
	if (val instanceof Date) {
		const y = val.getUTCFullYear();
		const m = String(val.getUTCMonth() + 1).padStart(2, '0');
		const d = String(val.getUTCDate()).padStart(2, '0');
		return `${y}-${m}-${d}`;
	}
	if (typeof val === 'string') {
		const match = val.match(/^(\d{4}-\d{2}-\d{2})/);
		if (match) return match[1];
	}
	return val;
}, isoDateString);

const link = z.object({
	label: z.string().min(1),
	url: z.string().url()
});

export const eventSchema = z.object({
	date: isoDate,
	rsvp: z.string().url().optional()
});

export const personSchema = z.object({
	name: z.string().min(1).optional(),
	links: z.array(link).optional(),
	pronouns: z.string().optional(),
	avatar: z.string().min(1).optional(),
	roles: z.array(z.string()).optional(),
	displayHandle: z.boolean().optional()
});

export const projectSchema = z.object({
	title: z.string().min(1),
	event: z.string().min(1),
	author: z.string().nullable().optional(),
	links: z.array(link).optional(),
	image: z.string().min(1).optional(),
	tags: z.array(z.string()).optional()
});

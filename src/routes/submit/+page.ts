import type { Component } from 'svelte';
import type { PageLoad } from './$types';

type ContributingModule = {
	default: Component;
	metadata: Record<string, unknown>;
};

const modules = import.meta.glob<ContributingModule>('/CONTRIBUTING.md', {
	eager: true
});

const entry = Object.values(modules)[0];

export const load: PageLoad = () => {
	return { component: entry.default };
};

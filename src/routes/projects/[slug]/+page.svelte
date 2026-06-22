<script lang="ts">
	import { resolve } from '$app/paths';
	import ContentMeta from '$lib/components/ContentMeta.svelte';

	let { data } = $props();
	const project = $derived(data.project);
	const event = $derived(data.event);
	const Component = $derived(data.project.component);
</script>

<svelte:head>
	<title>{project.title} — Creative Code Bristol</title>
	{#if project.image}
		<meta property="og:image" content={project.image} />
	{/if}
</svelte:head>

<div class="container">
	<header class="project-header">
		<p class="back">
			<a href={resolve('/projects')}>← All projects</a>
		</p>
		<h1>{project.title}</h1>
		<ContentMeta {event} authorSlug={project.author ?? null} tags={project.tags} />
	</header>

	<article class="prose">
		<Component />
	</article>
</div>

<style>
	.project-header {
		margin-bottom: var(--space-5);
		padding-bottom: var(--space-4);
		border-bottom: var(--border);
	}
	.prose {
		max-width: var(--max-w);
	}
</style>

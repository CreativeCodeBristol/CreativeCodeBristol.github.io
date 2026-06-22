<script lang="ts">
	import { formatDate } from '$lib/utils/date';
	import ProjectCard from '$lib/components/ProjectCard.svelte';
	import { resolve } from '$app/paths';

	let { data } = $props();
	const event = $derived(data.event);
	const projects = $derived(data.projects);
</script>

<svelte:head>
	<title>{event.title} — Creative Code Bristol</title>
</svelte:head>

<div class="container">
	<header class="event-header">
		<p class="back">
			<a href={resolve('/events')}>← All events</a>
		</p>
		<h1>{event.title}</h1>
		<p class="date"><time datetime={event.date}>{formatDate(event.date)}</time></p>
	</header>

	{#if projects.length}
		<header class="section-head">
			<h2>Projects from this jam</h2>
			<span class="muted count">{projects.length}</span>
		</header>
		<div class="grid">
			{#each projects as project (project.slug)}
				<ProjectCard {project} />
			{/each}
		</div>
	{:else}
		<p class="muted">
			No projects from this jam yet — be the first to <a href={resolve('/submit')}>add one</a>.
		</p>
	{/if}
</div>

<style>
	.event-header {
		padding-bottom: var(--space-5);
		margin-bottom: var(--space-3);
		border-bottom: var(--border);
	}
	.date {
		font-family: var(--font-mono);
		font-size: 0.95rem;
		margin: var(--space-2) 0 0;
	}
	.count {
		font-family: var(--font-mono);
		font-size: 0.85rem;
	}
	.grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(18rem, 1fr));
		gap: var(--space-4);
	}
	.section-head {
		border-top: none;
		margin-top: 0;
		padding-top: 0;
	}
</style>

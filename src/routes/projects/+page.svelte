<script lang="ts">
	import { resolve } from '$app/paths';
	import ProjectCard from '$lib/components/ProjectCard.svelte';

	let { data } = $props();
</script>

<svelte:head>
	<title>Projects — Creative Code Bristol</title>
</svelte:head>

<div class="container">
	<header class="section-head no-border">
		<h2>Projects</h2>
	</header>

	{#if data.projects.length}
		<div class="grid">
			{#each data.projects as project (project.slug)}
				<ProjectCard {project} />
			{/each}
		</div>
	{:else}
		<p class="muted">No projects yet — be the first to <a href={resolve('/submit')}>add one</a>.</p>
	{/if}
</div>

<style>
	.grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(18rem, 1fr));
		gap: var(--space-4);
	}
</style>

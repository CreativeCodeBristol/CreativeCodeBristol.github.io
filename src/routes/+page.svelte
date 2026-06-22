<script lang="ts">
	import { resolve } from '$app/paths';
	import ProjectCard from '$lib/components/ProjectCard.svelte';
	import NextEventCard from '$lib/components/NextEventCard.svelte';
	import SketchCanvas from '$lib/components/SketchCanvas.svelte';
	import HeroBox from '$lib/components/HeroBox.svelte';

	let { data } = $props();
</script>

<svelte:head>
	<title>Creative Code Bristol</title>
</svelte:head>

<section class="hero-section">
	<div class="sketch">
		<SketchCanvas />
	</div>
	<div class="container hero-content">
		<HeroBox />
	</div>
</section>

<section class="container section">
	<header class="section-head no-border">
		<h2>Next jam</h2>
		<a class="see-all" href={resolve('/events')}>All events →</a>
	</header>
	{#if data.nextEvent}
		<NextEventCard event={data.nextEvent} />
	{:else}
		<p class="muted">
			No upcoming jams scheduled yet. Watch this space, or <a href={resolve('/submit')}
				>help us set the next one</a
			>.
		</p>
	{/if}
</section>

<section class="container section">
	<header class="section-head">
		<h2>Recent projects</h2>
		<a class="see-all" href={resolve('/projects')}>All projects →</a>
	</header>

	{#if data.recentProjects.length}
		<div class="grid">
			{#each data.recentProjects as project (project.slug)}
				<ProjectCard {project} />
			{/each}
		</div>
	{:else}
		<p class="muted">No projects yet — be the first to <a href={resolve('/submit')}>add one</a>.</p>
	{/if}
</section>

<style>
	.hero-section {
		position: relative;
		width: 100%;
	}

	.sketch {
		position: relative;
		height: 20vh;
		width: 100%;
		overflow: hidden;
		border-bottom: var(--border);
		margin-bottom: var(--space-4);
	}

	.grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(18rem, 1fr));
		gap: var(--space-4);
	}

	/* Desktop styling */
	@media (min-width: 500px) {
		.hero-section {
			border-bottom: var(--border);
		}
		.sketch {
			height: 40vh;
			border-bottom: none;
			margin-bottom: 0;
		}
		.hero-content {
			position: absolute;
			left: 0;
			right: 0;
			bottom: var(--space-4);
		}
	}
</style>

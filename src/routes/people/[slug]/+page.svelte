<script lang="ts">
	import { resolve } from '$app/paths';
	import ProjectCard from '$lib/components/ProjectCard.svelte';
	import { getAvatarString } from '$lib/content/index.js';

	let { data } = $props();
	const person = $derived(data.person);
	const projects = $derived(data.projects);
	const Component = $derived(data.person.component);
	const showHandleLine = $derived(!!person.name);
	const displayName = $derived(person.name ?? person.slug);
	const avatarString = $derived(getAvatarString(person));

	const subcontent = $derived.by(() => {
		const out: string[] = [];
		if (showHandleLine) out.push(`@${person.slug}`);
		if (person.pronouns) {
			if (out.length > 0) out.push('·');
			out.push(person.pronouns);
		}
		return out;
	});
</script>

<svelte:head>
	<title>{displayName} — Creative Code Bristol</title>
</svelte:head>

<div class="container">
	<header class="person-header">
		<p class="back">
			<a href={resolve('/people')}>← All people</a>
		</p>
		<div class="id">
			{#if person.avatar}
				<img class="avatar" src={person.avatar} alt="" />
			{:else}
				<div class="avatar placeholder" aria-hidden="true">
					{avatarString}
				</div>
			{/if}
			<div class="id-text">
				<h1>{displayName}</h1>
				{#if subcontent.length > 0}
					<p class="muted subcontent">
						{#each subcontent as str (str)}
							{` ${str} `}
						{/each}
					</p>
				{/if}
				{#if person.links && person.links.length}
					<ul class="links">
						{#each person.links as link (link.url)}
							<li>
								<a href={link.url} rel="noopener noreferrer" target="_blank">{link.label}</a>
							</li>
						{/each}
					</ul>
				{/if}
			</div>
		</div>
	</header>

	<section class="prose">
		<Component />
	</section>

	{#if projects.length}
		<header class="section-head">
			<h2>Projects</h2>
			<span class="muted count">{projects.length}</span>
		</header>
		<div class="grid">
			{#each projects as project (project.slug)}
				<ProjectCard {project} />
			{/each}
		</div>
	{/if}
</div>

<style>
	.person-header {
		margin-bottom: var(--space-6);
		padding-bottom: var(--space-5);
		border-bottom: var(--border);
	}
	.id {
		display: flex;
		gap: var(--space-5);
		align-items: center;
	}
	.avatar {
		width: 6rem;
		height: 6rem;
		object-fit: cover;
		background: var(--color-ink);
		display: block;
		flex-shrink: 0;
	}
	.avatar.placeholder {
		display: flex;
		align-items: center;
		justify-content: center;
		font-family: var(--font-display);
		font-size: 2.5rem;
		color: var(--color-paper);
		background: var(--color-ink);
	}
	.id-text {
		display: flex;
		flex-direction: column;
		gap: var(--space-1);
	}
	.subcontent {
		font-family: var(--font-mono);
		font-size: 0.85rem;
		margin: 0;
	}
	.links {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-3);
		list-style: none;
		padding: 0;
		margin: var(--space-2) 0 0;
		font-family: var(--font-mono);
		font-size: 0.9rem;
	}
	.prose {
		max-width: var(--max-w);
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
</style>

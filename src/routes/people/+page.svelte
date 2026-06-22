<script lang="ts">
	import PersonCard from '$lib/components/PersonCard.svelte';

	let { data } = $props();
</script>

<svelte:head>
	<title>People — Creative Code Bristol</title>
</svelte:head>

<div class="container">
	<section>
		{#if data.organisers.length}
			<header class="section-head no-border">
				<h2>Organisers</h2>
				<span class="muted count">{data.organisers.length}</span>
			</header>
			<div class="grid">
				{#each data.organisers as person (person.slug)}
					<PersonCard {person} />
				{/each}
			</div>
		{/if}
	</section>

	<section class="section">
		{#if data.community.length}
			<header class="section-head">
				<h2>Community</h2>
				<span class="muted count">{data.community.length}</span>
			</header>
			<div class="grid">
				{#each data.community as person (person.slug)}
					<PersonCard {person} />
				{/each}
			</div>
		{:else if !data.organisers.length}
			<p class="muted">No one here yet — be the first!</p>
		{/if}
	</section>
</div>

<style>
	.count {
		font-family: var(--font-mono);
		font-size: 0.85rem;
	}
	.grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(12rem, 1fr));
		gap: var(--space-4);
	}
</style>

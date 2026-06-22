<script lang="ts">
	import EventCard from '$lib/components/EventCard.svelte';

	let { data } = $props();
</script>

<svelte:head>
	<title>Events — Creative Code Bristol</title>
</svelte:head>

<div class="container">
	<header class="section-head no-border">
		<h2>Events</h2>
	</header>

	{#if data.upcoming.length}
		<h3 class="sub">Upcoming</h3>
		<div class="grid">
			{#each data.upcoming as event (event.slug)}
				<EventCard {event} />
			{/each}
		</div>
	{/if}

	{#if data.past.length}
		<h3 class="sub sub-past">Past</h3>
		<div class="grid">
			{#each data.past as event (event.slug)}
				<EventCard {event} />
			{/each}
		</div>
	{:else if !data.upcoming.length}
		<p class="muted">No events yet — the first jam is on its way.</p>
	{/if}
</div>

<style>
	.sub {
		font-family: var(--font-display);
		font-size: 0.85rem;
		text-transform: uppercase;
		letter-spacing: 0.08em;
		margin: var(--space-6) 0 var(--space-3);
		padding-top: var(--space-2);
		border-top: 1px solid var(--color-ink);
	}
	.sub-past {
		margin-top: var(--space-7);
	}
	.grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(18rem, 1fr));
		gap: var(--space-4);
	}
</style>

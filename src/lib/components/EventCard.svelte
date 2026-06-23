<script lang="ts">
	import { resolve } from '$app/paths';
	import { formatDate } from '$lib/utils/date';
	import type { Event } from '$lib/content/types';

	type Base = {
		event: Event;
	};

	type Next = {
		showNext: true;
		hideDetails?: true;
	};

	type Past = {
		showNext?: never;
		hideDetails?: never;
	};

	type Props = Base & (Next | Past);

	let { event, showNext, hideDetails }: Props = $props();
</script>

{#if showNext}
	<aside class="card-next">
		<h3>{event.title}</h3>
		<time class="muted" datetime={event.date}>{formatDate(event.date)}</time>
		<div class="actions">
			{#if !hideDetails}
				<a class="btn" href={resolve('/about')}>Details</a>
			{/if}
			{#if event.rsvp}
				<a class="btn btn-accent" href={event.rsvp} rel="noopener noreferrer" target="_blank"
					>RSVP</a
				>
			{/if}
		</div>
	</aside>
{:else}
	<a class="card" href={resolve('/events/[slug]', { slug: event.slug })}>
		<div class="body">
			<h3>{event.title}</h3>
			<time class="muted" datetime={event.date}>{formatDate(event.date)}</time>
		</div>
	</a>
{/if}

<style>
	.card {
		display: block;
		background: var(--color-paper);
		border: var(--border);
		color: inherit;
		text-decoration: none;
	}

	.card:hover,
	.card:focus-visible {
		background: var(--color-ink);
		color: var(--color-paper);
		text-decoration: none;
	}

	.body {
		padding: var(--space-5);
		display: flex;
		flex-direction: column;
		gap: var(--space-2);
	}

	h3 {
		margin: 0;
		font-family: var(--font-display);
		font-size: 1.2rem;
		text-transform: uppercase;
		letter-spacing: 0.02em;
	}

	.card-next {
		display: flex;
		flex-direction: column;
		gap: var(--space-3);
		padding: var(--space-5);
		border: var(--border);
		color: var(--color-ink);
	}

	.actions {
		display: flex;
		gap: var(--space-2);
		flex-wrap: wrap;
		margin-top: var(--space-2);
	}
</style>

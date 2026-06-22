<script lang="ts">
	import { resolve } from '$app/paths';
	import { getPerson, getPersonDisplayName, type Sketch } from '$lib/content';

	let { sketch }: { sketch: Sketch | undefined } = $props();
	const author = $derived(sketch?.meta.author ? getPerson(sketch.meta.author) : undefined);
	const authorDisplay = $derived(author ? getPersonDisplayName(author) : '');
</script>

<div class="hero-box">
	<p class="kicker">Bristol · Pervasive Media Studio</p>
	<h1>Code & creativity</h1>
	<div class="lede">
		<p>
			A monthly jam for people who make things with code: generative art, shaders, games, audio tech
			and more.
		</p>
		<p>Show up, share what you're working on, no experience required!</p>
	</div>

	<div class="footer">
		<a class="btn" href={resolve('/about')}>What is this?</a>
		{#if sketch}
			<p>
				<em>
					Banner: {sketch.meta.title}
					{#if author}
						by <a href={resolve('/people/[slug]', { slug: author.slug })}>{authorDisplay}</a>
					{:else if sketch.meta.author}
						by {sketch.meta.author}
					{/if}
				</em>
			</p>
		{/if}
	</div>
</div>

<style>
	.hero-box {
		background: var(--color-paper);
		border: var(--border);
		padding: var(--space-5);
		max-width: var(--max-w);
	}

	.kicker {
		font-family: var(--font-mono);
		font-size: 0.75rem;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		color: var(--color-ink);
		margin: 0 0 var(--space-3);
	}

	h1 {
		margin: 0 0 var(--space-3);
	}

	.lede {
		font-family: var(--font-mono);
		font-size: 0.95rem;
		color: var(--color-ink);
		margin: 0 0 var(--space-4);
		line-height: 1.5;
	}

	.footer {
		display: block;
	}

	.footer p {
		font-size: 0.7rem;
		margin: var(--space-4) 0 0;
	}

	@media (min-width: 500px) {
		.footer {
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			align-items: end;
		}
	}
</style>

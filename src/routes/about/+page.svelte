<script lang="ts">
	import { getNextEvent } from '$lib/content';
	import NextEventCard from '$lib/components/NextEventCard.svelte';

	const next = getNextEvent();
</script>

<svelte:head>
	<title>About — Creative Code Bristol</title>
</svelte:head>

<article class="container narrow">
	<header class="page-head">
		<h1>About the jam</h1>
	</header>

	<div class="prose">
		<p>Creative Code Jam is a relaxed day of making creative things with technology.</p>

		<p>
			Bring a laptop and/or anything you’d like to work on, whether it’s a personal project, an
			experiment, or a skill you want to learn. There’s no set agenda: maybe you want to code,
			sketch ideas, collaborate, or just chat and get inspired!
		</p>

		<h2>Who is it for?</h2>
		<p>
			Makers, artists, designers, coders, anyone who has interest to use technology & coding for
			creative projects. You might want to learn how to create animations with code, make generative
			sound art, do projection mapping, XR prototypes, interactive stage shows, anything really, as
			long as it's somehow linked to creativity / arts.
		</p>

		<p>You don't need to know how to code beforehand - you can come to learn things together.</p>

		<h2>Schedule</h2>
		<p>
			Arrive at noon! We’ll kick off with a round of introductions where everyone shares what they’d
			like to work on, and wrap up by sharing our creations with the group around 5.30pm!
		</p>

		<h2>How to find the place</h2>
		<p>
			Head upstairs to Watershed cafe / restaurant, and turn right after the bar, through the double
			doors. Head to the end of the corridor.
		</p>
		<p>
			Detailed instructions: <a
				href="https://www.watershed.co.uk/studio/about/visit-access"
				target="_blank">https://www.watershed.co.uk/studio/about/visit-access</a
			>
		</p>

		{#if next}
			<h2 class="border-top">Next Jam</h2>
			<div class="next-wrap">
				<NextEventCard event={next} hideDetailsButton />
			</div>
		{/if}
	</div>
</article>

<style>
	.narrow {
		max-width: var(--max-w);
	}
	.page-head {
		margin-bottom: var(--space-5);
		padding: var(--space-4) 0;
		border-bottom: var(--border);
	}
	h1 {
		margin: 0;
	}
	.border-top {
		padding-top: var(--space-4);
		border-top: var(--border);
	}
</style>

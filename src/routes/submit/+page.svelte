<script lang="ts">
	let { data } = $props();
	const Component = $derived(data.component);
</script>

<svelte:head>
	<title>Submit content — Creative Code Bristol</title>
</svelte:head>

<article class="container prose">
	<Component />
</article>

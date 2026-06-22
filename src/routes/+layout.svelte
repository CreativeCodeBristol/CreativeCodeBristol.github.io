<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import { page } from '$app/state';
	import { asset, resolve } from '$app/paths';

	let { children } = $props();

	const nav = [
		{ href: '/', label: 'Home' },
		{ href: '/events', label: 'Events' },
		{ href: '/projects', label: 'Projects' },
		{ href: '/people', label: 'People' },
		{ href: '/about', label: 'About' }
	] as const;

	function isActive(href: string): boolean {
		if (href === '/') return page.url.pathname === '/';
		return page.url.pathname === href || page.url.pathname.startsWith(href + '/');
	}
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>Creative Code Bristol</title>
	<meta name="description" content="Creative Code Bristol." />
</svelte:head>

<div class="site">
	<header class="site-header">
		<div class="container header-inner">
			<a class="brand" href={resolve('/')}>
				<span class="brand-text">Creative Code Bristol</span>
			</a>
			<nav>
				<ul>
					{#each nav as item}
						<li>
							<a href={resolve(item.href)} class:active={isActive(item.href)}>{item.label}</a>
						</li>
					{/each}
				</ul>
			</nav>
		</div>
	</header>

	<main>
		{@render children()}
	</main>

	<footer class="site-footer">
		<div class="container footer-inner">
			<div class="footer-left">
				<p class="muted">Creative Code Bristol</p>
				<span>·</span>
				<a
					class="icon"
					href="https://www.instagram.com/CreativeCodeBristol/"
					rel="noopener noreferrer"
					target="_blank"
					aria-label="Instagram"
				>
					<img
						src={asset('/assets/icons/instagram.svg')}
						alt="The Instagram logo"
						width="20"
						height="20"
					/>
				</a>
			</div>
			<div class="footer-right">
				<a href={resolve('/submit')}>Submit content</a>
				<span>·</span>
				<a
					class="icon"
					href="https://github.com/cartmouse/creative-code-bristol"
					rel="noopener noreferrer"
					target="_blank"
					aria-label="GitHub"
				>
					<img
						src={asset('/assets/icons/github.svg')}
						alt="The GitHub logo"
						width="20"
						height="20"
					/>
				</a>
			</div>
		</div>
	</footer>
</div>

<style>
	.site {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}

	.site-header {
		border-bottom: var(--border);
		background: var(--color-paper);
		position: sticky;
		top: 0;
		z-index: 10;
	}

	.header-inner {
		display: flex;
		flex-direction: column;
		align-items: stretch;
		gap: var(--space-2);
		padding-block: 0;
	}

	.brand {
		display: flex;
		align-items: center;
		gap: var(--space-2);
		font-family: var(--font-display);
		font-size: 1.1rem;
		color: var(--color-ink);
		text-decoration: none;
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	.brand:hover,
	.brand:focus-visible {
		background: var(--color-ink);
		color: var(--color-paper);
		text-decoration: none;
	}

	nav ul {
		display: flex;
		flex-wrap: wrap;
		width: 100%;
		justify-content: space-between;
		gap: 0;
		list-style: none;
		margin: 0;
		padding: 0;
		border-top: 1px solid var(--color-ink);
	}

	nav li {
		flex: 1;
	}

	nav a {
		display: flex;
		justify-content: center;
		font-family: var(--font-mono);
		font-size: 0.75rem;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		color: var(--color-ink);
		text-decoration: none;
		padding: var(--space-1);
		border-left: 1px solid var(--color-ink);
	}

	nav li:last-child a {
		border-right: 1px solid var(--color-ink);
	}

	@media (min-width: 500px) {
		.header-inner {
			flex-direction: row;
			justify-content: space-between;
		}
		nav ul {
			flex-wrap: nowrap;
			border-top: 0;
		}
		nav li {
			flex: 0 1 auto;
			min-width: 0;
		}
		nav a {
			flex: 0 1 auto;
			justify-content: flex-start;
			padding: var(--space-3) var(--space-4);
			font-size: 0.85rem;
			border-left: 1px solid var(--color-ink);
			border-bottom: 0;
		}
	}

	nav a:hover,
	nav a:focus-visible {
		background: var(--color-ink);
		color: var(--color-paper);
		text-decoration: none;
	}

	nav a.active {
		background: var(--color-ink);
		color: var(--color-paper);
	}

	main {
		flex: 1;
	}

	.site-footer {
		border-top: var(--border);
		padding-block: var(--space-5);
		margin-top: var(--space-7);
	}

	.footer-inner {
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: var(--space-4);
		flex-wrap: wrap;
	}

	.footer-inner p,
	.footer-inner a {
		margin: 0;
		font-size: 0.85rem;
	}

	.footer-left,
	.footer-right {
		display: inline-flex;
		align-items: center;
		gap: var(--space-2);
	}

	.icon {
		color: var(--color-ink);
		padding: var(--space-1);
	}

	.icon:hover img,
	.icon:focus-visible img {
		filter: invert(1);
	}
</style>

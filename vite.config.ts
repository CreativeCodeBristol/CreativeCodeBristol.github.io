import { mdsvex } from 'mdsvex';
import rehypeRaw from 'rehype-raw';
import adapter from '@sveltejs/adapter-static';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { getBasePath } from './src/lib/utils/basePath';
import resolveUrls from './src/lib/markdown/resolveUrls';

export default defineConfig({
	plugins: [
		sveltekit({
			paths: {
				base: getBasePath()
			},
			compilerOptions: {
				runes: ({ filename }) =>
					filename.split(/[/\\]/).includes('node_modules') ? undefined : true
			},
			adapter: adapter(),
			preprocess: [
				mdsvex({ extensions: ['.svx', '.md'], rehypePlugins: [rehypeRaw, resolveUrls] })
			],
			extensions: ['.svelte', '.svx', '.md']
		})
	]
});

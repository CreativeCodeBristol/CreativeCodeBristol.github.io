import { getBasePath } from '../utils/basePath';

const EXTERNAL = /^(https?:|mailto:|tel:|data:|#|\/\/)/;
const HTTP = /^https?:/;

type Node = {
	tagName?: string;
	properties: Record<string, unknown>;
	children?: Node[];
};

// Includes noopener and noreferrer in the rel attribute if they're not already present
function ensureRel(rel: unknown): string {
	const values = new Set<string>(['noopener', 'noreferrer']);
	if (typeof rel === 'string') {
		for (const v of rel.split(/\s+/)) {
			if (v) values.add(v);
		}
	} else if (Array.isArray(rel)) {
		for (const v of rel) {
			if (typeof v === 'string' && v) values.add(v);
		}
	}
	return [...values].join(' ');
}

// Recursive method to process all nodes in a tree
function walk(tree: Node, callback: (node: Node) => void): void {
	if (tree.tagName) {
		callback(tree);
	}

	if (tree.children) {
		for (const child of tree.children) {
			walk(child, callback);
		}
	}
}

// Resolve the URL if it's internal - add the base path and preceeding / if necessary
function resolveUrlAttr(
	props: Record<string, unknown>,
	attr: string,
	base: string | undefined
): void {
	const value = props[attr];
	if (typeof value !== 'string') return;

	if (EXTERNAL.test(value) || !base) {
		props[attr] = value;
		return;
	}

	props[attr] = value.startsWith('/') ? base + value : base + '/' + value;
}

export default function rehypeResolveUrls() {
	const base = getBasePath();
	return (tree: unknown) => {
		const processNode = (node: Node) => {
			if (node.tagName === 'a') {
				const props = (node.properties ??= {});
				if (typeof props.href !== 'string') return;

				resolveUrlAttr(props, 'href', base);

				// Set the target to _blank for external links
				if (HTTP.test(props.href)) {
					if (!('target' in props)) {
						props.target = '_blank';
					}
					props.rel = ensureRel(props.rel);
				}
			}

			if (node.tagName === 'img' || node.tagName === 'source') {
				const props = (node.properties ??= {});
				resolveUrlAttr(props, 'src', base);
			}
		};

		walk(tree as Node, processNode);
	};
}

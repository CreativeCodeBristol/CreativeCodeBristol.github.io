export function getBasePath(): `/${string}` | undefined {
	const envBase = process.env.BASE_PATH;

	if (!envBase) return undefined;

	if (envBase.startsWith('/')) {
		return envBase as `/${string}`;
	}

	return `/${envBase}`;
}

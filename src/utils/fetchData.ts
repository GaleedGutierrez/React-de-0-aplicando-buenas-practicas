import type { Resource } from './wrapPromise';
import wrapPromise from './wrapPromise';

interface FetchProperties extends RequestInit {
	controller?: AbortController;
}

async function customFetch<T>(
	url: string,
	options: FetchProperties = {},
): Promise<T | void> {
	const CONTROLLER = options.controller ?? new AbortController();

	try {
		const RESPONSE = await fetch(url, {
			signal: CONTROLLER.signal,
			...options,
		});

		if (!RESPONSE.ok) {
			throw new Error(`Failed to fetch ${RESPONSE.url}`);
		}

		return (await RESPONSE.json()) as T;
	} catch (error) {
		if (error instanceof Error) {
			throw new TypeError(error.message);
		}
	}
}

async function fetchData<T>(
	url: string,
	options: FetchProperties = {},
	isWrapped = false,
): Promise<T | void | Resource<T | void>> {
	if (isWrapped) {
		return wrapPromise(
			customFetch(url, {
				...options,
			}),
		);
	}

	return customFetch<T>(url, { ...options });
}

export default fetchData;

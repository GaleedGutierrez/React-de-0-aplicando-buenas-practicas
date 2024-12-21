interface FetchProperties extends RequestInit {
	controller?: AbortController;
}

async function fetchData<T>(
	url: string,
	options: FetchProperties = {},
): Promise<T | undefined> {
	const CONTROLLER = options.controller ?? new AbortController();

	try {
		const RESPONSE = await fetch(url, {
			signal: CONTROLLER.signal,
			...options,
		});

		if (!RESPONSE.ok) {
			throw new Error('Error fetching data');
		}

		return (await RESPONSE.json()) as T;
	} catch (error) {
		if (error instanceof Error) {
			throw new TypeError(error.message);
		}
	}
}

export default fetchData;

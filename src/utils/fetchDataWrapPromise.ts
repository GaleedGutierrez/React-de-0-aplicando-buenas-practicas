import wrapPromise from './wrapPromise';

interface Resource<T> {
	read(): T;
}

interface FetchProperties extends RequestInit {
	controller?: AbortController;
}

function fetchDataWrapPromise<T>(
	url: string,
	options: FetchProperties = {},
): Resource<void | T> {
	const CONTROLLER = options.controller ?? new AbortController();

	const PROMISE = fetch(url, {
		signal: CONTROLLER.signal,
		...options,
	})
		.then((response) => {
			if (!response.ok) {
				throw new Error('Error fetching data');
			}

			return response.json() as T;
		})
		.catch((error) => {
			if (error instanceof Error) {
				throw new TypeError(error.message);
			}
		});

	return wrapPromise(PROMISE);
}

export default fetchDataWrapPromise;

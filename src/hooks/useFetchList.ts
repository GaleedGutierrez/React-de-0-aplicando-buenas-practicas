import { useEffect, useRef, useState } from 'react';

interface Parameters<T> {
	data?: T[];
	isLoading: boolean;
	error?: Error;
	fetchData: (urls: string[]) => Promise<void>;
}

interface FetchProperties extends RequestInit {
	controller?: AbortController;
}

const useFetchList = <T>(
	urls: string[],
	options: FetchProperties = {},
): Parameters<T> => {
	const { controller } = options;
	const [data, setData] = useState<T[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [error, setError] = useState<Error>();
	const DID_FETCH_REF = useRef(false);
	const CONTROLLER = controller ?? new AbortController();

	const fetchData = async (urls: string[]): Promise<void> => {
		setError(undefined);
		setIsLoading(true);

		try {
			const RESPONSE = await Promise.allSettled(
				urls.map((url) =>
					fetch(url, {
						signal: CONTROLLER.signal,
						...options,
					}),
				),
			);

			const FILTERED_RESPONSE = RESPONSE.filter(
				(response) => response.status === 'fulfilled',
			);

			const JSON_DATA = await Promise.all(
				FILTERED_RESPONSE.map((response) => response.value.json() as T),
			);

			setData(JSON_DATA);
			DID_FETCH_REF.current = true;
		} catch (error) {
			if (error instanceof Error) {
				setError(error);
			}
		} finally {
			setIsLoading(false);

			if (!options.controller) {
				CONTROLLER.abort();
			}
		}
	};

	useEffect(() => {
		if (DID_FETCH_REF.current) {
			return;
		}

		void fetchData(urls);

		return (): void => {
			if (DID_FETCH_REF.current) {
				CONTROLLER.abort();
			}
		};
	}, [urls]);

	return { data, isLoading, error, fetchData };
};

export default useFetchList;

export interface Resource<T> {
	read(): T;
}

enum Status {
	SUCCESS = 'success',
	PENDING = 'pending',
	ERROR = 'error',
}

function wrapPromise<T>(promise: Promise<T>): Resource<T> {
	let status = Status.PENDING;
	let result: T;
	let myError: Error;

	const SUSPENDER = promise
		.then((response) => {
			status = Status.SUCCESS;
			result = response;
		})
		.catch((error) => {
			status = Status.ERROR;
			myError = error instanceof Error ? error : new Error(String(error));
		});

	return {
		read(): T {
			if (status === Status.PENDING) {
				// eslint-disable-next-line @typescript-eslint/only-throw-error
				throw SUSPENDER;
			}

			if (status === Status.ERROR) {
				throw myError;
			}

			return result;
		},
	};
}

export default wrapPromise;

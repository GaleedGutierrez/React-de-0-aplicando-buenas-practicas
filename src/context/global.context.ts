/* eslint-disable @typescript-eslint/no-empty-function */
import { createContext, Dispatch, useContext } from 'react';

interface GlobalContext {
	value: number | undefined;
	setValue: Dispatch<React.SetStateAction<number>>;
}

export const GlobalContext = createContext<GlobalContext>({
	value: undefined,
	setValue: () => {},
});

export const useGlobalContext = (): GlobalContext => {
	const CONTEXT = useContext(GlobalContext);

	if (!CONTEXT.value && CONTEXT.value !== 0) {
		throw new Error(
			'GlobalContext must be used within a GlobalContextProvider',
		);
	}

	return CONTEXT;
};

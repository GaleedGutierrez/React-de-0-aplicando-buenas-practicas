import { JSX, ReactNode, useMemo, useState } from 'react';

import { GlobalContext } from './global.context';

interface Properties {
	children: ReactNode;
}

const EMPTY_GLOBAL_STATE = 0;

const GlobalProvider = ({ children }: Properties): JSX.Element => {
	const [value, setValue] = useState(EMPTY_GLOBAL_STATE);
	const CONTEXT_VALUE = useMemo(
		() => ({ value, setValue }),
		[value, setValue],
	);

	return (
		<GlobalContext.Provider value={CONTEXT_VALUE}>
			{children}
		</GlobalContext.Provider>
	);
};

export default GlobalProvider;

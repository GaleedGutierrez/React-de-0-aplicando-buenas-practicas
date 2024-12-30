import { JSX, StrictMode } from 'react';

import { App } from './App';
import GlobalProvider from './context/global.provider';
import ErrorBoundary from './ErrorBoundary';

export function AppHookContainer(): JSX.Element {
	return (
		<StrictMode>
			<GlobalProvider>
				<ErrorBoundary>
					<App />
				</ErrorBoundary>
			</GlobalProvider>
		</StrictMode>
	);
}

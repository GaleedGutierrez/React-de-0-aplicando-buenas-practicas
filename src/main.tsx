import '@styles/index.css';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { App } from './App';
import { ErrorBoundary } from './ErrorBoundary';

const rootElement = document.querySelector('#root');

if (!rootElement) {
	throw new Error('No root element found');
}

createRoot(rootElement).render(
	<StrictMode>
		<ErrorBoundary>
			<App />
		</ErrorBoundary>
	</StrictMode>,
);

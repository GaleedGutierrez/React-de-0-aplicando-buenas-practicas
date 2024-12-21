import './styles/index.css';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { App } from './App.tsx';
import ErrorBoundary from './ErrorBoundary.tsx';

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

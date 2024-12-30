import '@styles/index.css';

import { createRoot } from 'react-dom/client';

import { AppHookContainer } from './AppHookContainer.tsx';

const rootElement = document.querySelector('#root');

if (!rootElement) {
	throw new Error('No root element found');
}

createRoot(rootElement).render(<AppHookContainer />);

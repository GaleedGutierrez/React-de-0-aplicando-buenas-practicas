import { JSX, useEffect } from 'react';

import styles from './App.module.css';
import { Dashboard } from './components/Dashboard';

export function App(): JSX.Element {
	useEffect(() => {
		function updateTheme({ matches }: MediaQueryListEvent): void {
			document.body.classList.remove(matches ? 'light' : 'dark');
			document.body.classList.add(matches ? 'dark' : 'light');
		}

		const THEME = globalThis.matchMedia('(prefers-color-scheme: dark)');

		THEME.addEventListener('change', updateTheme);

		return function (): void {
			THEME.removeEventListener('change', updateTheme);
		};
	}, []);

	return (
		<main className={`${styles['g-app']} max-width-desktop`}>
			<Dashboard />
		</main>
	);
}

import { JSX, useEffect } from 'react';

import styles from './App.module.css';
import { Dashboard } from './components/Dashboard';

export function App(): JSX.Element {
	useEffect(() => {
		document.body.classList.add('light');
	}, []);

	return (
		<main className={`${styles['g-app']} max-width-desktop`}>
			<Dashboard />
		</main>
	);
}

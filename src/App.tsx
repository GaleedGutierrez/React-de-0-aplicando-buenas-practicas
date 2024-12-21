import { JSX, useEffect } from 'react';

import styles from './App.module.css';
import SkipLinks from './components/SkipLink';
import UserCard from './components/UserCard';
import { useUsers } from './components/UserCard/useUsers';
import handleClick from './utils/applyTheme';

function App(): JSX.Element {
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
		<>
			<nav>
				<SkipLinks />
			</nav>
			<main className={`${styles['g-app']} max-width-desktop`}>
				<h1 className="text-center">
					⚡ Vite React Best Practices Template (by Codely) ⚛️
				</h1>
				<h2>Current users</h2>
				{useUsers().map((user) => (
					<UserCard
						key={user.name}
						user={user}
					/>
				))}
				<button
					className="a-button a-button-primary"
					type="button"
					onClick={handleClick}
				>
					Change Theme
				</button>
			</main>
		</>
	);
}

export default App;

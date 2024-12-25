import { JSX, useEffect } from 'react';

import styles from './App.module.css';
import { Dashboard } from './components/Dashboard';
import { config } from './devdash.config';
import { GitHubApiGithubRepositoryRepository } from './infrastructure/GitHubApiGithubRepositoryRepository';

const REPOSITORY = new GitHubApiGithubRepositoryRepository(
	config.GITHUB_ACCESS_TOKEN,
);

export function App(): JSX.Element {
	useEffect(() => {
		document.body.classList.add('light');
	}, []);

	return (
		<main className={`${styles['g-app']} max-width-desktop`}>
			<Dashboard repository={REPOSITORY} />
		</main>
	);
}

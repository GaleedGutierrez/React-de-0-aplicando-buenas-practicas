import { Dashboard } from '@components/Dashboard';
import { JSX, useEffect } from 'react';

import { config } from './devdash.config';
import { GitHubApiGithubRepositoryRepository } from './infrastructure/GitHubApiGithubRepositoryRepository';

const RESPOSITORY = new GitHubApiGithubRepositoryRepository(
	config.GITHUB_ACCESS_TOKEN,
);

export function App(): JSX.Element {
	useEffect(() => {
		document.body.classList.add('light');
	}, []);

	return <Dashboard repository={RESPOSITORY} />;
}

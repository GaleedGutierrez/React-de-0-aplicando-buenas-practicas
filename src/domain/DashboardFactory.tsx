import { Dashboard } from '@components/Dashboard';
import { GitHubApiGithubRepositoryRepository } from '@infrastructure/GitHubApiGithubRepositoryRepository';
import type { JSX } from 'react';

import { config } from '@/devdash.config';

const REPOSITORY = new GitHubApiGithubRepositoryRepository(
	config.GITHUB_ACCESS_TOKEN,
);

export const DashboardFactory = {
	create(): JSX.Element {
		return <Dashboard repository={REPOSITORY} />;
	},
};

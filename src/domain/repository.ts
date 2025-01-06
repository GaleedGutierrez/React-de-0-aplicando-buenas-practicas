import { GitHubApiGithubRepositoryRepository } from '@infrastructure/GitHubApiGitHubRepositoryRepository';

import { config } from '@/devdash.config';

export const repository = new GitHubApiGithubRepositoryRepository(
	config.GITHUB_ACCESS_TOKEN,
);

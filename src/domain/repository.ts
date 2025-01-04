import { config } from '@/devdash.config';
import { GitHubApiGithubRepositoryRepository } from '@/infrastructure/GitHubApiGitHubRepositoryRepository';

export const repository = new GitHubApiGithubRepositoryRepository(
	config.GITHUB_ACCESS_TOKEN,
);

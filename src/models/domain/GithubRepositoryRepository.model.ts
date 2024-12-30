import { GitHubRepository } from './GitHubRepository.model';

export interface GitHubRepositoryRepository {
	search(repositoryUrls: string[]): Promise<GitHubRepository[]>;
}

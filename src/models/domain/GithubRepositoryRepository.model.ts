import type { GitHubRepository, RepositoryId } from './GitHubRepository.model';

export interface GitHubRepositoryRepository {
	search(repositoryUrls: string[]): Promise<GitHubRepository[]>;
	byId(id: Omit<RepositoryId, 'value'>): Promise<GitHubRepository>;
}

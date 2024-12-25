import { GitHubRepository } from '@models/domain/GitHubRepository.model';

export interface GitHubRepositoryRepository {
	search(repositoryUrls: string[]): Promise<GitHubRepository[]>;
}

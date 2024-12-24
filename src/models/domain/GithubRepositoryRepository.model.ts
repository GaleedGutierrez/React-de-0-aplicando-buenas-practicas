import { GithubRepository } from '@/models/domain/GithubRepository.model';

export interface GithubRepositoryRepository {
	search(repositoryUrls: string[]): Promise<GithubRepository[]>;
}

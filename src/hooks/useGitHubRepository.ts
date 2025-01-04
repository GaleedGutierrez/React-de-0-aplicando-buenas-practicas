import { useEffect, useState } from 'react';

import type { GitHubRepository } from '@/models/domain/GitHubRepository.model';
import type { GitHubRepositoryRepository } from '@/models/domain/GitHubRepositoryRepository.model';

export function useGitHubRepository(
	repository: GitHubRepositoryRepository,
	repositoryUrls: string[],
): { repositories: GitHubRepository[] } {
	const [repositoryData, setRepositories] = useState<GitHubRepository[]>([]);

	useEffect(() => {
		repository
			.search(repositoryUrls)
			.then((repositories) => {
				setRepositories(repositories);
			})
			.catch((error) => {
				console.error(error);
			});
	}, [repository, repositoryUrls]);

	return { repositories: repositoryData };
}

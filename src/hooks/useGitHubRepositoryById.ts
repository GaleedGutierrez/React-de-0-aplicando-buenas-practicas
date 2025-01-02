import { useEffect, useState } from 'react';

import type {
	GitHubRepository,
	RepositoryId,
} from '@/models/domain/GitHubRepository.model';
import type { GitHubRepositoryRepository } from '@/models/domain/GitHubRepositoryRepository.model';

export function useGitHubRepositoryById(
	repository: GitHubRepositoryRepository,
	repositoryId: Omit<RepositoryId, 'value'>,
): GitHubRepository | undefined {
	const [repositoryData, setRepositoryData] = useState<GitHubRepository>();

	useEffect(() => {
		repository
			.byId(repositoryId)
			.then((repositories) => {
				setRepositoryData(repositories);
			})
			.catch((error) => {
				console.error(error);
			});
	}, [repository, repositoryId]);

	return repositoryData;
}

import type { JSX, ReactNode } from 'react';
import { useMemo, useState } from 'react';

import { config } from '@/devdash.config';
import { GitHubApiGithubRepositoryRepository } from '@/infrastructure/GitHubApiGitHubRepositoryRepository';

import { GlobalContext } from './global.context';

interface Properties {
	children: ReactNode;
}

const REPOSITORY = new GitHubApiGithubRepositoryRepository(
	config.GITHUB_ACCESS_TOKEN,
);

const GlobalProvider = ({ children }: Properties): JSX.Element => {
	const [repository, setRepository] =
		useState<GitHubApiGithubRepositoryRepository>(REPOSITORY);

	const CONTEXT_VALUE = useMemo(
		() => ({ repository, setRepository }),
		[repository, setRepository],
	);

	return (
		<GlobalContext.Provider value={CONTEXT_VALUE}>
			{children}
		</GlobalContext.Provider>
	);
};

export default GlobalProvider;

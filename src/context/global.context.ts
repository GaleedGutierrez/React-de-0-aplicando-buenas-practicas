import type { Dispatch, SetStateAction } from 'react';
import { createContext, useContext } from 'react';

import type { GitHubApiGithubRepositoryRepository } from '@/infrastructure/GitHubApiGitHubRepositoryRepository';

interface GlobalContext {
	repository: GitHubApiGithubRepositoryRepository | undefined;
	setRepository: Dispatch<
		SetStateAction<GitHubApiGithubRepositoryRepository>
	>;
}

export const GlobalContext = createContext<GlobalContext>({
	repository: undefined,
	// eslint-disable-next-line @typescript-eslint/no-empty-function
	setRepository: () => {},
});

export const useGlobalContext = (): GlobalContext => {
	const CONTEXT = useContext(GlobalContext);

	if (!CONTEXT.repository) {
		throw new TypeError(
			'GlobalContext must be used within a GlobalContextProvider',
		);
	}

	return CONTEXT;
};

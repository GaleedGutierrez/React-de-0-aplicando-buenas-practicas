import { createContext, Dispatch, SetStateAction, useContext } from 'react';

import { GitHubApiGithubRepositoryRepository } from '@/infrastructure/GitHubApiGithubRepositoryRepository';

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

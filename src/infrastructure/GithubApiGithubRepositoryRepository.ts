import fetchData from '@utils/fetchData';

import { GithubRepository } from '@/models/domain/GithubRepository.model';
import { GithubRepositoryRepository } from '@/models/domain/GithubRepositoryRepository.model';
import { GithubApiResponse } from '@/models/infrastructure/githubApiResponse.model';

interface RepositoryId {
	organization: string;
	name: string;
}

export class GithubApiGithubRepositoryRepository
	implements GithubRepositoryRepository
{
	readonly #endpoints = [
		'https://api.github.com/repos/$organization/$name',
		'https://api.github.com/repos/$organization/$name/pulls',
		'https://api.github.com/repos/$organization/$name/actions/runs?page=1&per_page=1',
	];
	readonly #personalAccessToken: string;

	constructor(personalAccessToken: string) {
		this.#personalAccessToken = personalAccessToken;
	}

	async search(repositoryUrls: string[]): Promise<GithubRepository[]> {
		const RESPONSE_PROMISE = repositoryUrls
			.map((url) => this.#urlToId(url))
			.map((id) => this.#searchById(id));

		return Promise.all(RESPONSE_PROMISE);
	}

	#urlToId(url: string): RepositoryId {
		const splitUrl = url.split('/');
		const name = splitUrl.at(-1);
		const organization = splitUrl.at(-2);

		if (!name || !organization) {
			throw new Error('Invalid URL');
		}

		return {
			name,
			organization,
		};
	}

	async #searchById(id: RepositoryId): Promise<GithubRepository> {
		const URLS = this.#endpoints.map((endpoint) =>
			endpoint
				.replace('$organization', id.organization)
				.replace('$name', id.name),
		);

		try {
			const [repositoryData, pullRequests, ciStatus] = (await Promise.all(
				URLS.map((url) =>
					fetchData(url, {
						headers: {
							Authorization: `Bearer ${this.#personalAccessToken}`,
						},
					}),
				),
			)) as [
				GithubApiResponse['repositoryData'],
				GithubApiResponse['pullRequests'],
				GithubApiResponse['ciStatus'],
			];

			return {
				id: {
					name: repositoryData.name,
					organization: repositoryData.organization.login,
				},
				url: repositoryData.url,
				description: repositoryData.description,
				isPrivate: repositoryData.private,
				updatedAt: new Date(repositoryData.updated_at),
				hasWorkflows: ciStatus.workflow_runs.length > 0,
				isLastWorkflowSuccess:
					ciStatus.workflow_runs.length > 0 &&
					ciStatus.workflow_runs[0].status === 'completed' &&
					ciStatus.workflow_runs[0].conclusion === 'success',
				stars: repositoryData.stargazers_count,
				watchers: repositoryData.watchers_count,
				forks: repositoryData.forks_count,
				issues: repositoryData.open_issues_count,
				pullRequests: pullRequests.length,
			};
		} catch (error) {
			console.error('Error fetching repository data:', error);

			throw error;
		}
	}
}

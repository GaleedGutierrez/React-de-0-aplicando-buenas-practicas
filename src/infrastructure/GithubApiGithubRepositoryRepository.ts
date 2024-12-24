import { GithubApiResponse } from '@models/githubApiResponse.model';
import fetchData from '@utils/fetchData';

interface RepositoryId {
	organization: string;
	name: string;
}

export class GithubApiGithubRepositoryRepository {
	readonly #endpoints = [
		'https://api.github.com/repos/$organization/$name',
		'https://api.github.com/repos/$organization/$name/pulls',
		'https://api.github.com/repos/$organization/$name/actions/runs?page=1&per_page=1',
	];
	readonly #personalAccessToken: string;

	constructor(personalAccessToken: string) {
		this.#personalAccessToken = personalAccessToken;
	}

	async search(repositoryUrls: string[]): Promise<GithubApiResponse[]> {
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

	async #searchById(id: RepositoryId): Promise<GithubApiResponse> {
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
				repositoryData,
				pullRequests,
				ciStatus,
			};
		} catch (error) {
			console.error('Error fetching repository data:', error);

			throw error;
		}
	}
}

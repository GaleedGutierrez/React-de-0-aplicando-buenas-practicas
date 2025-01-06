import type {
	GitHubRepository,
	RepositoryId,
	StatusWorkFlow,
} from '@models/domain/GitHubRepository.model';
import type { GitHubRepositoryRepository } from '@models/domain/GitHubRepositoryRepository.model';
import type { GitHubApiResponse } from '@models/infrastructure/GitHubApiResponse.model';
import fetchData from '@utils/fetchData';

export class GitHubApiGithubRepositoryRepository
	implements GitHubRepositoryRepository
{
	private readonly endpoints = [
		'https://api.github.com/repos/$organization/$name',
		'https://api.github.com/repos/$organization/$name/pulls',
		'https://api.github.com/repos/$organization/$name/actions/runs?page=1&per_page=1',
	];

	constructor(private readonly personalAccessToken: string) {
		this.personalAccessToken = personalAccessToken;
	}

	async byId(id: Omit<RepositoryId, 'value'>): Promise<GitHubRepository> {
		return this.searchById(id);
	}

	async search(repositoryUrls: string[]): Promise<GitHubRepository[]> {
		const RESPONSE_PROMISE = repositoryUrls
			.map((url) => this.urlToId(url))
			.map((id) => this.searchById(id));

		return Promise.all(RESPONSE_PROMISE);
	}

	private urlToId(url: string): RepositoryId {
		const splitUrl = url.split('/');
		const name = splitUrl.at(-1);
		const organization = splitUrl.at(-2);

		if (!name || !organization) {
			throw new Error('Invalid URL');
		}

		return {
			value: `${organization}/${name}`,
			name,
			organization,
		};
	}

	private async searchById(
		id: Omit<RepositoryId, 'value'>,
	): Promise<GitHubRepository> {
		const URLS = this.endpoints.map((endpoint) =>
			endpoint
				.replace('$organization', id.organization)
				.replace('$name', id.name),
		);

		try {
			const FETCH_URLS = URLS.map((url) =>
				fetchData(url, {
					headers: {
						Authorization: `Bearer ${this.personalAccessToken}`,
					},
				}),
			) as [
				Promise<GitHubApiResponse['repositoryData']>,
				Promise<GitHubApiResponse['pullRequests']>,
				Promise<GitHubApiResponse['ciStatus']>,
			];

			const [repositoryData, pullRequests, ciStatus] =
				await Promise.all(FETCH_URLS);

			return {
				id: {
					value: `${repositoryData.organization.login}/${repositoryData.name}`,
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
				workFlowRunsStatus: ciStatus.workflow_runs.map((run) => ({
					id: run.id,
					name: run.name,
					title: run.display_title,
					url: run.html_url,
					createdAt: new Date(run.created_at),
					status: run.status as StatusWorkFlow,
					conclusion: run.conclusion,
				})),
			};
		} catch (error) {
			console.error('Error fetching repository data:', error);

			throw error;
		}
	}
}

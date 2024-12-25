import { faker } from '@faker-js/faker';

import { GitHubRepository } from '@/models/domain/GitHubRepository.model';

export const GithubRepositoryMother = {
	create(parameters?: Partial<GitHubRepository>): GitHubRepository {
		const DEFAULT_PARAMETERS: GitHubRepository = {
			id: {
				organization: faker.company.name(),
				name: faker.word.words(),
			},
			description: faker.word.words(10),
			url: faker.internet.url(),
			isPrivate: faker.datatype.boolean(),
			forks: faker.number.int(),
			hasWorkflows: faker.datatype.boolean(),
			isLastWorkflowSuccess: faker.datatype.boolean(),
			stars: faker.number.int(),
			issues: faker.number.int(),
			pullRequests: faker.number.int(),
			updatedAt: faker.date.recent(),
			watchers: faker.number.int(),
			...parameters,
		};

		return DEFAULT_PARAMETERS;
	},
};

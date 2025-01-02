import { faker } from '@faker-js/faker';

import type { GitHubRepository } from '@/models/domain/GitHubRepository.model';

export const GithubRepositoryMother = {
	create(parameters?: Partial<GitHubRepository>): GitHubRepository {
		const ID_VALUE =
			`${faker.company.name()}/${faker.word.words()}` as const;
		const DEFAULT_PARAMETERS: GitHubRepository = {
			id: {
				value: ID_VALUE,
				organization: ID_VALUE.split('/')[0],
				name: ID_VALUE.split('/')[1],
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

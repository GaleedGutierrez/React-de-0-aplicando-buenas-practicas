import { DevelopmentDashConfig } from './models/devdash.model';

export const config: DevelopmentDashConfig = {
	GITHUB_ACCESS_TOKEN: import.meta.env.VITE_PERSONAL_ACCESS_TOKEN,
	widgets: [
		{
			id: globalThis.crypto.randomUUID(),
			repositoryUrl: 'https://github.com/CodelyTV/dotly',
		},
		{
			id: globalThis.crypto.randomUUID(),
			repositoryUrl:
				'https://github.com/CodelyTV/eslint-plugin-hexagonal-architecture',
		},
		{
			id: globalThis.crypto.randomUUID(),
			repositoryUrl:
				'https://github.com/CodelyTV/refactoring-code-smells',
		},
	],
};

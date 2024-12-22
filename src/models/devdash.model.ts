interface Widget {
	id: `${string}-${string}-${string}-${string}-${string}`;
	repositoryUrl: string;
}

export interface DevelopmentDashConfig {
	GITHUB_ACCESS_TOKEN: string;
	widgets: Widget[];
}

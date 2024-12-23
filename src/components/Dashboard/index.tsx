import { Card } from '@components/Card';
import Brand from '@icons/brand.svg';
import { JSX, Suspense, useEffect, useState } from 'react';

import { config } from '@/devdash.config';
import ErrorBoundary from '@/ErrorBoundary';
import { GithubApiGithubRepositoryRepository } from '@/infrastructure/GithubApiGithubRepositoryRepository';
import { GithubApiResponse } from '@/models/GithubApiResponse.model';

import styles from './index.module.css';

const REPOSITORY = new GithubApiGithubRepositoryRepository(
	config.GITHUB_ACCESS_TOKEN,
);

const DashboardComponent = (): JSX.Element => {
	const [repositories, setRepositories] = useState<GithubApiResponse[]>([]);

	useEffect(() => {
		const URLS = config.widgets.map((widget) => widget.repositoryUrl);

		REPOSITORY.search(URLS)
			.then((repositories) => {
				setRepositories(repositories);
			})
			.catch((error) => {
				console.error(error);
			});
	}, []);

	return (
		<>
			<header className={styles.header}>
				<section className={styles.header__container}>
					<Brand />
					<h1 className={styles.app__brand}>DevDash_</h1>
				</section>
			</header>
			<section className={styles.container}>
				{repositories.map((widget) => {
					const {
						organization,
						name,
						html_url: htmlUrl,
						private: isPrivate,
						id,
						updated_at: updatedAt,
						description,
						stargazers_count: stargazersCount,
						watchers_count: watchersCount,
						forks_count: forksCount,
						open_issues_count: openIssuesCount,
					} = widget.repositoryData;
					const { ciStatus } = widget;
					const { pullRequest } = widget;

					return (
						<Card
							key={id}
							date={updatedAt}
							description={description}
							forksCount={forksCount}
							githubActions={ciStatus}
							htmlUrl={htmlUrl}
							isPrivate={isPrivate}
							login={organization.login}
							name={name}
							openIssuesCount={openIssuesCount}
							pullRequest={pullRequest}
							stargazersCount={stargazersCount}
							watchersCount={watchersCount}
						/>
					);
				})}
			</section>
		</>
	);
};

export const Dashboard = (): JSX.Element => (
	<Suspense fallback={<h2>Loading...</h2>}>
		<ErrorBoundary fallback={<h2>Something went wrong</h2>}>
			<DashboardComponent />
		</ErrorBoundary>
	</Suspense>
);

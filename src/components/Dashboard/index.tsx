import { Card } from '@components/Card';
import Brand from '@icons/brand.svg';
import { JSX, useEffect, useState } from 'react';

import { config } from '@/devdash.config';
import { GithubApiGithubRepositoryRepository } from '@/infrastructure/GithubApiGithubRepositoryRepository';
import { GithubRepository } from '@/models/domain/GithubRepository.model';

import styles from './index.module.css';

const REPOSITORY = new GithubApiGithubRepositoryRepository(
	config.GITHUB_ACCESS_TOKEN,
);

export const Dashboard = (): JSX.Element => {
	const [repositories, setRepositories] = useState<GithubRepository[]>([]);

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
				{repositories.length === 0 ? (
					<p>No hay widgets configurados</p>
				) : (
					repositories.map((widget) => (
						<Card
							key={`${widget.id.organization}-${widget.id.name}`}
							description={widget.description}
							forks={widget.forks}
							hasWorkflows={widget.hasWorkflows}
							id={widget.id}
							isLastWorkflowSuccess={widget.isLastWorkflowSuccess}
							isPrivate={widget.isPrivate}
							issues={widget.issues}
							pullRequests={widget.pullRequests}
							stars={widget.stars}
							updatedAt={widget.updatedAt}
							url={widget.url}
							watchers={widget.watchers}
						/>
					))
				)}
			</section>
		</>
	);
};

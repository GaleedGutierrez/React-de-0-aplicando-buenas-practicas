import { Card } from '@components/Card';
import Brand from '@icons/brand.svg';
import { GitHubRepository } from '@models/domain/GitHubRepository.model';
import { GitHubRepositoryRepository } from '@models/domain/GitHubRepositoryRepository.model';
import { JSX, useEffect, useState } from 'react';

import { config } from '@/devdash.config';

import styles from './index.module.css';

interface Properties {
	repository: GitHubRepositoryRepository;
}

export const Dashboard = ({ repository }: Properties): JSX.Element => {
	const [repositories, setRepositories] = useState<GitHubRepository[]>([]);

	useEffect(() => {
		const URLS = config.widgets.map((widget) => widget.repositoryUrl);

		repository
			.search(URLS)
			.then((repositories) => {
				setRepositories(repositories);
			})
			.catch((error) => {
				console.error(error);
			});
	}, [repository]);

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
							key={`${widget.id.value}`}
							widget={widget}
						/>
					))
				)}
			</section>
		</>
	);
};

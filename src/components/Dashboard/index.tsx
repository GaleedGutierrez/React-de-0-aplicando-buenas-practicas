import { Card } from '@components/Card';
import { useGitHubRepository } from '@hooks/useGitHubRespository';
import Brand from '@icons/brand.svg';
import { JSX } from 'react';

import { useGlobalContext } from '@/context/global.context';
import { config } from '@/devdash.config';

import styles from './index.module.css';

const REPOSITORY_URLS = config.widgets.map((widget) => widget.repositoryUrl);

export const Dashboard = (): JSX.Element => {
	const { repository } = useGlobalContext();
	const { repositories } = useGitHubRepository(repository, REPOSITORY_URLS);

	return (
		<>
			<header className={styles.header}>
				<section className={styles.header__container}>
					<Brand />
					<h1 className={styles.app__brand}>DevDash_</h1>
				</section>
			</header>
			<section className={styles.container}>
				{repositories.length === 0 && (
					<p>No hay widgets configurados</p>
				)}
				{repositories.length > 0 &&
					repositories.map((widget) => (
						<Card
							key={`${widget.id.value}`}
							widget={widget}
						/>
					))}
			</section>
		</>
	);
};

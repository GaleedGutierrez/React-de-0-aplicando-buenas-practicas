import { Card } from '@components/Card';
import { useGitHubRepository } from '@hooks/useGitHubRepository';
import type { GitHubRepositoryRepository } from '@models/domain/GitHubRepositoryRepository.model';
import type { JSX } from 'react';

import { config } from '@/devdash.config';

import styles from './index.module.css';

interface Properties {
	repository: GitHubRepositoryRepository;
}

const REPOSITORY_URLS = config.widgets.map((widget) => widget.repositoryUrl);

export const Dashboard = ({ repository }: Properties): JSX.Element => {
	const { repositories } = useGitHubRepository(repository, REPOSITORY_URLS);

	return (
		<section className={styles.container}>
			{repositories.length === 0 && <p>No hay widgets configurados</p>}
			{repositories.length > 0 &&
				repositories.map((widget) => (
					<Card
						key={`${widget.id.value}`}
						widget={widget}
					/>
				))}
		</section>
	);
};

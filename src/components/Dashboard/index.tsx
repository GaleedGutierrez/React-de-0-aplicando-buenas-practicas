import { Card } from '@components/Card';
import { JSX } from 'react';

import { githubApiResponses } from '@/data/githubApiResponse';
import { GithubActions } from '@/models/githubActions.model';

import styles from './index.module.css';

export const Dashboard = (): JSX.Element => (
	<>
		<h1>DevDash_</h1>
		<section className={styles.container}>
			{githubApiResponses.map((widget) => {
				const {
					organization,
					name,
					html_url: htmlUrl,
					private: isPrivate,
					id,
					updated_at: updatedAt,
				} = widget.repositoryData;
				const { CiStatus } = widget;

				return (
					<Card
						key={id}
						date={updatedAt}
						githubActions={CiStatus as GithubActions}
						htmlUrl={htmlUrl}
						isPrivate={isPrivate}
						login={organization.login}
						name={name}
					/>
				);
			})}
		</section>
	</>
);

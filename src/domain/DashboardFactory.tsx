import { Dashboard } from '@components/Dashboard';
import type { JSX } from 'react';

import { repository } from './repository';

export const DashboardFactory = {
	create(): JSX.Element {
		return <Dashboard repository={repository} />;
	},
};

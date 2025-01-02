import type { JSX } from 'react';

import { Detail } from '@/components/Detail';

import { repository } from './repository';

export const DetailFactory = {
	create(): JSX.Element {
		return <Detail repository={repository} />;
	},
};

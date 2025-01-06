import { Detail } from '@components/Detail';
import type { JSX } from 'react';

import { repository } from './repository';

export const DetailFactory = {
	create(): JSX.Element {
		return <Detail repository={repository} />;
	},
};

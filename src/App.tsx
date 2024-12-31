import type { JSX } from 'react';
import { useEffect } from 'react';

import { Router } from '@/Router';

export function App(): JSX.Element {
	useEffect(() => {
		document.body.classList.add('light');
	}, []);

	return <Router />;
}

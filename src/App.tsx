import { Dashboard } from '@components/Dashboard';
import { JSX, useEffect } from 'react';

export function App(): JSX.Element {
	useEffect(() => {
		document.body.classList.add('light');
	}, []);

	return <Dashboard />;
}

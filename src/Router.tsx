import { Detail } from '@components/Detail';
import { DashboardFactory } from '@domain/DashboardFactory';
import RoutesWithNotFound from '@routes/NotFoundPage';
import type { JSX } from 'react';
import { BrowserRouter, Route } from 'react-router';

export function Router(): JSX.Element {
	return (
		<BrowserRouter>
			<RoutesWithNotFound>
				<Route
					element={DashboardFactory.create()}
					path="/"
				/>
				<Route
					element={<Detail />}
					path="/repository/:organization/:name"
				/>
			</RoutesWithNotFound>
		</BrowserRouter>
	);
}

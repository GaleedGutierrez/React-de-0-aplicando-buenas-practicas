import { Detail } from '@components/Detail';
import { DashboardFactory } from '@domain/DashboardFactory';
import { RoutesWithNotFound } from '@routes/NotFoundPage';
import type { JSX } from 'react';
import { BrowserRouter, Route } from 'react-router';

import { Header } from './components/Header';
import { AppRoutes } from './models/routes/AppRoutes.model';

export function Router(): JSX.Element {
	return (
		<BrowserRouter>
			<RoutesWithNotFound>
				<Route
					element={<Header />}
					path={AppRoutes.root}
				>
					<Route
						element={DashboardFactory.create()}
						path={AppRoutes.dashboard}
					/>
					<Route
						element={<Detail />}
						path={AppRoutes.repository}
					/>
				</Route>
			</RoutesWithNotFound>
		</BrowserRouter>
	);
}

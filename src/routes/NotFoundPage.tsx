import type { JSX, ReactNode } from 'react';
import { Navigate, Route, Routes } from 'react-router';

interface Properties {
	children: ReactNode;
}

const RoutesWithNotFound = ({ children }: Properties): JSX.Element => (
	<Routes>
		{children}
		<Route
			element={<Navigate to="/404" />}
			path="*"
		/>
		<Route
			element={<h1>Página no encontrada</h1>}
			path="/404"
		/>
	</Routes>
);

export default RoutesWithNotFound;

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { JSXElementConstructor, ReactElement } from 'react';
import Navbar from 'components/Navbar';
import HomePage from 'pages/HomePage';

const routeOptions = [
	{
		key: 'home',
		Component: <HomePage />,
		path: '/',
	},
];

interface RouteInterface {
	key: string;
	path: string;
	Component: ReactElement<any, string | JSXElementConstructor<any>>;
}

export const AppRoutes = () => {
	return (
		<Router>
			<Navbar />
			<Routes>
				{routeOptions.map((route: RouteInterface) => (
					<Route
						key={route.key}
						path={route.path}
						element={route.Component}
					/>
				))}
			</Routes>
		</Router>
	);
};

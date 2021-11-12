import { useEffect, useState } from 'react';
import jwt from 'jsonwebtoken';
import { useStateValue } from 'store/TokenProvider';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from 'components/Navbar';
import HomePage from 'pages/HomePage';
import Login from 'pages/login';
import ScrollToTop from 'components/scrollToTop';
import LoadingPage from 'pages/loadingPage';
import GivePermissionPanel from 'pages/givePermissionPanel';

const publicRoutes = [
  {
    key: 'home',
    Component: HomePage,
    path: '/'
  }
];

const privateRoutes = [
  {
    key: 'home',
    Component: GivePermissionPanel,
    path: '/'
  }
];

interface RouteInterface {
  key: string;
  path: string;
  Component: any;
}

export const AppRoutes = () => {
  const [{ token }] = useStateValue();
  const [routeOptions, setRouteOptions] = useState<Array<any>>(publicRoutes);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(true);
    const tokenUser = token ? token.split(' ')[1] : '';
    if (token) {
      buildRoutes(jwt.decode(tokenUser));
      setLoading(false);
    } else {
      if (!localStorage.getItem('logado')) {
        buildRoutes(tokenUser);
        setLoading(false);
      }
    }
  }, [token]);

  const buildRoutes = (users: any) => {
    if (!token) {
      setRouteOptions(publicRoutes);
    } else {
      setRouteOptions(privateRoutes);
    }
  };
  return (
    <Router>
      <ScrollToTop />
      {loading ? (
        <Route exact path={`${window.location.pathname}`} component={LoadingPage} />
      ) : (
        <>
          <Navbar />
          <Switch>
            <Route exact path='/(login)' component={Login} />
            {routeOptions.map((route: RouteInterface) => (
              <Route exact key={route.key} path={route.path} component={route.Component} />
            ))}
          </Switch>
        </>
      )}
    </Router>
  );
};

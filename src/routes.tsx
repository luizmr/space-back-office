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
import NotAuthorizedPage from 'pages/notAuthorizedPage';
import PolicyInfo from 'components/PolicyInfo';
import GiverPermissionNew from 'pages/givePermissionNew';
import GiverPermissionEdit from 'pages/givePermissionEdit';

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
  },
  {
    key: 'give-permission-new',
    Component: GiverPermissionNew,
    path: '/give-permission/new'
  },
  {
    key: 'give-permission-edit',
    Component: GiverPermissionEdit,
    path: '/give-permission/edit/:id'
  }
];

const notAuthorizedRoutes = [
  {
    key: 'home',
    Component: NotAuthorizedPage,
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
      if (typeof users.role === 'string') {
        if (users.role === 'LojaAppIsEmployee') {
          setRouteOptions(privateRoutes);
        } else {
          setRouteOptions(notAuthorizedRoutes);
        }
      } else {
        setRouteOptions(privateRoutes);
      }
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
          <PolicyInfo />
        </>
      )}
    </Router>
  );
};

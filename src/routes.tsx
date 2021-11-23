import { useEffect, useState } from 'react';
import jwt from 'jsonwebtoken';
import { useStateValue } from 'store/TokenProvider';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Navbar from 'components/Navbar';
import Login from 'pages/login';
import ScrollToTop from 'components/scrollToTop';
import LoadingPage from 'pages/loadingPage';
import AssignPermissionPanel from 'pages/assignPermissionPanel';
import NotAuthorizedPage from 'pages/notAuthorizedPage';
import PolicyInfo from 'components/PolicyInfo';
import AssignPermissionNew from 'pages/assignPermissionNew';
import AssignPermissionEdit from 'pages/assignPermissionEdit';
import Dashboard from 'pages/dashboard';
import BreadCrumbs from 'components/breadcrumbs';
import NotFound from 'pages/notFound';

const privateRoutes = [
  {
    key: 'dashboard',
    Component: Dashboard,
    path: '/',
    name: '',
    breadCrumb: false
  },
  {
    key: 'assign-permission',
    Component: AssignPermissionPanel,
    path: '/assign-permission',
    name: 'breadcrumb.assign-permission-panel',
    breadCrumb: true
  },
  {
    key: 'assign-permission-new',
    Component: AssignPermissionNew,
    path: '/assign-permission/new',
    name: '',
    breadCrumb: false
  },
  {
    key: 'assign-permission-edit',
    Component: AssignPermissionEdit,
    path: '/assign-permission/edit/:id',
    name: '',
    breadCrumb: false
  }
];

const notAuthorizedRoutes = [
  {
    key: 'home',
    Component: NotAuthorizedPage,
    path: '/',
    name: '',
    breadCrumb: false
  }
];

interface RouteInterface {
  key: string;
  path: string;
  Component: any;
  breadCrumb: boolean;
  Routes: any;
}

const CustomRoute = ({ key, Component, path, Routes, breadCrumb }: RouteInterface) => {
  return key === 'not-found' ? (
    <Route key={key} path={path} component={Component} />
  ) : (
    <Route
      exact
      key={key}
      path={path}
      render={props => {
        const crumbs = Routes.filter(({ path }: any) => props.match.path.includes(path)).map(
          ({ path, ...rest }: any) => ({
            path: Object.keys(props.match.params).length
              ? Object.keys(props.match.params).reduce(
                  (path, param) => path.replace(`:${param}`, props.match.params[param]!),
                  path
                )
              : path,
            ...rest
          })
        );

        const finalCrumbs = crumbs.map(({ name, path }: any) => ({ name, path }));
        return (
          <div className='p-8'>
            {breadCrumb && <BreadCrumbs crumbs={finalCrumbs} />}
            <Component {...props} />
          </div>
        );
      }}
    />
  );
};

export const AppRoutes = () => {
  const [{ token }] = useStateValue();
  const [routeOptions, setRouteOptions] = useState<Array<any>>(privateRoutes);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // setLoading(true);
    setLoading(false);
    const tokenUser = token ? token.split(' ')[1] : '';
    if (token) {
      buildRoutes(jwt.decode(tokenUser));
      setLoading(false);
    }
  }, [token]);

  const buildRoutes = (users: any) => {
    if (typeof users.role === 'string') {
      if (users.role === 'LojaAppIsEmployee') {
        setRouteOptions(privateRoutes);
      } else {
        setRouteOptions(notAuthorizedRoutes);
      }
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
            {routeOptions.map((route, i) => {
              return CustomRoute({ ...route, Routes: routeOptions });
            })}
            <Route path='*' component={NotFound} />
            <Redirect path='*' to='/not-found' />
          </Switch>
          <PolicyInfo />
        </>
      )}
    </Router>
  );
};

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
import CompanyPanel from 'pages/companyPanel';
import AppPanel from 'pages/appPanel';
import PermissionGroupPanel from 'pages/permissionGroupPanel';
import PermissionPanel from 'pages/permissionPanel';
import CompanyNew from 'pages/companyNew';
import AppNew from 'pages/appNew';
import PermissionGroupNew from 'pages/permissionGroupNew';
import PermissionNew from 'pages/permissionNew';
import CompanyEdit from 'pages/companyEdit';
import AppEdit from 'pages/appEdit';
import PermissionGroupEdit from 'pages/permissionGroupEdit';
import PermissionEdit from 'pages/permissionEdit';

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
    path: '/assign-permissions',
    name: 'breadcrumb.assign-permission-panel',
    breadCrumb: true
  },
  {
    key: 'assign-permission-new',
    Component: AssignPermissionNew,
    path: '/assign-permissions/new',
    name: '',
    breadCrumb: false
  },
  {
    key: 'assign-permission-edit',
    Component: AssignPermissionEdit,
    path: '/assign-permissions/edit/:id',
    name: 'breadcrumb.assign-permission-edit',
    breadCrumb: true
  },
  {
    key: 'company',
    Component: CompanyPanel,
    path: '/companies',
    name: 'breadcrumb.company-panel',
    breadCrumb: true
  },
  {
    key: 'company-new',
    Component: CompanyNew,
    path: '/companies/new',
    name: '',
    breadCrumb: false
  },
  {
    key: 'company-edit',
    Component: CompanyEdit,
    path: '/companies/edit/:id',
    name: 'breadcrumb.company-edit',
    breadCrumb: false
  },
  {
    key: 'app',
    Component: AppPanel,
    path: '/apps',
    name: 'breadcrumb.app-panel',
    breadCrumb: true
  },
  {
    key: 'app-new',
    Component: AppNew,
    path: '/apps/new',
    name: '',
    breadCrumb: false
  },
  {
    key: 'app-edit',
    Component: AppEdit,
    path: '/apps/edit/:id',
    name: 'breadcrumb.app-edit',
    breadCrumb: true
  },
  {
    key: 'permission-group',
    Component: PermissionGroupPanel,
    path: '/permission-groups',
    name: 'breadcrumb.permission-group-panel',
    breadCrumb: true
  },
  {
    key: 'permission-group-new',
    Component: PermissionGroupNew,
    path: '/permission-groups/new',
    name: '',
    breadCrumb: false
  },
  {
    key: 'permission-group-edit',
    Component: PermissionGroupEdit,
    path: '/permission-groups/edit/:id',
    name: 'breadcrumb.permission-group-edit',
    breadCrumb: true
  },
  {
    key: 'permission',
    Component: PermissionPanel,
    path: '/permissions',
    name: 'breadcrumb.permission-panel',
    breadCrumb: true
  },
  {
    key: 'permission-new',
    Component: PermissionNew,
    path: '/permissions/new',
    name: '',
    breadCrumb: false
  },
  {
    key: 'permission-edit',
    Component: PermissionEdit,
    path: '/permissions/edit/:id',
    name: 'breadcrumb.permission-edit',
    breadCrumb: true
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
  const [routeOptions, setRouteOptions] = useState<Array<any>>(notAuthorizedRoutes);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(true);
    const tokenUser = token ? token.split(' ')[1] : '';
    if (token) {
      buildRoutes(jwt.decode(tokenUser));
      setLoading(false);
    }
  }, [token]);

  const buildRoutes = (users: any) => {
    if (users.CompanyId) {
      setRouteOptions(privateRoutes);
    } else {
      setRouteOptions(notAuthorizedRoutes);
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

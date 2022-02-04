import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { UrlPaths } from '../enums';
import { Course, Courses, CreateCourse, Home, Jobs, Register } from '../pages';
import { Login } from '../pages/login';
import { NotFound } from '../pages/not-found';
import { User } from '../pages/user';
import PrivateRoute from './PrivateRoutes';

const Routes = () => {
  return (
    <Switch>
      <Route exact path={UrlPaths.home} component={Home} />
      <Route exact path={UrlPaths.courses} component={Courses} />
      <Route exact path={UrlPaths.jobs} component={Jobs} />
      <Route exact path={UrlPaths.register} component={Register} />
      <Route exact path={UrlPaths.login} component={Login} />
      <Route exact path={UrlPaths.course} component={Course} />
      <Route exact path={UrlPaths.createCourse} component={CreateCourse} />
      {/* <Route exact path={UrlPaths.knowledge} component={KnowledgeComponent} /> */}
      {/* <Route exact path={UrlPaths.areas} component={AreasComponent} /> */}
      {/* <Route exact path={UrlPaths.details} component={Details} /> */}
      {/* <Route exact path={UrlPaths.enterprises} component={EnterpriseComponent} /> */}

      {/* Private Routes */}
      <PrivateRoute exact path={UrlPaths.user} component={User} />
      {/* <PrivateRoute exact path={UrlPaths.video} component={Video} /> */}

      <Route path="*" component={NotFound} />
    </Switch>
  );
};

export default Routes;

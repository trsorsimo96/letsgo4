import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Cabin from './cabin';
import CabinDetail from './cabin-detail';
import CabinUpdate from './cabin-update';
import CabinDeleteDialog from './cabin-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={CabinUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={CabinUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={CabinDetail} />
      <ErrorBoundaryRoute path={match.url} component={Cabin} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={CabinDeleteDialog} />
  </>
);

export default Routes;

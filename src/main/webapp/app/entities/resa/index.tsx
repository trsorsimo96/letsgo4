import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Resa from './resa';
import ResaDetail from './resa-detail';
import ResaUpdate from './resa-update';
import ResaDeleteDialog from './resa-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={ResaUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={ResaUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={ResaDetail} />
      <ErrorBoundaryRoute path={match.url} component={Resa} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={ResaDeleteDialog} />
  </>
);

export default Routes;

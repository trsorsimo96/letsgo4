import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Town from './town';
import TownDetail from './town-detail';
import TownUpdate from './town-update';
import TownDeleteDialog from './town-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={TownUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={TownUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={TownDetail} />
      <ErrorBoundaryRoute path={match.url} component={Town} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={TownDeleteDialog} />
  </>
);

export default Routes;

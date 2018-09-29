import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import ConfigFare from './config-fare';
import ConfigFareDetail from './config-fare-detail';
import ConfigFareUpdate from './config-fare-update';
import ConfigFareDeleteDialog from './config-fare-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={ConfigFareUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={ConfigFareUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={ConfigFareDetail} />
      <ErrorBoundaryRoute path={match.url} component={ConfigFare} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={ConfigFareDeleteDialog} />
  </>
);

export default Routes;

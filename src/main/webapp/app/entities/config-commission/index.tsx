import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import ConfigCommission from './config-commission';
import ConfigCommissionDetail from './config-commission-detail';
import ConfigCommissionUpdate from './config-commission-update';
import ConfigCommissionDeleteDialog from './config-commission-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={ConfigCommissionUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={ConfigCommissionUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={ConfigCommissionDetail} />
      <ErrorBoundaryRoute path={match.url} component={ConfigCommission} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={ConfigCommissionDeleteDialog} />
  </>
);

export default Routes;

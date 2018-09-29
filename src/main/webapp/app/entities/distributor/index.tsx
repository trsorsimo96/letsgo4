import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Distributor from './distributor';
import DistributorDetail from './distributor-detail';
import DistributorUpdate from './distributor-update';
import DistributorDeleteDialog from './distributor-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={DistributorUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={DistributorUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={DistributorDetail} />
      <ErrorBoundaryRoute path={match.url} component={Distributor} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={DistributorDeleteDialog} />
  </>
);

export default Routes;

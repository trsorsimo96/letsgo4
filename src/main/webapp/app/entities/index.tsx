import React from 'react';
import { Switch } from 'react-router-dom';

// tslint:disable-next-line:no-unused-variable
import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Partner from './partner';
import Distributor from './distributor';
import Town from './town';
import Company from './company';
import Route from './route';
import Resa from './resa';
import Travel from './travel';
import ConfigFare from './config-fare';
import ConfigCommission from './config-commission';
import Planning from './planning';
import Cabin from './cabin';
/* jhipster-needle-add-route-import - JHipster will add routes here */

const Routes = ({ match }) => (
  <div>
    <Switch>
      {/* prettier-ignore */}
      <ErrorBoundaryRoute path={`${match.url}/partner`} component={Partner} />
      <ErrorBoundaryRoute path={`${match.url}/distributor`} component={Distributor} />
      <ErrorBoundaryRoute path={`${match.url}/town`} component={Town} />
      <ErrorBoundaryRoute path={`${match.url}/company`} component={Company} />
      <ErrorBoundaryRoute path={`${match.url}/route`} component={Route} />
      <ErrorBoundaryRoute path={`${match.url}/resa`} component={Resa} />
      <ErrorBoundaryRoute path={`${match.url}/travel`} component={Travel} />
      <ErrorBoundaryRoute path={`${match.url}/config-fare`} component={ConfigFare} />
      <ErrorBoundaryRoute path={`${match.url}/config-commission`} component={ConfigCommission} />
      <ErrorBoundaryRoute path={`${match.url}/planning`} component={Planning} />
      <ErrorBoundaryRoute path={`${match.url}/cabin`} component={Cabin} />
      {/* jhipster-needle-add-route-path - JHipster will routes here */}
    </Switch>
  </div>
);

export default Routes;

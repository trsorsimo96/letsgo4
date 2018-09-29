import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvForm, AvGroup, AvInput } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { ICompany } from 'app/shared/model/company.model';
import { getEntities as getCompanies } from 'app/entities/company/company.reducer';
import { IRoute } from 'app/shared/model/route.model';
import { getEntities as getRoutes } from 'app/entities/route/route.reducer';
import { IConfigFare } from 'app/shared/model/config-fare.model';
import { getEntities as getConfigFares } from 'app/entities/config-fare/config-fare.reducer';
import { ICabin } from 'app/shared/model/cabin.model';
import { getEntities as getCabins } from 'app/entities/cabin/cabin.reducer';
import { getEntity, updateEntity, createEntity, reset } from './planning.reducer';
import { IPlanning } from 'app/shared/model/planning.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IPlanningUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IPlanningUpdateState {
  isNew: boolean;
  companyId: string;
  routeId: string;
  configFareId: string;
  cabinId: string;
}

export class PlanningUpdate extends React.Component<IPlanningUpdateProps, IPlanningUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      companyId: '0',
      routeId: '0',
      configFareId: '0',
      cabinId: '0',
      isNew: !this.props.match.params || !this.props.match.params.id
    };
  }

  componentDidMount() {
    if (this.state.isNew) {
      this.props.reset();
    } else {
      this.props.getEntity(this.props.match.params.id);
    }

    this.props.getCompanies();
    this.props.getRoutes();
    this.props.getConfigFares();
    this.props.getCabins();
  }

  saveEntity = (event, errors, values) => {
    values.departureHour = new Date(values.departureHour);
    values.arrivalHour = new Date(values.arrivalHour);

    if (errors.length === 0) {
      const { planningEntity } = this.props;
      const entity = {
        ...planningEntity,
        ...values
      };

      if (this.state.isNew) {
        this.props.createEntity(entity);
      } else {
        this.props.updateEntity(entity);
      }
      this.handleClose();
    }
  };

  handleClose = () => {
    this.props.history.push('/entity/planning');
  };

  render() {
    const { planningEntity, companies, routes, configFares, cabins, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="letsgoApp.planning.home.createOrEditLabel">
              <Translate contentKey="letsgoApp.planning.home.createOrEditLabel">Create or edit a Planning</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : planningEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="planning-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="monLabel" check>
                    <AvInput id="planning-mon" type="checkbox" className="form-control" name="mon" />
                    <Translate contentKey="letsgoApp.planning.mon">Mon</Translate>
                  </Label>
                </AvGroup>
                <AvGroup>
                  <Label id="tueLabel" check>
                    <AvInput id="planning-tue" type="checkbox" className="form-control" name="tue" />
                    <Translate contentKey="letsgoApp.planning.tue">Tue</Translate>
                  </Label>
                </AvGroup>
                <AvGroup>
                  <Label id="wedLabel" check>
                    <AvInput id="planning-wed" type="checkbox" className="form-control" name="wed" />
                    <Translate contentKey="letsgoApp.planning.wed">Wed</Translate>
                  </Label>
                </AvGroup>
                <AvGroup>
                  <Label id="thuLabel" check>
                    <AvInput id="planning-thu" type="checkbox" className="form-control" name="thu" />
                    <Translate contentKey="letsgoApp.planning.thu">Thu</Translate>
                  </Label>
                </AvGroup>
                <AvGroup>
                  <Label id="friLabel" check>
                    <AvInput id="planning-fri" type="checkbox" className="form-control" name="fri" />
                    <Translate contentKey="letsgoApp.planning.fri">Fri</Translate>
                  </Label>
                </AvGroup>
                <AvGroup>
                  <Label id="satLabel" check>
                    <AvInput id="planning-sat" type="checkbox" className="form-control" name="sat" />
                    <Translate contentKey="letsgoApp.planning.sat">Sat</Translate>
                  </Label>
                </AvGroup>
                <AvGroup>
                  <Label id="sunLabel" check>
                    <AvInput id="planning-sun" type="checkbox" className="form-control" name="sun" />
                    <Translate contentKey="letsgoApp.planning.sun">Sun</Translate>
                  </Label>
                </AvGroup>
                <AvGroup>
                  <Label id="departureHourLabel" for="departureHour">
                    <Translate contentKey="letsgoApp.planning.departureHour">Departure Hour</Translate>
                  </Label>
                  <AvInput
                    id="planning-departureHour"
                    type="datetime-local"
                    className="form-control"
                    name="departureHour"
                    value={isNew ? null : convertDateTimeFromServer(this.props.planningEntity.departureHour)}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="arrivalHourLabel" for="arrivalHour">
                    <Translate contentKey="letsgoApp.planning.arrivalHour">Arrival Hour</Translate>
                  </Label>
                  <AvInput
                    id="planning-arrivalHour"
                    type="datetime-local"
                    className="form-control"
                    name="arrivalHour"
                    value={isNew ? null : convertDateTimeFromServer(this.props.planningEntity.arrivalHour)}
                  />
                </AvGroup>
                <AvGroup>
                  <Label for="company.id">
                    <Translate contentKey="letsgoApp.planning.company">Company</Translate>
                  </Label>
                  <AvInput id="planning-company" type="select" className="form-control" name="company.id">
                    <option value="" key="0" />
                    {companies
                      ? companies.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="route.id">
                    <Translate contentKey="letsgoApp.planning.route">Route</Translate>
                  </Label>
                  <AvInput id="planning-route" type="select" className="form-control" name="route.id">
                    <option value="" key="0" />
                    {routes
                      ? routes.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="configFare.id">
                    <Translate contentKey="letsgoApp.planning.configFare">Config Fare</Translate>
                  </Label>
                  <AvInput id="planning-configFare" type="select" className="form-control" name="configFare.id">
                    <option value="" key="0" />
                    {configFares
                      ? configFares.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="cabin.id">
                    <Translate contentKey="letsgoApp.planning.cabin">Cabin</Translate>
                  </Label>
                  <AvInput id="planning-cabin" type="select" className="form-control" name="cabin.id">
                    <option value="" key="0" />
                    {cabins
                      ? cabins.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/planning" replace color="info">
                  <FontAwesomeIcon icon="arrow-left" />&nbsp;
                  <span className="d-none d-md-inline">
                    <Translate contentKey="entity.action.back">Back</Translate>
                  </span>
                </Button>
                &nbsp;
                <Button color="primary" id="save-entity" type="submit" disabled={updating}>
                  <FontAwesomeIcon icon="save" />&nbsp;
                  <Translate contentKey="entity.action.save">Save</Translate>
                </Button>
              </AvForm>
            )}
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (storeState: IRootState) => ({
  companies: storeState.company.entities,
  routes: storeState.route.entities,
  configFares: storeState.configFare.entities,
  cabins: storeState.cabin.entities,
  planningEntity: storeState.planning.entity,
  loading: storeState.planning.loading,
  updating: storeState.planning.updating
});

const mapDispatchToProps = {
  getCompanies,
  getRoutes,
  getConfigFares,
  getCabins,
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PlanningUpdate);

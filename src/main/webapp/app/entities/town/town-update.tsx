import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IRoute } from 'app/shared/model/route.model';
import { getEntities as getRoutes } from 'app/entities/route/route.reducer';
import { getEntity, updateEntity, createEntity, reset } from './town.reducer';
import { ITown } from 'app/shared/model/town.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface ITownUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface ITownUpdateState {
  isNew: boolean;
  departureId: string;
  arrivalId: string;
}

export class TownUpdate extends React.Component<ITownUpdateProps, ITownUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      departureId: '0',
      arrivalId: '0',
      isNew: !this.props.match.params || !this.props.match.params.id
    };
  }

  componentDidMount() {
    if (this.state.isNew) {
      this.props.reset();
    } else {
      this.props.getEntity(this.props.match.params.id);
    }

    this.props.getRoutes();
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { townEntity } = this.props;
      const entity = {
        ...townEntity,
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
    this.props.history.push('/entity/town');
  };

  render() {
    const { townEntity, routes, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="letsgoApp.town.home.createOrEditLabel">
              <Translate contentKey="letsgoApp.town.home.createOrEditLabel">Create or edit a Town</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : townEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="town-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="nameLabel" for="name">
                    <Translate contentKey="letsgoApp.town.name">Name</Translate>
                  </Label>
                  <AvField id="town-name" type="text" name="name" />
                </AvGroup>
                <AvGroup>
                  <Label id="titleLabel" for="title">
                    <Translate contentKey="letsgoApp.town.title">Title</Translate>
                  </Label>
                  <AvField id="town-title" type="text" name="title" />
                </AvGroup>
                <AvGroup>
                  <Label for="departure.id">
                    <Translate contentKey="letsgoApp.town.departure">Departure</Translate>
                  </Label>
                  <AvInput id="town-departure" type="select" className="form-control" name="departure.id">
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
                  <Label for="arrival.id">
                    <Translate contentKey="letsgoApp.town.arrival">Arrival</Translate>
                  </Label>
                  <AvInput id="town-arrival" type="select" className="form-control" name="arrival.id">
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
                <Button tag={Link} id="cancel-save" to="/entity/town" replace color="info">
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
  routes: storeState.route.entities,
  townEntity: storeState.town.entity,
  loading: storeState.town.loading,
  updating: storeState.town.updating
});

const mapDispatchToProps = {
  getRoutes,
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
)(TownUpdate);

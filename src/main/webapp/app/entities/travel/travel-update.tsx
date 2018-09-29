import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IPlanning } from 'app/shared/model/planning.model';
import { getEntities as getPlannings } from 'app/entities/planning/planning.reducer';
import { getEntity, updateEntity, createEntity, reset } from './travel.reducer';
import { ITravel } from 'app/shared/model/travel.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface ITravelUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface ITravelUpdateState {
  isNew: boolean;
  planningId: string;
}

export class TravelUpdate extends React.Component<ITravelUpdateProps, ITravelUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      planningId: '0',
      isNew: !this.props.match.params || !this.props.match.params.id
    };
  }

  componentDidMount() {
    if (this.state.isNew) {
      this.props.reset();
    } else {
      this.props.getEntity(this.props.match.params.id);
    }

    this.props.getPlannings();
  }

  saveEntity = (event, errors, values) => {
    values.date = new Date(values.date);

    if (errors.length === 0) {
      const { travelEntity } = this.props;
      const entity = {
        ...travelEntity,
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
    this.props.history.push('/entity/travel');
  };

  render() {
    const { travelEntity, plannings, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="letsgoApp.travel.home.createOrEditLabel">
              <Translate contentKey="letsgoApp.travel.home.createOrEditLabel">Create or edit a Travel</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : travelEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="travel-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="numberLabel" for="number">
                    <Translate contentKey="letsgoApp.travel.number">Number</Translate>
                  </Label>
                  <AvField id="travel-number" type="string" className="form-control" name="number" />
                </AvGroup>
                <AvGroup>
                  <Label id="dateLabel" for="date">
                    <Translate contentKey="letsgoApp.travel.date">Date</Translate>
                  </Label>
                  <AvInput
                    id="travel-date"
                    type="datetime-local"
                    className="form-control"
                    name="date"
                    value={isNew ? null : convertDateTimeFromServer(this.props.travelEntity.date)}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="nbPlaceLabel" for="nbPlace">
                    <Translate contentKey="letsgoApp.travel.nbPlace">Nb Place</Translate>
                  </Label>
                  <AvField id="travel-nbPlace" type="string" className="form-control" name="nbPlace" />
                </AvGroup>
                <AvGroup>
                  <Label id="leftPlaceLabel" for="leftPlace">
                    <Translate contentKey="letsgoApp.travel.leftPlace">Left Place</Translate>
                  </Label>
                  <AvField id="travel-leftPlace" type="string" className="form-control" name="leftPlace" />
                </AvGroup>
                <AvGroup>
                  <Label for="planning.id">
                    <Translate contentKey="letsgoApp.travel.planning">Planning</Translate>
                  </Label>
                  <AvInput id="travel-planning" type="select" className="form-control" name="planning.id">
                    <option value="" key="0" />
                    {plannings
                      ? plannings.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/travel" replace color="info">
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
  plannings: storeState.planning.entities,
  travelEntity: storeState.travel.entity,
  loading: storeState.travel.loading,
  updating: storeState.travel.updating
});

const mapDispatchToProps = {
  getPlannings,
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
)(TravelUpdate);

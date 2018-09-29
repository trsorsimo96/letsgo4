import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './config-fare.reducer';
import { IConfigFare } from 'app/shared/model/config-fare.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IConfigFareUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IConfigFareUpdateState {
  isNew: boolean;
}

export class ConfigFareUpdate extends React.Component<IConfigFareUpdateProps, IConfigFareUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      isNew: !this.props.match.params || !this.props.match.params.id
    };
  }

  componentDidMount() {
    if (this.state.isNew) {
      this.props.reset();
    } else {
      this.props.getEntity(this.props.match.params.id);
    }
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { configFareEntity } = this.props;
      const entity = {
        ...configFareEntity,
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
    this.props.history.push('/entity/config-fare');
  };

  render() {
    const { configFareEntity, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="letsgoApp.configFare.home.createOrEditLabel">
              <Translate contentKey="letsgoApp.configFare.home.createOrEditLabel">Create or edit a ConfigFare</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : configFareEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="config-fare-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="numeroLabel" for="numero">
                    <Translate contentKey="letsgoApp.configFare.numero">Numero</Translate>
                  </Label>
                  <AvField id="config-fare-numero" type="string" className="form-control" name="numero" />
                </AvGroup>
                <AvGroup>
                  <Label id="fareLabel" for="fare">
                    <Translate contentKey="letsgoApp.configFare.fare">Fare</Translate>
                  </Label>
                  <AvField id="config-fare-fare" type="string" className="form-control" name="fare" />
                </AvGroup>
                <AvGroup>
                  <Label id="cancelableLabel" check>
                    <AvInput id="config-fare-cancelable" type="checkbox" className="form-control" name="cancelable" />
                    <Translate contentKey="letsgoApp.configFare.cancelable">Cancelable</Translate>
                  </Label>
                </AvGroup>
                <AvGroup>
                  <Label id="penaltyCancelLabel" for="penaltyCancel">
                    <Translate contentKey="letsgoApp.configFare.penaltyCancel">Penalty Cancel</Translate>
                  </Label>
                  <AvField id="config-fare-penaltyCancel" type="string" className="form-control" name="penaltyCancel" />
                </AvGroup>
                <AvGroup>
                  <Label id="noshowLabel" check>
                    <AvInput id="config-fare-noshow" type="checkbox" className="form-control" name="noshow" />
                    <Translate contentKey="letsgoApp.configFare.noshow">Noshow</Translate>
                  </Label>
                </AvGroup>
                <AvGroup>
                  <Label id="penaltyNoShowLabel" for="penaltyNoShow">
                    <Translate contentKey="letsgoApp.configFare.penaltyNoShow">Penalty No Show</Translate>
                  </Label>
                  <AvField id="config-fare-penaltyNoShow" type="string" className="form-control" name="penaltyNoShow" />
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/config-fare" replace color="info">
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
  configFareEntity: storeState.configFare.entity,
  loading: storeState.configFare.loading,
  updating: storeState.configFare.updating
});

const mapDispatchToProps = {
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
)(ConfigFareUpdate);

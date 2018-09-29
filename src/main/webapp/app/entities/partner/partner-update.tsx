import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IDistributor } from 'app/shared/model/distributor.model';
import { getEntities as getDistributors } from 'app/entities/distributor/distributor.reducer';
import { getEntity, updateEntity, createEntity, reset } from './partner.reducer';
import { IPartner } from 'app/shared/model/partner.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IPartnerUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IPartnerUpdateState {
  isNew: boolean;
  distributorId: string;
}

export class PartnerUpdate extends React.Component<IPartnerUpdateProps, IPartnerUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      distributorId: '0',
      isNew: !this.props.match.params || !this.props.match.params.id
    };
  }

  componentDidMount() {
    if (this.state.isNew) {
      this.props.reset();
    } else {
      this.props.getEntity(this.props.match.params.id);
    }

    this.props.getDistributors();
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { partnerEntity } = this.props;
      const entity = {
        ...partnerEntity,
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
    this.props.history.push('/entity/partner');
  };

  render() {
    const { partnerEntity, distributors, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="letsgoApp.partner.home.createOrEditLabel">
              <Translate contentKey="letsgoApp.partner.home.createOrEditLabel">Create or edit a Partner</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : partnerEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="partner-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="nameLabel" for="name">
                    <Translate contentKey="letsgoApp.partner.name">Name</Translate>
                  </Label>
                  <AvField id="partner-name" type="text" name="name" />
                </AvGroup>
                <AvGroup>
                  <Label id="soldeLabel" for="solde">
                    <Translate contentKey="letsgoApp.partner.solde">Solde</Translate>
                  </Label>
                  <AvField id="partner-solde" type="string" className="form-control" name="solde" />
                </AvGroup>
                <AvGroup>
                  <Label for="distributor.id">
                    <Translate contentKey="letsgoApp.partner.distributor">Distributor</Translate>
                  </Label>
                  <AvInput id="partner-distributor" type="select" className="form-control" name="distributor.id">
                    <option value="" key="0" />
                    {distributors
                      ? distributors.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/partner" replace color="info">
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
  distributors: storeState.distributor.entities,
  partnerEntity: storeState.partner.entity,
  loading: storeState.partner.loading,
  updating: storeState.partner.updating
});

const mapDispatchToProps = {
  getDistributors,
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
)(PartnerUpdate);

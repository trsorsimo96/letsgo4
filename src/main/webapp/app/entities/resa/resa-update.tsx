import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IPartner } from 'app/shared/model/partner.model';
import { getEntities as getPartners } from 'app/entities/partner/partner.reducer';
import { ICompany } from 'app/shared/model/company.model';
import { getEntities as getCompanies } from 'app/entities/company/company.reducer';
import { ITravel } from 'app/shared/model/travel.model';
import { getEntities as getTravels } from 'app/entities/travel/travel.reducer';
import { getEntity, updateEntity, createEntity, reset } from './resa.reducer';
import { IResa } from 'app/shared/model/resa.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IResaUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IResaUpdateState {
  isNew: boolean;
  partnerId: string;
  companyId: string;
  travelId: string;
}

export class ResaUpdate extends React.Component<IResaUpdateProps, IResaUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      partnerId: '0',
      companyId: '0',
      travelId: '0',
      isNew: !this.props.match.params || !this.props.match.params.id
    };
  }

  componentDidMount() {
    if (this.state.isNew) {
      this.props.reset();
    } else {
      this.props.getEntity(this.props.match.params.id);
    }

    this.props.getPartners();
    this.props.getCompanies();
    this.props.getTravels();
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { resaEntity } = this.props;
      const entity = {
        ...resaEntity,
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
    this.props.history.push('/entity/resa');
  };

  render() {
    const { resaEntity, partners, companies, travels, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="letsgoApp.resa.home.createOrEditLabel">
              <Translate contentKey="letsgoApp.resa.home.createOrEditLabel">Create or edit a Resa</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : resaEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="resa-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="passengerNameLabel" for="passengerName">
                    <Translate contentKey="letsgoApp.resa.passengerName">Passenger Name</Translate>
                  </Label>
                  <AvField id="resa-passengerName" type="text" name="passengerName" />
                </AvGroup>
                <AvGroup>
                  <Label id="passengerCniNumberLabel" for="passengerCniNumber">
                    <Translate contentKey="letsgoApp.resa.passengerCniNumber">Passenger Cni Number</Translate>
                  </Label>
                  <AvField id="resa-passengerCniNumber" type="text" name="passengerCniNumber" />
                </AvGroup>
                <AvGroup>
                  <Label id="emailLabel" for="email">
                    <Translate contentKey="letsgoApp.resa.email">Email</Translate>
                  </Label>
                  <AvField id="resa-email" type="text" name="email" />
                </AvGroup>
                <AvGroup>
                  <Label id="numberLabel" for="number">
                    <Translate contentKey="letsgoApp.resa.number">Number</Translate>
                  </Label>
                  <AvField id="resa-number" type="text" name="number" />
                </AvGroup>
                <AvGroup>
                  <Label for="partner.id">
                    <Translate contentKey="letsgoApp.resa.partner">Partner</Translate>
                  </Label>
                  <AvInput id="resa-partner" type="select" className="form-control" name="partner.id">
                    <option value="" key="0" />
                    {partners
                      ? partners.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="company.id">
                    <Translate contentKey="letsgoApp.resa.company">Company</Translate>
                  </Label>
                  <AvInput id="resa-company" type="select" className="form-control" name="company.id">
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
                  <Label for="travel.id">
                    <Translate contentKey="letsgoApp.resa.travel">Travel</Translate>
                  </Label>
                  <AvInput id="resa-travel" type="select" className="form-control" name="travel.id">
                    <option value="" key="0" />
                    {travels
                      ? travels.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/resa" replace color="info">
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
  partners: storeState.partner.entities,
  companies: storeState.company.entities,
  travels: storeState.travel.entities,
  resaEntity: storeState.resa.entity,
  loading: storeState.resa.loading,
  updating: storeState.resa.updating
});

const mapDispatchToProps = {
  getPartners,
  getCompanies,
  getTravels,
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
)(ResaUpdate);

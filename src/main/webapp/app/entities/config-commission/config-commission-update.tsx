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
import { ICompany } from 'app/shared/model/company.model';
import { getEntities as getCompanies } from 'app/entities/company/company.reducer';
import { getEntity, updateEntity, createEntity, reset } from './config-commission.reducer';
import { IConfigCommission } from 'app/shared/model/config-commission.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IConfigCommissionUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IConfigCommissionUpdateState {
  isNew: boolean;
  distributorId: string;
  companyId: string;
}

export class ConfigCommissionUpdate extends React.Component<IConfigCommissionUpdateProps, IConfigCommissionUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      distributorId: '0',
      companyId: '0',
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
    this.props.getCompanies();
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { configCommissionEntity } = this.props;
      const entity = {
        ...configCommissionEntity,
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
    this.props.history.push('/entity/config-commission');
  };

  render() {
    const { configCommissionEntity, distributors, companies, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="letsgoApp.configCommission.home.createOrEditLabel">
              <Translate contentKey="letsgoApp.configCommission.home.createOrEditLabel">Create or edit a ConfigCommission</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : configCommissionEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="config-commission-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="numeroLabel" for="numero">
                    <Translate contentKey="letsgoApp.configCommission.numero">Numero</Translate>
                  </Label>
                  <AvField id="config-commission-numero" type="string" className="form-control" name="numero" />
                </AvGroup>
                <AvGroup>
                  <Label id="commisionLabel" for="commision">
                    <Translate contentKey="letsgoApp.configCommission.commision">Commision</Translate>
                  </Label>
                  <AvField id="config-commission-commision" type="string" className="form-control" name="commision" />
                </AvGroup>
                <AvGroup>
                  <Label id="commisionPartnerLabel" for="commisionPartner">
                    <Translate contentKey="letsgoApp.configCommission.commisionPartner">Commision Partner</Translate>
                  </Label>
                  <AvField id="config-commission-commisionPartner" type="string" className="form-control" name="commisionPartner" />
                </AvGroup>
                <AvGroup>
                  <Label for="distributor.id">
                    <Translate contentKey="letsgoApp.configCommission.distributor">Distributor</Translate>
                  </Label>
                  <AvInput id="config-commission-distributor" type="select" className="form-control" name="distributor.id">
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
                <AvGroup>
                  <Label for="company.id">
                    <Translate contentKey="letsgoApp.configCommission.company">Company</Translate>
                  </Label>
                  <AvInput id="config-commission-company" type="select" className="form-control" name="company.id">
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
                <Button tag={Link} id="cancel-save" to="/entity/config-commission" replace color="info">
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
  companies: storeState.company.entities,
  configCommissionEntity: storeState.configCommission.entity,
  loading: storeState.configCommission.loading,
  updating: storeState.configCommission.updating
});

const mapDispatchToProps = {
  getDistributors,
  getCompanies,
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
)(ConfigCommissionUpdate);

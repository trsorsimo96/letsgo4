import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './config-commission.reducer';
import { IConfigCommission } from 'app/shared/model/config-commission.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IConfigCommissionDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class ConfigCommissionDetail extends React.Component<IConfigCommissionDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { configCommissionEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="letsgoApp.configCommission.detail.title">ConfigCommission</Translate> [<b>{configCommissionEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="numero">
                <Translate contentKey="letsgoApp.configCommission.numero">Numero</Translate>
              </span>
            </dt>
            <dd>{configCommissionEntity.numero}</dd>
            <dt>
              <span id="commision">
                <Translate contentKey="letsgoApp.configCommission.commision">Commision</Translate>
              </span>
            </dt>
            <dd>{configCommissionEntity.commision}</dd>
            <dt>
              <span id="commisionPartner">
                <Translate contentKey="letsgoApp.configCommission.commisionPartner">Commision Partner</Translate>
              </span>
            </dt>
            <dd>{configCommissionEntity.commisionPartner}</dd>
            <dt>
              <Translate contentKey="letsgoApp.configCommission.distributor">Distributor</Translate>
            </dt>
            <dd>{configCommissionEntity.distributor ? configCommissionEntity.distributor.id : ''}</dd>
            <dt>
              <Translate contentKey="letsgoApp.configCommission.company">Company</Translate>
            </dt>
            <dd>{configCommissionEntity.company ? configCommissionEntity.company.id : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/config-commission" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>&nbsp;
          <Button tag={Link} to={`/entity/config-commission/${configCommissionEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.edit">Edit</Translate>
            </span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ configCommission }: IRootState) => ({
  configCommissionEntity: configCommission.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ConfigCommissionDetail);

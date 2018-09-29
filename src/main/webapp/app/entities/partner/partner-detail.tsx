import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './partner.reducer';
import { IPartner } from 'app/shared/model/partner.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IPartnerDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class PartnerDetail extends React.Component<IPartnerDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { partnerEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="letsgoApp.partner.detail.title">Partner</Translate> [<b>{partnerEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="name">
                <Translate contentKey="letsgoApp.partner.name">Name</Translate>
              </span>
            </dt>
            <dd>{partnerEntity.name}</dd>
            <dt>
              <span id="solde">
                <Translate contentKey="letsgoApp.partner.solde">Solde</Translate>
              </span>
            </dt>
            <dd>{partnerEntity.solde}</dd>
            <dt>
              <Translate contentKey="letsgoApp.partner.distributor">Distributor</Translate>
            </dt>
            <dd>{partnerEntity.distributor ? partnerEntity.distributor.id : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/partner" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>&nbsp;
          <Button tag={Link} to={`/entity/partner/${partnerEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ partner }: IRootState) => ({
  partnerEntity: partner.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PartnerDetail);

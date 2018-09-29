import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './resa.reducer';
import { IResa } from 'app/shared/model/resa.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IResaDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class ResaDetail extends React.Component<IResaDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { resaEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="letsgoApp.resa.detail.title">Resa</Translate> [<b>{resaEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="passengerName">
                <Translate contentKey="letsgoApp.resa.passengerName">Passenger Name</Translate>
              </span>
            </dt>
            <dd>{resaEntity.passengerName}</dd>
            <dt>
              <span id="passengerCniNumber">
                <Translate contentKey="letsgoApp.resa.passengerCniNumber">Passenger Cni Number</Translate>
              </span>
            </dt>
            <dd>{resaEntity.passengerCniNumber}</dd>
            <dt>
              <span id="email">
                <Translate contentKey="letsgoApp.resa.email">Email</Translate>
              </span>
            </dt>
            <dd>{resaEntity.email}</dd>
            <dt>
              <span id="number">
                <Translate contentKey="letsgoApp.resa.number">Number</Translate>
              </span>
            </dt>
            <dd>{resaEntity.number}</dd>
            <dt>
              <Translate contentKey="letsgoApp.resa.partner">Partner</Translate>
            </dt>
            <dd>{resaEntity.partner ? resaEntity.partner.id : ''}</dd>
            <dt>
              <Translate contentKey="letsgoApp.resa.company">Company</Translate>
            </dt>
            <dd>{resaEntity.company ? resaEntity.company.id : ''}</dd>
            <dt>
              <Translate contentKey="letsgoApp.resa.travel">Travel</Translate>
            </dt>
            <dd>{resaEntity.travel ? resaEntity.travel.id : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/resa" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>&nbsp;
          <Button tag={Link} to={`/entity/resa/${resaEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ resa }: IRootState) => ({
  resaEntity: resa.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ResaDetail);

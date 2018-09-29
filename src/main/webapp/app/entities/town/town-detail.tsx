import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './town.reducer';
import { ITown } from 'app/shared/model/town.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ITownDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class TownDetail extends React.Component<ITownDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { townEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="letsgoApp.town.detail.title">Town</Translate> [<b>{townEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="name">
                <Translate contentKey="letsgoApp.town.name">Name</Translate>
              </span>
            </dt>
            <dd>{townEntity.name}</dd>
            <dt>
              <span id="title">
                <Translate contentKey="letsgoApp.town.title">Title</Translate>
              </span>
            </dt>
            <dd>{townEntity.title}</dd>
            <dt>
              <Translate contentKey="letsgoApp.town.departure">Departure</Translate>
            </dt>
            <dd>{townEntity.departure ? townEntity.departure.id : ''}</dd>
            <dt>
              <Translate contentKey="letsgoApp.town.arrival">Arrival</Translate>
            </dt>
            <dd>{townEntity.arrival ? townEntity.arrival.id : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/town" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>&nbsp;
          <Button tag={Link} to={`/entity/town/${townEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ town }: IRootState) => ({
  townEntity: town.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TownDetail);

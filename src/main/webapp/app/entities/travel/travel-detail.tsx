import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './travel.reducer';
import { ITravel } from 'app/shared/model/travel.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ITravelDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class TravelDetail extends React.Component<ITravelDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { travelEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="letsgoApp.travel.detail.title">Travel</Translate> [<b>{travelEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="number">
                <Translate contentKey="letsgoApp.travel.number">Number</Translate>
              </span>
            </dt>
            <dd>{travelEntity.number}</dd>
            <dt>
              <span id="date">
                <Translate contentKey="letsgoApp.travel.date">Date</Translate>
              </span>
            </dt>
            <dd>
              <TextFormat value={travelEntity.date} type="date" format={APP_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="nbPlace">
                <Translate contentKey="letsgoApp.travel.nbPlace">Nb Place</Translate>
              </span>
            </dt>
            <dd>{travelEntity.nbPlace}</dd>
            <dt>
              <span id="leftPlace">
                <Translate contentKey="letsgoApp.travel.leftPlace">Left Place</Translate>
              </span>
            </dt>
            <dd>{travelEntity.leftPlace}</dd>
            <dt>
              <Translate contentKey="letsgoApp.travel.planning">Planning</Translate>
            </dt>
            <dd>{travelEntity.planning ? travelEntity.planning.id : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/travel" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>&nbsp;
          <Button tag={Link} to={`/entity/travel/${travelEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ travel }: IRootState) => ({
  travelEntity: travel.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TravelDetail);

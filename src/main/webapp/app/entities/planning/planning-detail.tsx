import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './planning.reducer';
import { IPlanning } from 'app/shared/model/planning.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IPlanningDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class PlanningDetail extends React.Component<IPlanningDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { planningEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="letsgoApp.planning.detail.title">Planning</Translate> [<b>{planningEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="mon">
                <Translate contentKey="letsgoApp.planning.mon">Mon</Translate>
              </span>
            </dt>
            <dd>{planningEntity.mon ? 'true' : 'false'}</dd>
            <dt>
              <span id="tue">
                <Translate contentKey="letsgoApp.planning.tue">Tue</Translate>
              </span>
            </dt>
            <dd>{planningEntity.tue ? 'true' : 'false'}</dd>
            <dt>
              <span id="wed">
                <Translate contentKey="letsgoApp.planning.wed">Wed</Translate>
              </span>
            </dt>
            <dd>{planningEntity.wed ? 'true' : 'false'}</dd>
            <dt>
              <span id="thu">
                <Translate contentKey="letsgoApp.planning.thu">Thu</Translate>
              </span>
            </dt>
            <dd>{planningEntity.thu ? 'true' : 'false'}</dd>
            <dt>
              <span id="fri">
                <Translate contentKey="letsgoApp.planning.fri">Fri</Translate>
              </span>
            </dt>
            <dd>{planningEntity.fri ? 'true' : 'false'}</dd>
            <dt>
              <span id="sat">
                <Translate contentKey="letsgoApp.planning.sat">Sat</Translate>
              </span>
            </dt>
            <dd>{planningEntity.sat ? 'true' : 'false'}</dd>
            <dt>
              <span id="sun">
                <Translate contentKey="letsgoApp.planning.sun">Sun</Translate>
              </span>
            </dt>
            <dd>{planningEntity.sun ? 'true' : 'false'}</dd>
            <dt>
              <span id="departureHour">
                <Translate contentKey="letsgoApp.planning.departureHour">Departure Hour</Translate>
              </span>
            </dt>
            <dd>
              <TextFormat value={planningEntity.departureHour} type="date" format={APP_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="arrivalHour">
                <Translate contentKey="letsgoApp.planning.arrivalHour">Arrival Hour</Translate>
              </span>
            </dt>
            <dd>
              <TextFormat value={planningEntity.arrivalHour} type="date" format={APP_DATE_FORMAT} />
            </dd>
            <dt>
              <Translate contentKey="letsgoApp.planning.company">Company</Translate>
            </dt>
            <dd>{planningEntity.company ? planningEntity.company.id : ''}</dd>
            <dt>
              <Translate contentKey="letsgoApp.planning.route">Route</Translate>
            </dt>
            <dd>{planningEntity.route ? planningEntity.route.id : ''}</dd>
            <dt>
              <Translate contentKey="letsgoApp.planning.configFare">Config Fare</Translate>
            </dt>
            <dd>{planningEntity.configFare ? planningEntity.configFare.id : ''}</dd>
            <dt>
              <Translate contentKey="letsgoApp.planning.cabin">Cabin</Translate>
            </dt>
            <dd>{planningEntity.cabin ? planningEntity.cabin.id : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/planning" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>&nbsp;
          <Button tag={Link} to={`/entity/planning/${planningEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ planning }: IRootState) => ({
  planningEntity: planning.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PlanningDetail);

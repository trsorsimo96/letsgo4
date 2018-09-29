import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './config-fare.reducer';
import { IConfigFare } from 'app/shared/model/config-fare.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IConfigFareDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class ConfigFareDetail extends React.Component<IConfigFareDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { configFareEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="letsgoApp.configFare.detail.title">ConfigFare</Translate> [<b>{configFareEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="numero">
                <Translate contentKey="letsgoApp.configFare.numero">Numero</Translate>
              </span>
            </dt>
            <dd>{configFareEntity.numero}</dd>
            <dt>
              <span id="fare">
                <Translate contentKey="letsgoApp.configFare.fare">Fare</Translate>
              </span>
            </dt>
            <dd>{configFareEntity.fare}</dd>
            <dt>
              <span id="cancelable">
                <Translate contentKey="letsgoApp.configFare.cancelable">Cancelable</Translate>
              </span>
            </dt>
            <dd>{configFareEntity.cancelable ? 'true' : 'false'}</dd>
            <dt>
              <span id="penaltyCancel">
                <Translate contentKey="letsgoApp.configFare.penaltyCancel">Penalty Cancel</Translate>
              </span>
            </dt>
            <dd>{configFareEntity.penaltyCancel}</dd>
            <dt>
              <span id="noshow">
                <Translate contentKey="letsgoApp.configFare.noshow">Noshow</Translate>
              </span>
            </dt>
            <dd>{configFareEntity.noshow ? 'true' : 'false'}</dd>
            <dt>
              <span id="penaltyNoShow">
                <Translate contentKey="letsgoApp.configFare.penaltyNoShow">Penalty No Show</Translate>
              </span>
            </dt>
            <dd>{configFareEntity.penaltyNoShow}</dd>
          </dl>
          <Button tag={Link} to="/entity/config-fare" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>&nbsp;
          <Button tag={Link} to={`/entity/config-fare/${configFareEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ configFare }: IRootState) => ({
  configFareEntity: configFare.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ConfigFareDetail);

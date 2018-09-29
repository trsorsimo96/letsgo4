import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction, openFile, byteSize } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './distributor.reducer';
import { IDistributor } from 'app/shared/model/distributor.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IDistributorDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class DistributorDetail extends React.Component<IDistributorDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { distributorEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="letsgoApp.distributor.detail.title">Distributor</Translate> [<b>{distributorEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="name">
                <Translate contentKey="letsgoApp.distributor.name">Name</Translate>
              </span>
            </dt>
            <dd>{distributorEntity.name}</dd>
            <dt>
              <span id="email">
                <Translate contentKey="letsgoApp.distributor.email">Email</Translate>
              </span>
            </dt>
            <dd>{distributorEntity.email}</dd>
            <dt>
              <span id="number">
                <Translate contentKey="letsgoApp.distributor.number">Number</Translate>
              </span>
            </dt>
            <dd>{distributorEntity.number}</dd>
            <dt>
              <span id="logo">
                <Translate contentKey="letsgoApp.distributor.logo">Logo</Translate>
              </span>
            </dt>
            <dd>
              {distributorEntity.logo ? (
                <div>
                  <a onClick={openFile(distributorEntity.logoContentType, distributorEntity.logo)}>
                    <img src={`data:${distributorEntity.logoContentType};base64,${distributorEntity.logo}`} style={{ maxHeight: '30px' }} />
                  </a>
                  <span>
                    {distributorEntity.logoContentType}, {byteSize(distributorEntity.logo)}
                  </span>
                </div>
              ) : null}
            </dd>
          </dl>
          <Button tag={Link} to="/entity/distributor" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>&nbsp;
          <Button tag={Link} to={`/entity/distributor/${distributorEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ distributor }: IRootState) => ({
  distributorEntity: distributor.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DistributorDetail);

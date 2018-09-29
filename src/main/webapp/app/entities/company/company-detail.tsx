import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction, openFile, byteSize } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './company.reducer';
import { ICompany } from 'app/shared/model/company.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ICompanyDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class CompanyDetail extends React.Component<ICompanyDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { companyEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="letsgoApp.company.detail.title">Company</Translate> [<b>{companyEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="name">
                <Translate contentKey="letsgoApp.company.name">Name</Translate>
              </span>
            </dt>
            <dd>{companyEntity.name}</dd>
            <dt>
              <span id="title">
                <Translate contentKey="letsgoApp.company.title">Title</Translate>
              </span>
            </dt>
            <dd>{companyEntity.title}</dd>
            <dt>
              <span id="email">
                <Translate contentKey="letsgoApp.company.email">Email</Translate>
              </span>
            </dt>
            <dd>{companyEntity.email}</dd>
            <dt>
              <span id="number">
                <Translate contentKey="letsgoApp.company.number">Number</Translate>
              </span>
            </dt>
            <dd>{companyEntity.number}</dd>
            <dt>
              <span id="logo">
                <Translate contentKey="letsgoApp.company.logo">Logo</Translate>
              </span>
            </dt>
            <dd>
              {companyEntity.logo ? (
                <div>
                  <a onClick={openFile(companyEntity.logoContentType, companyEntity.logo)}>
                    <img src={`data:${companyEntity.logoContentType};base64,${companyEntity.logo}`} style={{ maxHeight: '30px' }} />
                  </a>
                  <span>
                    {companyEntity.logoContentType}, {byteSize(companyEntity.logo)}
                  </span>
                </div>
              ) : null}
            </dd>
          </dl>
          <Button tag={Link} to="/entity/company" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>&nbsp;
          <Button tag={Link} to={`/entity/company/${companyEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ company }: IRootState) => ({
  companyEntity: company.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CompanyDetail);

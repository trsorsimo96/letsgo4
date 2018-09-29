import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, InputGroup, Col, Row, Table } from 'reactstrap';
import { AvForm, AvGroup, AvInput } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudSearchAction, ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getSearchEntities, getEntities } from './config-commission.reducer';
import { IConfigCommission } from 'app/shared/model/config-commission.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IConfigCommissionProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export interface IConfigCommissionState {
  search: string;
}

export class ConfigCommission extends React.Component<IConfigCommissionProps, IConfigCommissionState> {
  state: IConfigCommissionState = {
    search: ''
  };

  componentDidMount() {
    this.props.getEntities();
  }

  search = () => {
    if (this.state.search) {
      this.props.getSearchEntities(this.state.search);
    }
  };

  clear = () => {
    this.props.getEntities();
    this.setState({
      search: ''
    });
  };

  handleSearch = event => this.setState({ search: event.target.value });

  render() {
    const { configCommissionList, match } = this.props;
    return (
      <div>
        <h2 id="config-commission-heading">
          <Translate contentKey="letsgoApp.configCommission.home.title">Config Commissions</Translate>
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />&nbsp;
            <Translate contentKey="letsgoApp.configCommission.home.createLabel">Create new Config Commission</Translate>
          </Link>
        </h2>
        <Row>
          <Col sm="12">
            <AvForm onSubmit={this.search}>
              <AvGroup>
                <InputGroup>
                  <AvInput
                    type="text"
                    name="search"
                    value={this.state.search}
                    onChange={this.handleSearch}
                    placeholder={translate('letsgoApp.configCommission.home.search')}
                  />
                  <Button className="input-group-addon">
                    <FontAwesomeIcon icon="search" />
                  </Button>
                  <Button type="reset" className="input-group-addon" onClick={this.clear}>
                    <FontAwesomeIcon icon="trash" />
                  </Button>
                </InputGroup>
              </AvGroup>
            </AvForm>
          </Col>
        </Row>
        <div className="table-responsive">
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="letsgoApp.configCommission.numero">Numero</Translate>
                </th>
                <th>
                  <Translate contentKey="letsgoApp.configCommission.commision">Commision</Translate>
                </th>
                <th>
                  <Translate contentKey="letsgoApp.configCommission.commisionPartner">Commision Partner</Translate>
                </th>
                <th>
                  <Translate contentKey="letsgoApp.configCommission.distributor">Distributor</Translate>
                </th>
                <th>
                  <Translate contentKey="letsgoApp.configCommission.company">Company</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {configCommissionList.map((configCommission, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${configCommission.id}`} color="link" size="sm">
                      {configCommission.id}
                    </Button>
                  </td>
                  <td>{configCommission.numero}</td>
                  <td>{configCommission.commision}</td>
                  <td>{configCommission.commisionPartner}</td>
                  <td>
                    {configCommission.distributor ? (
                      <Link to={`distributor/${configCommission.distributor.id}`}>{configCommission.distributor.id}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td>
                    {configCommission.company ? (
                      <Link to={`company/${configCommission.company.id}`}>{configCommission.company.id}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${configCommission.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${configCommission.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${configCommission.id}/delete`} color="danger" size="sm">
                        <FontAwesomeIcon icon="trash" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.delete">Delete</Translate>
                        </span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ configCommission }: IRootState) => ({
  configCommissionList: configCommission.entities
});

const mapDispatchToProps = {
  getSearchEntities,
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ConfigCommission);

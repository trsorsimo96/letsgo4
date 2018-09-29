import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, InputGroup, Col, Row, Table } from 'reactstrap';
import { AvForm, AvGroup, AvInput } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudSearchAction, ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getSearchEntities, getEntities } from './config-fare.reducer';
import { IConfigFare } from 'app/shared/model/config-fare.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IConfigFareProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export interface IConfigFareState {
  search: string;
}

export class ConfigFare extends React.Component<IConfigFareProps, IConfigFareState> {
  state: IConfigFareState = {
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
    const { configFareList, match } = this.props;
    return (
      <div>
        <h2 id="config-fare-heading">
          <Translate contentKey="letsgoApp.configFare.home.title">Config Fares</Translate>
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />&nbsp;
            <Translate contentKey="letsgoApp.configFare.home.createLabel">Create new Config Fare</Translate>
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
                    placeholder={translate('letsgoApp.configFare.home.search')}
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
                  <Translate contentKey="letsgoApp.configFare.numero">Numero</Translate>
                </th>
                <th>
                  <Translate contentKey="letsgoApp.configFare.fare">Fare</Translate>
                </th>
                <th>
                  <Translate contentKey="letsgoApp.configFare.cancelable">Cancelable</Translate>
                </th>
                <th>
                  <Translate contentKey="letsgoApp.configFare.penaltyCancel">Penalty Cancel</Translate>
                </th>
                <th>
                  <Translate contentKey="letsgoApp.configFare.noshow">Noshow</Translate>
                </th>
                <th>
                  <Translate contentKey="letsgoApp.configFare.penaltyNoShow">Penalty No Show</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {configFareList.map((configFare, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${configFare.id}`} color="link" size="sm">
                      {configFare.id}
                    </Button>
                  </td>
                  <td>{configFare.numero}</td>
                  <td>{configFare.fare}</td>
                  <td>{configFare.cancelable ? 'true' : 'false'}</td>
                  <td>{configFare.penaltyCancel}</td>
                  <td>{configFare.noshow ? 'true' : 'false'}</td>
                  <td>{configFare.penaltyNoShow}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${configFare.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${configFare.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${configFare.id}/delete`} color="danger" size="sm">
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

const mapStateToProps = ({ configFare }: IRootState) => ({
  configFareList: configFare.entities
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
)(ConfigFare);

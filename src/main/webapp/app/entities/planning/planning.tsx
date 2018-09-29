import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, InputGroup, Col, Row, Table } from 'reactstrap';
import { AvForm, AvGroup, AvInput } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudSearchAction, ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getSearchEntities, getEntities } from './planning.reducer';
import { IPlanning } from 'app/shared/model/planning.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IPlanningProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export interface IPlanningState {
  search: string;
}

export class Planning extends React.Component<IPlanningProps, IPlanningState> {
  state: IPlanningState = {
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
    const { planningList, match } = this.props;
    return (
      <div>
        <h2 id="planning-heading">
          <Translate contentKey="letsgoApp.planning.home.title">Plannings</Translate>
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />&nbsp;
            <Translate contentKey="letsgoApp.planning.home.createLabel">Create new Planning</Translate>
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
                    placeholder={translate('letsgoApp.planning.home.search')}
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
                  <Translate contentKey="letsgoApp.planning.mon">Mon</Translate>
                </th>
                <th>
                  <Translate contentKey="letsgoApp.planning.tue">Tue</Translate>
                </th>
                <th>
                  <Translate contentKey="letsgoApp.planning.wed">Wed</Translate>
                </th>
                <th>
                  <Translate contentKey="letsgoApp.planning.thu">Thu</Translate>
                </th>
                <th>
                  <Translate contentKey="letsgoApp.planning.fri">Fri</Translate>
                </th>
                <th>
                  <Translate contentKey="letsgoApp.planning.sat">Sat</Translate>
                </th>
                <th>
                  <Translate contentKey="letsgoApp.planning.sun">Sun</Translate>
                </th>
                <th>
                  <Translate contentKey="letsgoApp.planning.departureHour">Departure Hour</Translate>
                </th>
                <th>
                  <Translate contentKey="letsgoApp.planning.arrivalHour">Arrival Hour</Translate>
                </th>
                <th>
                  <Translate contentKey="letsgoApp.planning.company">Company</Translate>
                </th>
                <th>
                  <Translate contentKey="letsgoApp.planning.route">Route</Translate>
                </th>
                <th>
                  <Translate contentKey="letsgoApp.planning.configFare">Config Fare</Translate>
                </th>
                <th>
                  <Translate contentKey="letsgoApp.planning.cabin">Cabin</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {planningList.map((planning, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${planning.id}`} color="link" size="sm">
                      {planning.id}
                    </Button>
                  </td>
                  <td>{planning.mon ? 'true' : 'false'}</td>
                  <td>{planning.tue ? 'true' : 'false'}</td>
                  <td>{planning.wed ? 'true' : 'false'}</td>
                  <td>{planning.thu ? 'true' : 'false'}</td>
                  <td>{planning.fri ? 'true' : 'false'}</td>
                  <td>{planning.sat ? 'true' : 'false'}</td>
                  <td>{planning.sun ? 'true' : 'false'}</td>
                  <td>
                    <TextFormat type="date" value={planning.departureHour} format={APP_DATE_FORMAT} />
                  </td>
                  <td>
                    <TextFormat type="date" value={planning.arrivalHour} format={APP_DATE_FORMAT} />
                  </td>
                  <td>{planning.company ? <Link to={`company/${planning.company.id}`}>{planning.company.id}</Link> : ''}</td>
                  <td>{planning.route ? <Link to={`route/${planning.route.id}`}>{planning.route.id}</Link> : ''}</td>
                  <td>{planning.configFare ? <Link to={`config-fare/${planning.configFare.id}`}>{planning.configFare.id}</Link> : ''}</td>
                  <td>{planning.cabin ? <Link to={`cabin/${planning.cabin.id}`}>{planning.cabin.id}</Link> : ''}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${planning.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${planning.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${planning.id}/delete`} color="danger" size="sm">
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

const mapStateToProps = ({ planning }: IRootState) => ({
  planningList: planning.entities
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
)(Planning);

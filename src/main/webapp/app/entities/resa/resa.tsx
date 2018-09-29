import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, InputGroup, Col, Row, Table } from 'reactstrap';
import { AvForm, AvGroup, AvInput } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudSearchAction, ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getSearchEntities, getEntities } from './resa.reducer';
import { IResa } from 'app/shared/model/resa.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IResaProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export interface IResaState {
  search: string;
}

export class Resa extends React.Component<IResaProps, IResaState> {
  state: IResaState = {
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
    const { resaList, match } = this.props;
    return (
      <div>
        <h2 id="resa-heading">
          <Translate contentKey="letsgoApp.resa.home.title">Resas</Translate>
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />&nbsp;
            <Translate contentKey="letsgoApp.resa.home.createLabel">Create new Resa</Translate>
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
                    placeholder={translate('letsgoApp.resa.home.search')}
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
                  <Translate contentKey="letsgoApp.resa.passengerName">Passenger Name</Translate>
                </th>
                <th>
                  <Translate contentKey="letsgoApp.resa.passengerCniNumber">Passenger Cni Number</Translate>
                </th>
                <th>
                  <Translate contentKey="letsgoApp.resa.email">Email</Translate>
                </th>
                <th>
                  <Translate contentKey="letsgoApp.resa.number">Number</Translate>
                </th>
                <th>
                  <Translate contentKey="letsgoApp.resa.partner">Partner</Translate>
                </th>
                <th>
                  <Translate contentKey="letsgoApp.resa.company">Company</Translate>
                </th>
                <th>
                  <Translate contentKey="letsgoApp.resa.travel">Travel</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {resaList.map((resa, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${resa.id}`} color="link" size="sm">
                      {resa.id}
                    </Button>
                  </td>
                  <td>{resa.passengerName}</td>
                  <td>{resa.passengerCniNumber}</td>
                  <td>{resa.email}</td>
                  <td>{resa.number}</td>
                  <td>{resa.partner ? <Link to={`partner/${resa.partner.id}`}>{resa.partner.id}</Link> : ''}</td>
                  <td>{resa.company ? <Link to={`company/${resa.company.id}`}>{resa.company.id}</Link> : ''}</td>
                  <td>{resa.travel ? <Link to={`travel/${resa.travel.id}`}>{resa.travel.id}</Link> : ''}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${resa.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${resa.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${resa.id}/delete`} color="danger" size="sm">
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

const mapStateToProps = ({ resa }: IRootState) => ({
  resaList: resa.entities
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
)(Resa);

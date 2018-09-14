import React                                          from 'react';
import PropTypes                                      from 'prop-types';
import { TabContent, Nav, TabPane, NavItem, NavLink } from 'reactstrap';
import TabModal                                       from './core/Modal';
import './index.css';
import axios from 'axios';

const _TabProps = {
  type: PropTypes.string,
  form_authenticity_token: PropTypes.string,
  reservations_url: PropTypes.string,
  reservations: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    email: PropTypes.string,
    name: PropTypes.string,
    phone: PropTypes.string,
    reservation_date: PropTypes.string,
    reservation_time: PropTypes.string,
    actual_guests: PropTypes.number,
    guests: PropTypes.number,
    canceled_by: PropTypes.string,
    special_request: PropTypes.string,
    actions: PropTypes.array,
    update_url: PropTypes.string,
  }))
};

const types = ['opened', 'closed', 'canceled'];

class Tab extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      type: types[0],
      reservations: this.props.reservations,
      modalOpened: false,
      activeId: '',
      item: null,
      inputValue: '',
      noGuests: false,
      isLoading: false,
      error: null,
    }
  }

  handleGetRequest = (cb) => axios.get(`${this.props.reservations_url}?status=${this.state.type}`)
    .then(response => {
      this.setState({isLoading: false, reservations: response.data}, () => {cb ? cb() : {}});
    })
    .catch((error) => {
      this.setState({isLoading: false});
      console.log(error);
    });

  componentDidMount() {
    this.handleGetRequest();
  }

  handleInputChange = (value) => {
    const inputValue = +value;
    if (inputValue >= 0 && inputValue <= 12) {
      this.setState(({inputValue}), () => {
        if (inputValue === 0) {
          this.setState({noGuests: true})
        }
      })
    }
  }

  handleCloseModalButton = () => {
    this.setState({noGuests: false}, () => this.closeModal());
  }

  handleCheck = () => {
    this.setState((state) => ({noGuests: !state.noGuests, inputValue: !state.noGuests ? 0 : state.inputValue}));
  }

  handleCancel = (reservation) => {
    const {reservations } = this.state;
    axios.patch(`${reservation.update_url}`, {
      authenticity_token: this.props.form_authenticity_token,
      id: reservation.id,
      status: types[2],
    }).then(() => {
      const filtered = reservations.filter((item) => item.id !== reservation.id);
      return this.setState({reservations: filtered});
    }).catch((error) => this.setState(error));

  }

  handleItemDelete = () => {
    const {reservations, activeId, inputValue, item, type} = this.state;
    this.setState({error: null});
    axios.patch(`${item.update_url}`, {
      authenticity_token: this.props.form_authenticity_token,
      id: activeId,
      actual_guests: inputValue,
      status: types[1],
    }).then(() => {
      const filtered = reservations.filter((item) => item.id !== activeId);
      if (type === types[0]) {
        this.setState({reservations: filtered}, () => this.closeModal());
      } else {
        this.handleGetRequest(this.closeModal)
      }
    }).catch((error) => this.setState(error));

  }

  openModal = (item) => this.setState(() =>
    ({modalOpened: true, activeId: item.id, item, inputValue: item.actual_guests}));

  closeModal = () => this.setState(() => ({modalOpened: false, activeId: '', inputValue: '', item: null}));

  toggleTab = (type) => this.setState({type}, () => {
    this.setState({isLoading: true}, () => this.handleGetRequest());
  });

  getHeadings(type) {
    return (
      <thead>
        <tr>
          <th>Guest Name</th>
          <th>E-mail</th>
          <th>Phone</th>
          <th>Reservation Date</th>
          <th>Reservation Time</th>
          <th>Guests</th>
          {type === types[1] && <th>Actual guests</th>}
          <th>Special Requests</th>
          <th>{type === types[2] ? 'Canceled by' : 'Actions'}</th>
        </tr>
      </thead>
    )
  }

  getActions(item) {
    const {type} = this.state;
    return <React.Fragment>
      <button className="btn btn-primary uppercase"  onClick={() => this.openModal(item)}>Manage</button>&nbsp;
      {type === types[0] && <a className="btn btn-secondary uppercase" onClick={() => this.handleCancel(item)}>
        Cancel
      </a>}
    </React.Fragment>
  }

  getTableData() {
    const {reservations, type} = this.state;
    return (reservations.length === 0)
      ? <tr>
        <td colSpan={type === types[1] ? 9 : 8}>
          No reservations found
        </td>
      </tr>
      : reservations.map((item) => (
        <tr key={item.id}>
          <th>{item.name}</th>
          <th>{item.email}</th>
          <th>{item.phone}</th>
          <th>{item.reservation_date}</th>
          <th>{item.reservation_time}</th>
          <th>{item.guests}</th>
          {type === types[1] && <th>{item.actual_guests}</th>}
          <th>{item.special_request}</th>
          <th>{type === types[2] ? item.canceled_by : this.getActions(item)}</th>
        </tr>
      ))

  }

  getNavLink(name, activeType) {
    const {type} = this.state;
    return (<NavItem>
      <NavLink className={`${type === activeType ? 'active' : ''}`} onClick={() => this.toggleTab(activeType)}>
        {name}
      </NavLink>
    </NavItem>)
  }

  getTable(activeType) {
    const {isLoading} = this.state;
    return (
      <TabPane tabId={activeType}>
        <div className="table-responsive">
          <div className={`table-loading ${isLoading ? 'visible': ''}`}>Loading...</div>
          <table className="table">
            {this.getHeadings(activeType)}
            <tbody>
            {this.getTableData()}
            </tbody>
          </table>
        </div>
      </TabPane>
    )
  }

  render() {
    const {type, modalOpened, inputValue, error, noGuests} = this.state;
    return (
      <div className="tab-pane " role="tabpanel">
        <TabModal
          closeModal={this.closeModal}
          noGuests={noGuests}
          opened={modalOpened}
          handleInputChange={this.handleInputChange}
          handleItemDelete={this.handleItemDelete}
          handleCloseModalButton={this.handleCloseModalButton}
          inputValue={inputValue}
          handleCheck={this.handleCheck}
          error={error}
        />
        <Nav tabs>
          {this.getNavLink('Open reservations', types[0])}
          {this.getNavLink('Closed reservations', types[1])}
          {this.getNavLink('Canceled reservations', types[2])}
        </Nav>
        <TabContent activeTab={type}>
          {this.getTable(types[0])}
          {this.getTable(types[1])}
          {this.getTable(types[2])}
        </TabContent>
      </div>
    )
  }
}

Tab.propTypes = _TabProps;

export default Tab;

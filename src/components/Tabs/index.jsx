import React                                          from 'react';
import PropTypes                                      from 'prop-types';
import { TabContent, Nav, TabPane, NavItem, NavLink } from 'reactstrap';
import TabModal                                       from './core/Modal';
import './index.css';

const _TabProps = {
  type: PropTypes.string,
  reservations: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    email: PropTypes.string,
    name: PropTypes.string,
    phone: PropTypes.string,
    reservation_date: PropTypes.string,
    reservation_time: PropTypes.string,
    party_size: PropTypes.number,
    special_requests: PropTypes.string,
    actions: PropTypes.string,
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
      inputValue: null,
      isLoading: false,
    }
  }

  componentDidUpdate(prevProps, prevState) {

  }


  handleInputChange = (inputValue) => {
    if (inputValue >= 0 && inputValue <= 12) {
      this.setState(() => ({inputValue}))
    }
  }

  handleCancel = () => {
    console.log('canceled!');
  }

  handleItemDelete = () => {
    const {reservations, activeId} = this.state;
    const filtered = reservations.filter((item) => item.id !== activeId);
    this.setState({reservations: filtered}, () => this.closeModal());
  }

  openModal = (id) => this.setState(() => ({modalOpened: true, activeId: id}));

  closeModal = () => this.setState(() => ({modalOpened: false, activeId: '', inputValue: null}));

  toggleTab = (type) => this.setState(() => ({type}));

  getHeadings(type) {
    return (
      <thead>
      <tr>
        <th>Guest Name</th>
        <th>E-mail</th>
        <th>Phone</th>
        <th>Reservation Date</th>
        <th>Reservation Time</th>
        <th>Party Size</th>
        <th>Special Requests</th>
        <th>{type === 'canceled' ? 'Canceled by' : 'Actions'}</th>
      </tr>
      </thead>
    )
  }

  getActions(id) {
    return <React.Fragment>
      <a href="#" onClick={() => this.openModal(id)}>Manage</a>
      {' '}
      <a href="#" onClick={this.handleCancel}>Cancel</a>
    </React.Fragment>
  }

  getTableData() {
    const {reservations, type} = this.state;
    return (reservations.length === 0)
      ? <tr>
        <td colSpan={8}>
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
          <th>{item.party_size}</th>
          <th>{item.special_requests}</th>
          <th>{type === 'canceled' ? item.name : this.getActions(item.id)}</th>
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
    const {type, modalOpened, inputValue} = this.state;
    return (
      <div className="tab-pane " role="tabpanel">
        <TabModal
          closeModal={this.closeModal}
          opened={modalOpened}
          handleInputChange={this.handleInputChange}
          handleItemDelete={this.handleItemDelete}
          inputValue={inputValue}
        />
        <Nav tabs>
          {this.getNavLink('Opened', types[0])}
          {this.getNavLink('Closed', types[1])}
          {this.getNavLink('Canceled', types[2])}
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

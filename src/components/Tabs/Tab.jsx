import React from 'react';
import PropTypes from 'prop-types';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input } from 'reactstrap';

const _TabProps = {
  type: PropTypes.string,
  reservations: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    email:PropTypes.string,
    name: PropTypes.string,
    phone: PropTypes.string,
    reservation_date: PropTypes.string,
    reservation_time: PropTypes.string,
    party_size: PropTypes.number,
    special_requests: PropTypes.string,
    actions: PropTypes.string,
  }))
};

class Tab extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      type: this.props.type,
      reservations: this.props.reservations,
      modal: false,
      activeId: '',
      inputValue: '',
    }

  }

  handleInputChange = (e) => {
    const inputValue = e.target.value;
    if (inputValue >=0 && inputValue <= 12) {
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

  openModal = (id) => this.setState(() => ({modal: true, activeId: id}));

  closeModal = () => this.setState(() => ({modal: false, activeId: ''}));

  getHeadings() {
    const {type} = this.state;
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
      <a href="#" onClick={this.handleCancel}>Cancel</a>
    </React.Fragment>
  }

  getTableData() {
    const { reservations, type } = this.state;
    return  (reservations.length === 0)
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

  render() {
    const {type, modal, inputValue} = this.state;
    return (
      <div id={type} className="tab-pane " role="tabpanel">
        <Modal isOpen={modal} toggle={this.closeModal}>
          <ModalHeader>Modal title</ModalHeader>
          <ModalBody>
            <Input
              type="number"
              min="0"
              max="12"
              value={inputValue}
              onChange={this.handleInputChange}
            />
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.handleItemDelete}>Do Something</Button>{' '}
            <Button color="secondary" onClick={this.closeModal}>Cancel</Button>
          </ModalFooter>
        </Modal>
        <div className="table-responsive">
          <table className="table">
            {this.getHeadings()}
            <tbody>
            {this.getTableData()}
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}

Tab.propTypes = _TabProps;

export default Tab;

import React from 'react';
import PropTypes from 'prop-types';

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
    }

  }

  handleItemDelete = (id) => {
    const {reservations} = this.state;
    const filtered = reservations.filter((item) => item.id !== id);
    this.setState(() => ({reservations: filtered}));
  }

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

  getTableData() {
    const { reservations } = this.state;
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
          <th
            onClick={() => this.handleItemDelete(item.id)}
          >{item.actions}</th>
        </tr>
      ))

  }


  render() {
    const {type} = this.state;
    return (
      <div id={type} className="tab-pane " role="tabpanel">
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

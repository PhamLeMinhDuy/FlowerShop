import axios from 'axios';
import React, { Component } from 'react';
import MyContext from '../contexts/MyContext';
import "./css/CustomerComponent.css"

class Customer extends Component {
  static contextType = MyContext; // using this.context to access global state
  constructor(props) {
    super(props);
    this.state = {
      customers: [],
      orders: [],
      order: null
    };
  }
  render() {
    const customers = this.state.customers.map((item) => {
      return (
        <tr key={item._id} className="datatable" onClick={() => this.trCustomerClick(item)}>
          <td>{item._id}</td>
          <td>{item.username}</td>
          <td>{item.password}</td>
          <td>{item.name}</td>
          <td>{item.phone}</td>
          <td>{item.email}</td>
          <td>{item.active}</td>
          <td>
            {item.active === 0 ?
              <span className="link" onClick={() => this.lnkEmailClick(item)}>EMAIL</span>
              :
              <span className="link" onClick={() => this.lnkDeactiveClick(item)}>DEACTIVE</span>}
          </td>
        </tr>
      );
    });
    const orders = this.state.orders.map((item) => {
      return (
        <tr key={item._id} className="datatable" onClick={() => this.trOrderClick(item)}>
          <td>{item._id}</td>
          <td>{new Date(item.cdate).toLocaleString()}</td>
          <td>{item.customer.name}</td>
          <td>{item.customer.phone}</td>
          <td>{item.total}</td>
          <td>{item.status}</td>
        </tr>
      );
    });
    if (this.state.order) {
      var items = this.state.order.items.map((item, index) => {
        return (
          <tr key={item.plant._id} className="datatable">
            <td>{index + 1}</td>
            <td>{item.plant._id}</td>
            <td>{item.plant.name}</td>
            <td><img src={"data:image/jpg;base64," + item.plant.image} width="70px" height="70px" alt="" /></td>
            <td>{item.plant.price}</td>
            <td>{item.quantity}</td>
            <td>{item.plant.price * item.quantity}</td>
          </tr>
        );
      });
    }
    return (
      <div className='customer-list'>
        <div className="customer__container">
          <h2 className="customer__container-title">CUSTOMER LIST</h2>
          <div className='customer'>
          <table className="customer__container-table" border="1">
            <tbody>
              <tr className="customer__container-table-titlerow">
                <th>ID</th>
                <th>Username</th>
                <th>Password</th>
                <th>Name</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Active</th>
                <th>Action</th>
              </tr>
              {customers}
            </tbody>
          </table>
        </div>
        </div>
        {this.state.orders.length > 0 ?
          <div className="customer__container">
            <h2 className="customer__container-title">ORDER LIST</h2>
            <div className='customer'>
            <table className="customer__container-table" border="1">
              <tbody>
                <tr className="customer__container-table-titlerow">
                  <th>ID</th>
                  <th>Creation date</th>
                  <th>Cust.name</th>
                  <th>Cust.phone</th>
                  <th>Total</th>
                  <th>Status</th>
                </tr>
                {orders}
              </tbody>
            </table>
          </div>
        </div>
          : <div />}
        {this.state.order ?
          <div className="customer__container">
            <h2 className="customer__container-title">ORDER DETAIL</h2>
            <div className='customer'>
            <table className="customer__container-table" border="1">
              <tbody>
                <tr className="customer__container-table-titlerow">
                  <th>No.</th>
                  <th>Prod.ID</th>
                  <th>Prod.name</th>
                  <th>Image</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Amount</th>
                </tr>
                {items}
              </tbody>
            </table>
          </div>
        </div>
          : <div />}
      </div>
    );
  }
  componentDidMount() {
    this.apiGetCustomers();
  }
  // event-handlers
  trCustomerClick(item) {
    this.setState({ orders: [], order: null });
    this.apiGetOrdersByCustID(item._id);
  }
  trOrderClick(item) {
    this.setState({ order: item });
  }
  lnkDeactiveClick(item) {
    this.apiPutCustomerDeactive(item._id, item.token);
  }
  lnkEmailClick(item) {
    this.apiGetCustomerSendmail(item._id);
  }
  // apis
  apiGetCustomers() {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.get('/api/admin/customers', config).then((res) => {
      const result = res.data;
      this.setState({ customers: result });
    });
  }
  apiGetOrdersByCustID(cid) {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.get('/api/admin/orders/customer/' + cid, config).then((res) => {
      const result = res.data;
      this.setState({ orders: result });
    });
  }
  apiPutCustomerDeactive(id, token) {
    const body = { token: token };
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.put('/api/admin/customers/deactive/' + id, body, config).then((res) => {
      const result = res.data;
      if (result) {
        this.apiGetCustomers();
      } else {
        alert('SORRY BABY!');
      }
    });
  }
  apiGetCustomerSendmail(id) {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.get('/api/admin/customers/sendmail/' + id, config).then((res) => {
      const result = res.data;
      alert(result.message);
    });
  }
}
export default Customer;
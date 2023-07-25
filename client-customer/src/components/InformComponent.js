import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import MyContext from '../contexts/MyContext';
import {ShoppingCart} from "react-feather"

class Inform extends Component {
  static contextType = MyContext;
  render() {
    return (
      <div className="navbar__user">
        <div className="float-left">
        {this.context.token === '' ?
          <div><Link to='/login'>Login</Link> | <Link to='/signup'>Sign-up</Link></div>
          :
          <div><Link to='/myprofile'><b>{this.context.customer.name}</b></Link> | <Link to='/home' onClick={() => this.lnkLogoutClick()}>Logout</Link></div>
        }
        </div>
        <div className="float-right">
          <Link to='/mycart'><ShoppingCart/> </Link> Giỏ hàng
        </div>
        <div className="float-clear" />
      </div>
    );
  }
  // event-handlers
  lnkLogoutClick() {
    this.context.setToken('');
    this.context.setCustomer(null);
    this.context.setMycart([]);
  }
}
export default Inform;
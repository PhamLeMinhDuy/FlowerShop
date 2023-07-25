import React, { Component } from 'react';
import MyContext from '../contexts/MyContext';
import { Link } from 'react-router-dom';
import "./css/MenuComponent.css"

class Menu extends Component {
  static contextType = MyContext; // using this.context to access global state
  render() {
    return (
      <div className="navbar">
        <div className="navbar__left">
          <ul className="navbar__left-menu">
            <li className="menu"><Link to='/admin/category'>Category</Link></li>
            <li className="menu"><Link to='/admin/plant'>Plant</Link></li>
            <li className="menu"><Link to='/admin/order'>Order</Link></li>
            <li className="menu"><Link to='/admin/customer'>Customer</Link></li>
          </ul>
        </div>
        <div className="navbar__right">
          <b>{this.context.username}</b> <span>|</span> <Link to='/admin/home' onClick={() => this.lnkLogoutClick()}>Logout</Link>
        </div>
        <div className="float-clear" />
      </div>
    );
  }
  // event-handlers
  lnkLogoutClick() {
    this.context.setToken('');
    this.context.setUsername('');
  }
}
export default Menu;
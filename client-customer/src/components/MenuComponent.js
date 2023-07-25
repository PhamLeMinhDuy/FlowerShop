import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import withRouter from '../utils/withRouter';
import "./css/MenuComponent.css";

class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      txtKeyword: ''
    };
  }
  render() {
    const cates = this.state.categories.map((item) => {
      return (
        <li key={item._id} className="menu"><Link to={'/plant/category/' + item._id}>{item.name}</Link></li>
      );
    });
    return (
      <div className="navbar__container">
        <div className="navbar__container-left">
          <span className="navbar__container-left-home"><Link to='/'>Home</Link></span>
          <span className="navbar__container-left-plants">Plant<ul className='navbar__container-left-plants-ul'>{cates}</ul></span>
        </div>
        <div className="navbar__container-right">
        <form className="navbar__container-right-search">
          <input type="search" placeholder="Nhập từ khóa" className="navbar__container-right-search-input" value={this.state.txtKeyword} onChange={(e) => { this.setState({ txtKeyword: e.target.value }) }} />
          <input type="submit" value="Search" className="navbar__container-right-search-btn" onClick={(e) => this.btnSearchClick(e)} />
        </form>
        </div>
        <div className="" />
      </div>
    );
  }
  componentDidMount() {
    this.apiGetCategories();
  }
  // apis
  apiGetCategories() {
    axios.get('/api/customer/categories').then((res) => {
      const result = res.data;
      this.setState({ categories: result });
    });
  }
  // event-handlers
  btnSearchClick(e) {
    e.preventDefault();
    this.props.navigate('/plant/search/' + this.state.txtKeyword);
  }
}

export default withRouter(Menu);
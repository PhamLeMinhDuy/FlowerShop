import axios from 'axios';
import React, { Component } from 'react';
import MyContext from '../contexts/MyContext';
import withRouter from '../utils/withRouter';
import "./css/LoginComponent.css"
import { Link } from 'react-router-dom';

class Login extends Component {
  static contextType = MyContext; // using this.context to access global state
  constructor(props) {
    super(props);
    this.state = {
      txtUsername: '',
      txtPassword: ''
    };
  }
  render() {
    return (
      <div className='login-signup'>
      <div className="login-signup-form">
        <div className="login-signup-form__title">
          <h2 className="">ĐĂNG NHẬP</h2>
          <h2 className="login-signup-form__title-2"><Link to='/signup'>Đăng ký</Link></h2>
        </div>

        <form className='login-signup-form__form'>
          <table className="login-signup-form__form-table">
            <tbody>
              <tr>
                <td>Tên đăng nhập:</td>
                <td><input className='login-signup-form__form-table-input' type="text" value={this.state.txtUsername} onChange={(e) => { this.setState({ txtUsername: e.target.value }) }} /></td>
              </tr>
              <tr>
                <td>Mật khẩu:</td>
                <td><input className='login-signup-form__form-table-input' type="password" value={this.state.txtPassword} onChange={(e) => { this.setState({ txtPassword: e.target.value }) }} /></td>
              </tr>
              <tr>
                <td></td>
                <td><input className='login-signup-form__form-table-btn' type="submit" value="Đăng nhập" onClick={(e) => this.btnLoginClick(e)} /></td>
              </tr>
            </tbody>
          </table>
        </form>
      </div>
      </div>
    );
  }
  // event-handlers
  btnLoginClick(e) {
    e.preventDefault();
    const username = this.state.txtUsername;
    const password = this.state.txtPassword;
    if (username && password) {
      const account = { username: username, password: password };
      this.apiLogin(account);
    } else {
      alert('Xin nhập đầy đủ tên đăng nhập và mật khẩu');
    }
  }
  // apis
  apiLogin(account) {
    axios.post('/api/customer/login', account).then((res) => {
      const result = res.data;
      if (result.success === true) {
        this.context.setToken(result.token);
        this.context.setCustomer(result.customer);
        this.props.navigate('/home');
      } else {
        alert(result.message);
      }
    });
  }
}
export default withRouter(Login);
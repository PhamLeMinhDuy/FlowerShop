import axios from 'axios';
import React, { Component } from 'react';
import "./css/LoginComponent.css"
import { Link } from 'react-router-dom';

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      txtUsername: '',
      txtPassword: '',
      txtName: '',
      txtPhone: '',
      txtEmail: ''
    };
  }
  render() {
    return (
      <div className='login-signup'>
      <div className="login-signup-form">
        <div className="login-signup-form__title">
          <h2 className="">ĐĂNG KÝ</h2>
          <h2 className="login-signup-form__title-2"><Link to='/login'>Đăng nhập</Link></h2>
        </div>
        <form className='login-signup-form__form'>
          <table className="login-signup-form__form-table">
            <tbody>
              <tr>
                <td>Username</td>
                <td><input className='login-signup-form__form-table-input' type="text" value={this.state.txtUsername} onChange={(e) => { this.setState({ txtUsername: e.target.value }) }} /></td>
              </tr>
              <tr>
                <td>Password</td>
                <td><input className='login-signup-form__form-table-input' type="password" value={this.state.txtPassword} onChange={(e) => { this.setState({ txtPassword: e.target.value }) }} /></td>
              </tr>
              <tr>
                <td>Name</td>
                <td><input className='login-signup-form__form-table-input' type="text" value={this.state.txtName} onChange={(e) => { this.setState({ txtName: e.target.value }) }} /></td>
              </tr>
              <tr>
                <td>Phone</td>
                <td><input className='login-signup-form__form-table-input' type="tel" value={this.state.txtPhone} onChange={(e) => { this.setState({ txtPhone: e.target.value }) }} /></td>
              </tr>
              <tr>
                <td>Email</td>
                <td><input className='login-signup-form__form-table-input' type="email" value={this.state.txtEmail} onChange={(e) => { this.setState({ txtEmail: e.target.value }) }} /></td>
              </tr>
              <tr>
                <td></td>
                <td><input className='login-signup-form__form-table-btn' type="submit" value="Đăng kí" onClick={(e) => this.btnSignupClick(e)} /></td>
              </tr>
            </tbody>
          </table>
        </form>
      </div>
      </div>
    );
  }
  // event-handlers
  btnSignupClick(e) {
    e.preventDefault();
    const username = this.state.txtUsername;
    const password = this.state.txtPassword;
    const name = this.state.txtName;
    const phone = this.state.txtPhone;
    const email = this.state.txtEmail;
    if (username && password && name && phone && email) {
      const account = { username: username, password: password, name: name, phone: phone, email: email };
      this.apiSignup(account);
    } else {
      alert('Xin nhập đầy đủ các thông tin');
    }
  }
  // apis
  apiSignup(account) {
    axios.post('/api/customer/signup', account).then((res) => {
      const result = res.data;
      alert(result.message);
    });
  }
}
export default Signup;
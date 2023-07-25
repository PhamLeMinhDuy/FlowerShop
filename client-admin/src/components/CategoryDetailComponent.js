import axios from 'axios';
import React, { Component } from 'react';
import MyContext from '../contexts/MyContext';

class CategoryDetail extends Component {
  static contextType = MyContext; // using this.context to access global state
  constructor(props) {
    super(props);
    this.state = {
      txtID: '',
      txtName: ''
    };
  }
  render() {
    return (
      <div className="category-detail__container">
        <h2 className="category-detail__container-title">Chi tiết</h2>
        <form className="category-detail__container-form">
          <table className="category-detail__container-table">
            <tbody>
              <tr className="category-detail__container-row">
                <td>ID:</td>
                <td><input className="category-detail__container-input category-detail__container-input-disable" type="text" value={this.state.txtID} onChange={(e) => { this.setState({ txtID: e.target.value }) }} readOnly={true} /></td>
              </tr>
              <tr className="category-detail__container-row">
                <td>Tên:</td>
                <td><input className="category-detail__container-input" type="text" value={this.state.txtName} onChange={(e) => { this.setState({ txtName: e.target.value }) }} /></td>
              </tr>
              <tr>
                <td></td>
                <td className="category-detail__container-btn">
                  <input className="category-detail__container-btn1 category-detail-btn" type="submit" value="Thêm" onClick={(e) => this.btnAddClick(e)} />
                  <input className="category-detail__container-btn2 category-detail-btn" type="submit" value="Cập nhật" onClick={(e) => this.btnUpdateClick(e)} />
                  <input className="category-detail__container-btn3 category-detail-btn" type="submit" value="Xóa" onClick={(e) => this.btnDeleteClick(e)} />
                </td>
              </tr>
            </tbody>
          </table>
        </form>
      </div>
    );
  }
  componentDidUpdate(prevProps) {
    if (this.props.item !== prevProps.item) {
      this.setState({ txtID: this.props.item._id, txtName: this.props.item.name });
    }
  }
  // event-handlers
  btnAddClick(e) {
    e.preventDefault();
    const name = this.state.txtName;
    if (name) {
      const cate = { name: name };
      this.apiPostCategory(cate);
    } else {
      alert('Xin nhập tên loại cây');
    }
  }
  btnUpdateClick(e) {
    e.preventDefault();
    const id = this.state.txtID;
    const name = this.state.txtName;
    if (id && name) {
      const cate = { name: name };
      this.apiPutCategory(id, cate);
    } else {
      alert('Xin nhập ID và Tên Loại cây');
    }
  }
  btnDeleteClick(e) {
    e.preventDefault();
    if (window.confirm('Bạn có chắc chắn muốn xóa loại cây này hay không?')) {
      const id = this.state.txtID;
      if (id) {
        this.apiDeleteCategory(id);
      } else {
        alert('Xin hãy nhập ID loại cây');
      }
    }
  }
  // apis
  apiPostCategory(cate) {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.post('/api/admin/categories', cate, config).then((res) => {
      const result = res.data;
      if (result) {
        alert('Thêm thành công');
        this.apiGetCategories();
      } else {
        alert('Thêm thất bại');
      }
    });
  }
  apiGetCategories() {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.get('/api/admin/categories', config).then((res) => {
      const result = res.data;
      this.props.updateCategories(result);
    });
  }
  apiPutCategory(id, cate) {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.put('/api/admin/categories/' + id, cate, config).then((res) => {
      const result = res.data;
      if (result) {
        alert('Cập nhật thành công');
        this.apiGetCategories();
      } else {
        alert('Cập nhật thất bại');
      }
    });
  }
  apiDeleteCategory(id) {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.delete('/api/admin/categories/' + id, config).then((res) => {
      const result = res.data;
      if (result) {
        alert('Xóa thành công');
        this.apiGetCategories();
      } else {
        alert('Xóa thất bại');
      }
    });
  }
}
export default CategoryDetail;
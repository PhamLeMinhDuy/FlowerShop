import axios from 'axios';
import React, { Component } from 'react';
import MyContext from '../contexts/MyContext';

class PlantDetail extends Component {
  static contextType = MyContext; // using this.context to access global state
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      txtID: '',
      txtName: '',
      txtPrice: 0,
      cmbCategory: '',
      imgPlant: '',
    };
  }
  render() {
    const cates = this.state.categories.map((cate) => {
      if (this.props.item != null) {
        return (<option key={cate._id} value={cate._id} selected={cate._id === this.props.item.category._id}>{cate.name}</option>);
      } else {
        return (<option key={cate._id} value={cate._id}>{cate.name}</option>);
      }
    });
    return (
      <div className="plant-component__detail-container">
        <h2 className="plant-component__detail-container-title">PLANT DETAIL</h2>
        <form>
          <table>
            <tbody>
              <tr>
                <td className="plant-component__detail-container-item">ID:</td>
                <td><input className="plant-component__detail-container-input plant-component__detail-container-input-disable" type="text" value={this.state.txtID} onChange={(e) => { this.setState({ txtID: e.target.value }) }} readOnly={true} /></td>
              </tr>
              <tr>
                <td className="plant-component__detail-container-item">Name:</td>
                <td><input className="plant-component__detail-container-input" type="text" value={this.state.txtName} onChange={(e) => { this.setState({ txtName: e.target.value }) }} /></td>
              </tr>
              <tr>
                <td className="plant-component__detail-container-item">Price:</td>
                <td><input className="plant-component__detail-container-input" type="text" value={this.state.txtPrice} onChange={(e) => { this.setState({ txtPrice: e.target.value }) }} /></td>
              </tr>
              <tr>
                <td className="plant-component__detail-container-item">Image:</td>
                <td><input type="file" name="fileImage" accept="image/jpeg, image/png, image/gif" onChange={(e) => this.previewImage(e)} /></td>
              </tr>
              <tr>
                <td className="plant-component__detail-container-item">Category:</td>
                <td><select onChange={(e) => { this.setState({ cmbCategory: e.target.value }) }}>{cates}</select></td>
              </tr>
              <tr>
                <td></td>
                <td>
                  <input className="category-detail__container-btn1 category-detail-btn" type="submit" value="ADD NEW" onClick={(e) => this.btnAddClick(e)} />
                  <input className="category-detail__container-btn2 category-detail-btn" type="submit" value="UPDATE" onClick={(e) => this.btnUpdateClick(e)} />
                  <input className="category-detail__container-btn3 category-detail-btn" type="submit" value="DELETE" onClick={(e) => this.btnDeleteClick(e)} />
                </td>
              </tr>
              <tr>
                <td colSpan="2"><img className='plant-component__detail-container-img' src={this.state.imgPlant} width="300px" height="300px" alt="" /></td>
              </tr>
            </tbody>
          </table>
        </form>
      </div>
    );
  }
  componentDidMount() {
    this.apiGetCategories();
  }
  componentDidUpdate(prevProps) {
    if (this.props.item !== prevProps.item) {
      this.setState({
        txtID: this.props.item._id,
        txtName: this.props.item.name,
        txtPrice: this.props.item.price,
        cmbCategory: this.props.item.category._id,
        imgPlant: 'data:image/jpg;base64,' + this.props.item.image
      });
    }
  }
  // event-handlers
  previewImage(e) {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (evt) => {
        this.setState({ imgPlant: evt.target.result });
      }
      reader.readAsDataURL(file);
    }
  }
  btnAddClick(e) {
    e.preventDefault();
    const name = this.state.txtName;
    const price = parseInt(this.state.txtPrice);
    const category = this.state.cmbCategory;
    const image = this.state.imgPlant.replace(/^data:image\/[a-z]+;base64,/, ''); // remove "data:image/...;base64,"
    if (name && price && category && image) {
      const prod = { name: name, price: price, category: category, image: image, };
      this.apiPostPlant(prod);
    } else {
      alert('Xin nhập đầy đủ thông tin cây');
    }
  }
  btnUpdateClick(e) {
    e.preventDefault();
    const id = this.state.txtID;
    const name = this.state.txtName;
    const price = parseInt(this.state.txtPrice);
    const category = this.state.cmbCategory;
    const image = this.state.imgPlant.replace(/^data:image\/[a-z]+;base64,/, ''); // remove "data:image/...;base64,"
    if (id && name && price && category && image) {
      const prod = { name: name, price: price, category: category, image: image };
      this.apiPutPlant(id, prod);
    } else {
      alert('Xin nhập đầy đủ thông tin cây');
    }
  }
  btnDeleteClick(e) {
    e.preventDefault();
    if (window.confirm('Bạn có chắc chắn xóa hay không?')) {
      const id = this.state.txtID;
      if (id) {
        this.apiDeletePlant(id);
      } else {
        alert('Xin nhập ID');
      }
    }
  }
  // apis
  apiGetCategories() {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.get('/api/admin/categories', config).then((res) => {
      const result = res.data;
      this.setState({ categories: result });
    });
  }
  apiPostPlant(prod) {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.post('/api/admin/plants', prod, config).then((res) => {
      const result = res.data;
      if (result) {
        alert('Thêm thành công');
        this.apiGetPlants();
      } else {
        alert('Thêm thất bại');
      }
    });
  }
  apiGetPlants() {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.get('/api/admin/plants?page=' + this.props.curPage, config).then((res) => {
      const result = res.data;
      this.props.updatePlants(result.plants, result.noPages, result.curPage);
      if (result.plants.length !== 0) {
        this.props.updatePlants(result.plants, result.noPages, result.curPage);
      } else {
        const curPage = this.props.curPage - 1;
        axios.get('/api/admin/plants?page=' + curPage, config).then((res) => {
          const result = res.data;
          this.props.updatePlants(result.plants, result.noPages, curPage);
        });
      }
    });
  }
  apiPutPlant(id, prod) {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.put('/api/admin/plants/' + id, prod, config).then((res) => {
      const result = res.data;
      if (result) {
        alert('Cập nhật thành công');
        this.apiGetPlants();
      } else {
        alert('Cập nhật thất bại');
      }
    });
  }
  apiDeletePlant(id) {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.delete('/api/admin/plants/' + id, config).then((res) => {
      const result = res.data;
      if (result) {
        alert('Xóa thành công');
        this.apiGetPlants();
      } else {
        alert('Xóa thất bại');
      }
    });
  }
}
export default PlantDetail;
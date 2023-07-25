import axios from 'axios';
import React, { Component } from 'react';
import MyContext from '../contexts/MyContext';
import PlantDetail from './PlantDetailComponent';
import "./css/PlantComponent.css"

class Plant extends Component {
  static contextType = MyContext; // using this.context to access global state
  constructor(props) {
    super(props);
    this.state = {
      plants: [],
      noPages: 0,
      curPage: 1,
      itemSelected: null
    };
  }
  render() {
    const prods = this.state.plants.map((item) => {
      return (
        <tr key={item._id} className="datatable" onClick={() => this.trItemClick(item)}>
          <td>{item._id}</td>
          <td>{item.name}</td>
          <td>{item.price}</td>
          <td>{new Date(item.cdate).toLocaleString()}</td>
          <td>{item.category.name}</td>
          <td><img src={"data:image/jpg;base64," + item.image} width="100px" height="100px" alt="" /></td>
        </tr>
      );
    });
    const pagination = Array.from({ length: this.state.noPages }, (_, index) => {
      if ((index + 1) === this.state.curPage) {
        return (<span key={index}>| <b>{index + 1}</b> |</span>);
      } else {
        return (<span key={index} className="link" onClick={() => this.lnkPageClick(index + 1)}>| {index + 1} |</span>);
      }
    });
    return (
      <div className='plant-component'>
        <div className="plant__container">
          <h2 className="plant__container-title">PLANT LIST</h2>
          <div className='plant'>
          <table className="plant__container-table" border="1">
            <tbody>
              <tr className="plant__container-table-titlerow">
                <th>ID</th>
                <th>Name</th>
                <th>Price</th>
                <th>Creation date</th>
                <th>Category</th>
                <th>Image</th>
              </tr>
              {prods}
              <tr>
                <td colSpan="6">{pagination}</td>
              </tr>
            </tbody>
          </table>
        </div>
        </div>
        <div className="plant-component__detail" >
            <PlantDetail item={this.state.itemSelected} curPage={this.state.curPage} updatePlants={this.updatePlants} />
        </div>
      </div>
    );
  }
  componentDidMount() {
    this.apiGetPlants(this.state.curPage);
  }
  updatePlants = (plants, noPages, curPage) => { // arrow-function
    this.setState({ plants: plants, noPages: noPages, curPage: curPage });
  }
  // event-handlers
  lnkPageClick(index) {
    this.apiGetPlants(index);
  }
  trItemClick(item) {
    this.setState({ itemSelected: item });
  }
  // apis
  apiGetPlants(page) {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.get('/api/admin/plants?page=' + page, config).then((res) => {
      const result = res.data;
      this.setState({ plants: result.plants, noPages: result.noPages, curPage: result.curPage });
    });
  }
}
export default Plant;
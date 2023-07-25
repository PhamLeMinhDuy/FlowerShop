import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import withRouter from '../utils/withRouter';
import "./css/PlantComponent.css"
import {Search} from "react-feather"

class Plant extends Component {
  constructor(props) {
    super(props);
    this.state = {
      plants: []
    };
  }
  render() {
    const prods = this.state.plants.map((item) => {
      return (
        <div key={item._id} className="container__plant">
          <figure className='container__plant-content'>
            <img src={"data:image/jpg;base64," + item.image} width="300px" height="300px" alt="" />
            <div><span className='container__plant-content-name'>{item.name}</span>
            <span className='container__plant-content-price'>Giá: {item.price}Đ</span></div>
            <Link className='container__plant-content-link' to={'/plant/' + item._id}><div className='container__plant-content-hover'><p>Xem thông tin <br/> <Search/></p></div></Link>
          </figure>
        </div>
      );
    });
    return (
      <div className="container container-2">
        <h2 className="container__title">LIST PLANTS</h2>
        {prods}
      </div>
    );
  }
  componentDidMount() { // first: /plant/...
    const params = this.props.params;
    if (params.cid) {
      this.apiGetPlantsByCatID(params.cid);
    } else if (params.keyword) {
      this.apiGetPlantsByKeyword(params.keyword);
    }
  }
  componentDidUpdate(prevProps) { // changed: /plant/...
    const params = this.props.params;
    if (params.cid && params.cid !== prevProps.params.cid) {
      this.apiGetPlantsByCatID(params.cid);
    } else if (params.keyword && params.keyword !== prevProps.params.keyword) {
      this.apiGetPlantsByKeyword(params.keyword);
    }
  }
  // apis
  apiGetPlantsByCatID(cid) {
    axios.get('/api/customer/plants/category/' + cid).then((res) => {
      const result = res.data;
      this.setState({ plants: result });
    });
  }
  apiGetPlantsByKeyword(keyword) {
    axios.get('/api/customer/plants/search/' + keyword).then((res) => {
      const result = res.data;
      this.setState({ plants: result });
    });
  }
}
export default withRouter(Plant);
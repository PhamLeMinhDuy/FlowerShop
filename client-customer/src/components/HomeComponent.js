import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {Search} from "react-feather"
import "./css/PlantComponent.css";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newplants: [],
      hotplants: [],
      hotplantsofcat1: [],
      hotplantsofcat2: [],
      hotplantsofcat3: [],
      hotplantsofcat4: [],
      cat:"",
    };
  }
  render() {
    const newplants = this.state.newplants.map((item) => {
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
    const hotplants = this.state.hotplants.map((item) => {
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

    let hotChoice = this.state.cat === "FreshFlower" ? this.state.hotplantsofcat1 :
                    this.state.cat === "Funituretree" ? this.state.hotplantsofcat2 :
                    this.state.cat === "Cactusplants" ? this.state.hotplantsofcat3 :
                    this.state.hotplantsofcat4;
    const hotplantsofcat = hotChoice.map((item) => {
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
      <div>
        <div className='banner'><p className='banner__slogan'>Making beautiful<br/>flowers a part of<br/>your life.</p></div>
        <div className="container">
          <h2 className="container__title">NEW PLANTS</h2>
          {newplants}
        </div>
        {this.state.hotplants.length > 0 ?
          <div className="container">
            <h2 className="container__title">HOT PLANTS</h2>
            {hotplants}
          </div>
          : <div />}
        {this.state.hotplants.length > 0 ?
          <div className="container">
            <h2 className="container__title">SUGGETED PLANTS</h2>
            <div className='container__btn'>
              <button onClick={() => this.apiGetCategory("FreshFlower")}>Fresh Flower</button>
              <button onClick={() => this.apiGetCategory("Funituretree")}>Funiture tree</button>
              <button onClick={() => this.apiGetCategory("Cactusplants")}>Cactus plants</button>
              <button onClick={() => this.apiGetCategory("Succulentplants")}>Succulent plants</button>
            </div>
            {hotplantsofcat}
          </div>
          : <div />}
      </div>
    );
  }
  componentDidMount() {
    this.apiGetNewPlants();
    this.apiGetHotPlants();
    this.apiGetHotPlantsOfCat();
  }
  // apis
  apiGetNewPlants() {
    axios.get('/api/customer/plants/new').then((res) => {
      const result = res.data;
      this.setState({ newplants: result });
    });
  }
  apiGetHotPlants() {
    axios.get('/api/customer/plants/hot').then((res) => {
      const result = res.data;
      this.setState({ hotplants: result });
      console.log(result);
    });
  }

  apiGetHotPlantsOfCat = () => {
    axios.get('/api/customer/plants/hotofcat').then((res) => {
      const result = res.data;
      this.setState({ hotplantsofcat1: result.FreshFlower });
      this.setState({ hotplantsofcat2: result.Funituretree });
      this.setState({ hotplantsofcat3: result.Cactusplants });
      this.setState({ hotplantsofcat4: result.Succulentplants });
      console.log(this.state.hotplantsofcat2)
    });
  }

  apiGetCategory (cat) {
    this.setState({ cat: cat });
  }
}
export default Home;
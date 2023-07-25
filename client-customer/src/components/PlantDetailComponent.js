import axios from 'axios';
import React, { Component } from 'react';
import withRouter from '../utils/withRouter';
import MyContext from '../contexts/MyContext';
import "./css/PlantDetailComponent.css"

class PlantDetail extends Component {
  static contextType = MyContext;
  constructor(props) {
    super(props);
    this.state = {
      plant: null,
      txtQuantity: 1
    };
  }
  render() {
    const prod = this.state.plant;
    if (prod != null) {
      return (
        <div className="detail__container">
          <h2 className="detail__container-title">PLANT DETAILS</h2>
          <figure className="detail__container-plant">
            <img src={"data:image/jpg;base64," + prod.image} width="400px" height="400px" alt="" />
            <figcaption>
              <form>
                <table>
                  <tbody>
                    <tr className='detail__container-plant-row1'>
                      <td>{prod.name}</td>
                    </tr>
                    <tr>
                      <td className='detail__container-plant-price'>{prod.price}Đ</td>
                    </tr>
                    <tr>
                      <td><i>{prod.category.name}</i></td>
                    </tr>
                    <tr>
                      <td >Số lượng: <input className='detail__container-plant-count' type="number" min="1" max="99" value={this.state.txtQuantity} onChange={(e) => { this.setState({ txtQuantity: e.target.value }) }} /></td>
                    </tr>
                    <tr className='detail__container-plant-add'>
                      <td><input className='detail__container-plant-add-btn' type="submit" value="Thêm vào giỏ hàng" onClick={(e) => this.btnAdd2CartClick(e)} /></td>
                    </tr>
                  </tbody>
                </table>
              </form>
            </figcaption>
          </figure>
        </div>
      );
    }
    return (<div />);
  }
  componentDidMount() {
    const params = this.props.params;
    this.apiGetPlant(params.id);
  }
  // apis
  apiGetPlant(id) {
    axios.get('/api/customer/plants/' + id).then((res) => {
      const result = res.data;
      this.setState({ plant: result });
    });
  }
  // event-handlers
  btnAdd2CartClick(e) {
    e.preventDefault();
    const plant = this.state.plant;
    const quantity = parseInt(this.state.txtQuantity);
    if (quantity) {
      const mycart = this.context.mycart;
      const index = mycart.findIndex(x => x.plant._id === plant._id); // check if the _id exists in mycart
      if (index === -1) { // not found, push newItem
        const newItem = { plant: plant, quantity: quantity };
        mycart.push(newItem);
      } else { // increasing the quantity
        mycart[index].quantity += quantity;
      }
      this.context.setMycart(mycart);
      alert('Thêm thành công');
    } else {
      alert('Xin nhập số lượng');
    }
  }
}
export default withRouter(PlantDetail);
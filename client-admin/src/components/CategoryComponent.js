import axios from 'axios';
import React, { Component } from 'react';
import MyContext from '../contexts/MyContext';
import CategoryDetail from './CategoryDetailComponent';
import "./css/CategoryComponent.css"

class Category extends Component {
  static contextType = MyContext; // using this.context to access global state
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      itemSelected: null
    };
  }
  render() {
    const cates = this.state.categories.map((item) => {
      return (
        <tr key={item._id} className="datatable" onClick={() => this.trItemClick(item)}>
          <td>{item._id}</td>
          <td>{item.name}</td>
        </tr>
      );
    });
    return (
      <div className='container-categories'>
        <div className="category">
          <h2 className="category__title">Danh sách loại cây</h2>
          <table className="category__table" border="1">
            <tbody className='category__table-body'>
              <tr className="category__table-body-title">
                <th>ID</th>
                <th>Tên</th>
              </tr>
              {cates}
            </tbody>
          </table>
        </div>
        <div className="category-detail" >
            <CategoryDetail item={this.state.itemSelected} updateCategories={this.updateCategories} />
        </div>
      </div>
    );
  }
  componentDidMount() {
    this.apiGetCategories();
  }
  updateCategories = (categories) => { // arrow-function
    this.setState({ categories: categories });
  }
  // event-handlers
  trItemClick(item) {
    this.setState({ itemSelected: item });
  }
  // apis
  apiGetCategories() {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.get('/api/admin/categories', config).then((res) => {
      const result = res.data;
      this.setState({ categories: result });
    });
  }
}
export default Category;
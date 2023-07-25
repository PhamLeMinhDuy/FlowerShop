import React, { Component } from 'react';
import Menu from './MenuComponent';
import Inform from './InformComponent';
import Home from './HomeComponent';
import { Routes, Route, Navigate } from 'react-router-dom';
import Plant from './PlantComponent';
import PlantDetail from './PlantDetailComponent';
import Signup from './SignupComponent';
import Active from './ActiveComponent';
import Login from './LoginComponent';
import Myprofile from './MyprofileComponent';
import Mycart from './MycartComponent';
import Myorders from './MyordersComponent';
import "./css/InformComponent.css"

class Main extends Component {
  render() {
    const currentURL = window.location.href;
    return (
      <div className="body-customer">
        <div className='navbar'>
          <Menu />
          <Inform />
        </div>
        <Routes>
          <Route path='/' element={<Navigate replace to='/home' />} />
          <Route path='/home' element={<Home />} />
          <Route path='/plant/category/:cid' element={<Plant />} />
          <Route path='/plant/search/:keyword' element={<Plant />} />
          <Route path='/plant/:id' element={<PlantDetail />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/active' element={<Active />} />
          <Route path='/login' element={<Login />} />
          <Route path='/myprofile' element={<Myprofile />} />
          <Route path='/mycart' element={<Mycart />} />
          <Route path='/myorders' element={<Myorders />} />
        </Routes>
      </div>
    );
  }
}
export default Main;
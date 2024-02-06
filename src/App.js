import React, { Component } from 'react'
import { Route, Routes } from "react-router-dom";

import { StyleContext } from './context/StyleContext';
import PrivateRoute from './components/privateRoutes/PrivateRoutes';
import Dashboard from './components/dashboard/Dashboard';
import Category from './components/category/Category';
import Employee from './components/employee/Employee';
import Profile from './components/profile/Profile';
import AuthContext from './context/AuthContext';
import NavBar from './components/navBar/NavBar';
import Header from './components/header/Header';
import Graphs from './components/graphs/Graphs';
import Login from './components/login/Login';
import './App.css';

export class App extends Component {
  constructor(props) {
    super(props)

    const cachedStyle = localStorage.getItem('style');

    this.state = {
      style: cachedStyle || 'light',
      checked: cachedStyle === 'light' ? false : true
    }
  };

  componentDidMount = () => {
    const { style } = this.state;

    document.querySelector('body').setAttribute('data-theme', style);
  };

  changeStyle = () => {
    const { style } = this.state;

    localStorage.setItem('style', style === 'light' ? 'dark' : 'light');
    document.querySelector('body').setAttribute('data-theme', style === 'light' ? 'dark' : 'light');
    this.setState(prevState => ({
      style: prevState.style === 'light' ? 'dark' : 'light',
    }));
  };

  render() {
    const { style, checked, employeeList, categoryList } = this.state;

    return (
      <StyleContext.Provider value={style} id={style}>
        <div className='website'>
          {this.context.currentUser && <NavBar />}
          <div className='pre-header'>
            <Header changeStyle={this.changeStyle} checked={checked} />
            <Routes>
              <Route exact path='/' element={<PrivateRoute></PrivateRoute>}>
                <Route exact path='/' element={
                  <Dashboard style={style} />} />
              </Route>
              <Route exact path='/employees' element={<PrivateRoute></PrivateRoute>}>
                <Route exact path='/employees' element={
                  <Employee style={style} />} />
              </Route>
              <Route exact path='/category' element={<PrivateRoute></PrivateRoute>}>
                <Route exact path='/category' element={
                  <Category style={style} />} />
              </Route>
              {this.context.currentUser &&
                <Route exact path='/profile' element={<PrivateRoute></PrivateRoute>}>
                  <Route exact path='/profile' element={
                    <Profile user={this.context.currentUser.email} />} />
                </Route>}
              <Route exact path='/graphs' element={<PrivateRoute></PrivateRoute>}>
                <Route exact path='/graphs' element={
                  <Graphs employeeList={employeeList} categoryList={categoryList} />} />
              </Route>
              {/* <Route path='/signup' element={<Signup />} /> */}
              <Route path='/login' element={<Login />} />
            </Routes>
          </div>
        </div>
      </StyleContext.Provider>
    );
  }
}

App.contextType = AuthContext;
export default App;
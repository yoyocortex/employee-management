import React, { Component } from 'react'
import './App.css';
import { StyleContext } from './context/StyleContext';
import { Route, Routes } from "react-router-dom";
import { db } from './firebase/firebase';
import { getDocs, collection, addDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import PrivateRoute from './components/privateRoutes/PrivateRoutes';
import Dashboard from './components/dashboard/Dashboard';
import Content from './components/content/Content';
import AuthContext from './context/AuthContext';
import NavBar from './components/navBar/NavBar';
import Header from './components/header/Header';
import Graphs from './components/graphs/Graphs';
import Login from './components/login/Login';

export class App extends Component {
  constructor(props) {
    super(props)

    const cachedStyle = localStorage.getItem('style');

    this.state = {
      style: cachedStyle ?? 'light',
      checked: cachedStyle === 'light' ? false : true,
      employeeList: [],
      categoryList: []
    }
  };

  changeStyle = () => {
    localStorage.setItem('style', this.state.style === 'light' ? 'dark' : 'light');
    document.querySelector('body').setAttribute('data-theme', this.state.style === 'light' ? 'dark' : 'light');
    this.setState(state => ({
      style: state.style === 'light' ? 'dark' : 'light',
    }));
  };


  componentDidMount = () => {
    document.querySelector('body').setAttribute('data-theme', this.state.style);
    this.getEmployeeList();
    this.getCategoryList();
  };

  employeesCollectionRef = collection(db, "employees");
  categoryCollectionRef = collection(db, "category");

  // -------------------------------------------------CRUD-------------------------------------------------
  // ----------EMPLOYEE----------
  getEmployeeList = async () => {
    await getDocs(this.employeesCollectionRef).then((result) => {
      let filteredData = result.docs.map((doc) => ({ ...doc.data(), id: doc.id, }));
      this.setState({
        employeeList: filteredData
      });
    }).catch((error) => {
      console.error('An error occurred:', error);
    });
  };

  onSubmitNewEmployee = async (formData) => {
    await addDoc(this.employeesCollectionRef, formData).then((result) => {
      this.getEmployeeList();
    }).catch((error) => {
      console.error('An error occurred:', error);
    });
  };

  deleteEmployee = async (id) => {
    const empDoc = doc(db, "employees", id);
    await deleteDoc(empDoc).then((result) => {
      this.getEmployeeList();
    }).catch((error) => {
      console.error('An error occurred:', error);
    });
  };

  updateEmployee = async (id, formData) => {
    const empDoc = doc(db, "employees", id);
    return await updateDoc(empDoc, formData).then((result) => {
      this.getEmployeeList();
      return result;
    }).catch((error) => {
      return console.error('An error occurred:', error);
    });
  };
  // ----------CATEGORY----------
  getCategoryList = async () => {
    await getDocs(this.categoryCollectionRef).then((result) => {
      let filteredData = result.docs.map((doc) => ({ ...doc.data(), id: doc.id, }));
      this.setState({
        categoryList: filteredData
      });
    }).catch((error) => {
      console.error('An error occurred:', error);
    });
  };

  onSubmitNewCategory = async (formData) => {
    await addDoc(this.categoryCollectionRef, formData).then((result) => {
      this.getCategoryList();
    }).catch((error) => {
      console.error('An error occurred:', error);
    });
  };

  deleteCategory = async (id) => {
    const empDoc = doc(db, "category", id);
    await deleteDoc(empDoc).then((result) => {
      this.getCategoryList();
    }).catch((error) => {
      console.error('An error occurred:', error);
    });
  };

  updateCategory = async (id, formData) => {
    const empDoc = doc(db, "category", id);
    return await updateDoc(empDoc, formData).then((result) => {
      this.getCategoryList();
      return result;
    }).catch((error) => {
      return console.error('An error occurred:', error);
    });
  };
  // -------------------------------------------------CRUD-------------------------------------------------
  render() {
    return (
      <StyleContext.Provider value={this.state.style} id={this.state.style}>
        <div className='website'>
          {this.context.currentUser && <NavBar />}
          <div className='pre-header'>
            <Header changeStyle={this.changeStyle} checked={this.state.checked} />
            <Routes>
              <Route exact path='/' element={<PrivateRoute></PrivateRoute>}>
                <Route exact path='/' element={
                  <Dashboard employeeList={this.state.employeeList} categoryList={this.state.categoryList} style={this.state.style} />} />
              </Route>
              <Route exact path='/employees' element={<PrivateRoute></PrivateRoute>}>
                <Route exact path='/employees' element={
                  <Content contentType={'employee'}
                    onSubmitNew={this.onSubmitNewEmployee}
                    delete={this.deleteEmployee}
                    update={this.updateEmployee}
                    list={this.state.employeeList}
                    categories={this.state.categoryList}
                    style={this.state.style} />} />
              </Route>
              <Route exact path='/category' element={<PrivateRoute></PrivateRoute>}>
                <Route exact path='/category' element={
                  <Content contentType={'category'}
                    onSubmitNew={this.onSubmitNewCategory}
                    delete={this.deleteCategory}
                    update={this.updateCategory}
                    list={this.state.categoryList}
                    style={this.state.style} />} />
              </Route>
              {this.context.currentUser &&
                <Route exact path='/profile' element={<PrivateRoute></PrivateRoute>}>
                  <Route exact path='/profile' element={
                    <div className='d-flex flex-column justify-content-center align-items-center align-self-center' style={{ height: '100vh' }}>
                      <h1 className='p-3'>Profile</h1>
                      <div className='d-flex flex-row justify-content-center align-items-center align-self-center'>
                        <h2 className='p-1'>Email:</h2>
                        <h3 className='p-1'>{this.context.currentUser.email}</h3>
                      </div>
                    </div>} />
                </Route>}
              <Route exact path='/graphs' element={<PrivateRoute></PrivateRoute>}>
                <Route exact path='/graphs' element={
                  <div className='content' id={this.props.style} style={{ height: '100vh' }}>
                    <div className='content-headline'>
                      <h2>Graph</h2>
                    </div>
                    <Graphs employeeList={this.state.employeeList} categoryList={this.state.categoryList} />
                  </div>} />
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

import React, { Component, Fragment } from 'react';
import logo from './logo.svg';
import './App.css';
import Button from './Button';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { About } from './components/pages/About';
import { Register } from './components/auth/Register';
import { Login } from './components/auth/Login';
import setAuthToken from './utils/setAuthToken';
import AuthState from './context/auth/AuthState';
import PrivateRoute from './components/routing/PrivateRoute';
import AlertState from './context/alert/AlertState';
import Navbar from './components/layout/Navbar';
import Alerts from './components/layout/Alerts';
import Hospitals from './components/hospitals/Hospitals';
import Doctors from './components/doctors/Doctors';
import HospitalState from './context/hospital/HospitalState';
import DoctorState from './context/doctor/DoctorState';

if (localStorage.getItem('token')) {
  setAuthToken(localStorage.getItem('token'));
};

function App () {
  return (
    <AuthState>
      <AlertState>
        <Router>
          <Fragment>
            <Navbar />
            <div className="container">
              <Alerts />
              <Switch>
                <PrivateRoute exact path="/" component={Hospitals} />
                <Route exact path="/about" component={About} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/register" component={Register} />
                <HospitalState>
                  <DoctorState>
                    <PrivateRoute exact path="/hospitals" component={Hospitals} />
                    <PrivateRoute exact path="/doctors" component={Doctors} />
                  </DoctorState>
                </HospitalState>
              </Switch>
            </div>
          </Fragment>
        </Router>
      </AlertState>
    </AuthState>
  );
}

export default App;

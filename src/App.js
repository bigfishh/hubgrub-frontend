import React from 'react';
import {Switch, Route} from 'react-router'

import {withRouter} from 'react-router-dom'

import SignUpSignInForm from './components/SignUpSignInForm'
import NavBar from './components/NavBar'
import Home from './components/Home'
import OneRestaurantContainer from './components/OneRestaurantContainer'
import ProfileContainer from './ProfileComponents/ProfileContainer'

import {connect} from 'react-redux'
import {initializeRestaurants} from './Actions/restaurantActions'
import {saveUserToState} from './Actions/userActions'



class App extends React.Component {

  componentDidMount() {

    fetch("http://localhost:3000/restaurants")
    .then(r => r.json())
    .then((restaurants) => {
      this.props.initializeRestaurants(restaurants);
    })

    if (localStorage.getItem("token")) {
      let token = localStorage.getItem('token')
      fetch("http://localhost:3000/persist", {
        headers: {
          "Authorization": `bearer ${token}`
        }
      })
      .then(r => r.json())
      .then(resp => {
        if (resp.token) {
          this.props.saveUserToState(resp);
        }
      })
    }
  }

  handleSignInSubmit = (userInfo) => {

    fetch("http://localhost:3000/login", {
      method: "POST",
      body: JSON.stringify(userInfo),
      headers: {
        "content-type": "application/json"
      }
    })
      .then(r => r.json())
      .then((resp) => {
        if (resp.token) {
          this.props.saveUserToState(resp);
          localStorage.setItem("token", resp.token)
          this.props.history.push("/home")
        }
      })

  }

  handleSignUpSubmit = (userInfo) => {
    fetch('http://localhost:3000/users', {
      method: "POST",
      headers:{
        "Content-Type": "application/json",
        "Accept": "application/json"
    },
      body: JSON.stringify(userInfo)
    })
      .then(r=> r.json())
      .then((userInfo) => {
        this.props.saveUserToState(userInfo)
        localStorage.setItem('token', userInfo.token)
        this.props.history.push("/profile")
      })
  }

  renderForm = (routerProps) => {
    if(routerProps.location.pathname === "/signin"){
      return <SignUpSignInForm formName="Sign in Form" handleSubmit={this.handleSignInSubmit}/>
    } else if (routerProps.location.pathname === "/signup") {
      return <SignUpSignInForm formName="Sign up Form" handleSubmit={this.handleSignUpSubmit}/>
    }
  }


  render(){
    return (
      <div>
        <NavBar/>
        <Switch>
          <Route path="/signin" render={ this.renderForm } />
          <Route path="/signup" render={ this.renderForm } />
          <Route path="/restaurants/:id" component={OneRestaurantContainer}/>
          <Route path="/profile" exact component={ProfileContainer} />
          <Route path="/home" exact component={Home} />
          <Route render={ () => <p>Page not Found</p> } />
        </Switch>
      </div>
    );
  }

}


export default connect(null, {initializeRestaurants, saveUserToState})(withRouter(App));
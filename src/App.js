import React from 'react';
import {Switch, Route} from 'react-router'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {initializeRestaurants, fetchAllCategories} from './Actions/restaurantActions'
import {saveUserToState} from './Actions/userActions'
import NavBar from './components/NavBar'
import MainContainer from './components/MainContainer';
import SignUpSignInForm from './components/SignUpSignInForm'


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

    fetch('http://localhost:3000/categories')
    .then(resp => resp.json())
    .then(resp => {
      if (resp) {
        this.props.fetchAllCategories(resp);
      }
    })


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

  renderMainContainer = (routerProps) => {
    let restaurantObjId = routerProps.match.params.id
    console.log(routerProps)
    if(localStorage.token){
      if(routerProps.location.pathname === "/home"){
        return <MainContainer containerType="Home Container"/>
      } else if (routerProps.location.pathname === "/profile") {
        return <MainContainer containerType="Profile Container"/>
      } else if (routerProps.location.pathname.startsWith('/restaurants')) {
        return <MainContainer containerType="Restaurant Container" restaurantObjId={restaurantObjId}/>
      } else if (routerProps.location.pathname === "/checkout") {
        return <MainContainer containerType="Checkout Container"/>
      }
    }else{
      this.props.history.push("/signin")
    }
  }


  render(){
    console.log(this.props.token)
    return (
      <div className="App">
        {
          window.location.pathname === "/signup" || window.location.pathname === "/signin" ? null : <NavBar/>
        }
        <Switch>
          <Route path="/signin" render={ this.renderForm } />
          <Route path="/signup" render={ this.renderForm } />
          <Route path="/restaurants/:id" render={ this.renderMainContainer }/>
          <Route path="/profile" render={ this.renderMainContainer } />
          <Route path="/home" render={ this.renderMainContainer } />
          <Route path="/checkout" render={ this.renderMainContainer } />
          <Route render={ () => <p>Page not Found</p> } />
        </Switch>
      </div>
    );
  }

}

const mapStateToProps = (state) => {
  return {
      userInfo: state.userInfo.user,
      token: state.userInfo.token
  }
}


export default connect(mapStateToProps, {initializeRestaurants, saveUserToState, fetchAllCategories})(withRouter(App));
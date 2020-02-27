import React, { Component } from 'react';
import {NavLink, withRouter} from 'react-router-dom';
import { Button } from 'semantic-ui-react'
import {connect} from 'react-redux'
import {logoutUser} from '../Actions/userActions'



class NavBar extends Component {

    handleLogOut = () => {
        this.props.logoutUser()
        this.props.history.push('/signin')
    }

    renderButtons = () => {
        let {pathname} = this.props.location
        if (pathname === '/home'){
            return (<div>
                <Button className="ui button">
                    <NavLink to="/profile">Profile</NavLink>
                </Button>
                <Button className="ui button">
                    <p onClick={this.handleLogOut}>Log out</p>
                </Button>
            </div> )
        } else if (pathname === '/profile'){
            return (<div>
                <Button className="ui button active">
                    <NavLink to="/home">Home</NavLink>
                </Button>
                <Button className="ui button">
                    <p onClick={this.handleLogOut}>Log out</p>
                </Button>
            </div> )
        }
    }

    render() {
        // console.log(this.props)
        let {user} = this.props
        return (
                <Button.Group>
                    {user.username ?
                        this.renderButtons(): 
                        <div>
                            <Button className="ui button">
                                <NavLink to="/signin">Sign in</NavLink>
                            </Button>
                            <Button className="ui button">
                                <NavLink to="/signup">Sign up</NavLink>
                            </Button>
                        </div>}
                </Button.Group>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        user: state.userInfo.user
    }
}

export default connect(mapStateToProps, {logoutUser})(withRouter(NavBar));
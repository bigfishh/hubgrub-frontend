import React, { Component } from 'react';
import hubgrub from './hubgrub.jpeg'
import {Link, withRouter} from 'react-router-dom';
import {connect} from 'react-redux'
import SearchBar from './SearchBar';
import {logoutUser} from '../Actions/userActions'
import { Image, Menu, Dropdown, Icon } from 'semantic-ui-react'



class NavBar extends Component {

    handleLogOut = () => {
        this.props.logoutUser()
        localStorage.clear()
        this.props.history.push('/signin')
    }

    renderDropDown = () => {
        let {username} = this.props.user
        const trigger = (<span><Icon name='user' /> Hello, {username}</span>)
        return(
            <Dropdown trigger={trigger}>
                <Dropdown.Menu>
                    <Dropdown.Item disabled text={`Signed in as ${username}`} />
                    <Dropdown.Item text='Profile' as={Link} to="/profile" />
                    <Dropdown.Item text='Home'  as={Link} to="/home" />
                    <Dropdown.Item text='Log out' onClick={this.handleLogOut}/>
                </Dropdown.Menu>
            </Dropdown>
                )
    }

    render() {
        return (
            <Menu style={{width: "100%"}}>
                <Menu.Item position={"left"}>
                    <Image as={Link} to="/home" className="grubLogo" size='tiny' rounded src={`${hubgrub}`}/>
                </Menu.Item>
                <div className="navSearch">
                    {window.location.pathname === "/home" ? <SearchBar searchFor="Restaurant"/>: window.location.pathname.startsWith("/restaurants") ? <SearchBar searchFor="Restaurant"/>: null}
                </div>
                <Menu.Item position={"right"}>
                    {this.renderDropDown()}
                </Menu.Item>
            </Menu>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        user: state.userInfo.user
    }
}

export default connect(mapStateToProps, {logoutUser})(withRouter(NavBar));
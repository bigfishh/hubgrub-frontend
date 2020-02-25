import React, { Component } from 'react';
import {connect} from 'react-redux'
import {logoutUser} from '../Actions/userActions'
import { Button, Header, Image } from 'semantic-ui-react'



class ProfileContainer extends Component {

    handleDelete = () => {
        let {id} = this.props.user
        fetch(`http://localhost:3000/users/${id}`, {
            method: 'DELETE'
        })
        .then(resp => resp.json())
        .then(message => {
            if(message.yay){
                this.props.logoutUser()
                this.props.history.push('/signup')
            }
        })
    }

    render() {
        let {user} = this.props

        return (
        <div>
            <Header as='h2'>
                <Image circular src={user.img_url} /> {user.username}
            </Header>
            <Button onClick={this.handleDelete}>Delete Account</Button>
        </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        user: state.userInfo.user
    }
}
export default connect(mapStateToProps, {logoutUser})(ProfileContainer);

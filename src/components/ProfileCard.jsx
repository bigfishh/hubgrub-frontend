import React from 'react'; 
import {connect} from 'react-redux'
import {logoutUser} from '../Actions/userActions'
import { Button, Header, Image } from 'semantic-ui-react'


class ProfileCard extends React.Component {

    handleDelete = () => {
        let {id} = this.props.userInfo
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

    render(){
        let {userInfo} = this.props
        return(
            <div>
            <Header as='h2'>
                <Image circular src={userInfo.img_url} /> {userInfo.username}
            </Header>
            <Button onClick={this.handleDelete}>Delete Account</Button>
        </div>
        )
    }
}
export default connect(null, {logoutUser})(ProfileCard);
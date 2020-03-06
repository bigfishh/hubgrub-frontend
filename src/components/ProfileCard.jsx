import React from 'react'; 
import {connect} from 'react-redux'
import {logoutUser} from '../Actions/userActions'
import { Card, Image, Dropdown} from 'semantic-ui-react'


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
                localStorage.clear()
                this.props.history.push('/signup')
            }
        })
    }

    renderPastOrders = () => {
        let {past_orders} = this.props.userInfo
        if (past_orders){
            return past_orders.map((order) => {
                let restName = order.restaurant_name
                let date_ordered = order.created_at
                let total = order.total
                let itemOrdered = []
                order.food_ordered.map((food) => {
                    return itemOrdered.push(food.item_name)
                })
                let eachItem = itemOrdered.map((item) => <li>{`${item}`}</li>)
                return (
                    <Card color="green">
                        <Card.Content >
                            <Card.Header>{restName}</Card.Header>
                            <Card.Meta>
                                {date_ordered}
                                <br/>
                                Items ordered: {itemOrdered.length}
                            </Card.Meta>
                            <Card.Description style={{"overflow-y": "scroll", "height": "14vh"}}>
                            {eachItem}
                            </Card.Description>
                            <p><strong>Total:</strong> ${total}</p>
                            
                        </Card.Content>
                    </Card>
                )
                
            })
        }
    }

    renderDropDown = () => {
        let {username} = this.props.userInfo
        const trigger = (<span>{username? <strong>{username.toUpperCase()}</strong>:null}</span>)
        return(
            <Dropdown verticalAlign='middle' trigger={trigger}>
                <Dropdown.Menu>
                    <Dropdown.Item disabled text={`Signed in as ${username}`} />
                    <Dropdown.Item text='Delete Account' onClick={this.handleDelete} />
                </Dropdown.Menu>
            </Dropdown>
                )
    }

    render(){
        let {userInfo} = this.props
        // console.log(this.props.userInfo.past_orders)
        return(
            <div className="profileParentGrid">
                <div className="userInfo">
                    <div className="userProfile">
                    <Image size="large" verticalAlign='middle' src={userInfo.img_url}/> 
                    {this.renderDropDown()}
                    </div>
                </div>
                <div className="orderHistory" style={{"padding": "3%", "overflow-x": "hidden", "overflow-y": "scroll", "height": "75vh"}}>
                    <h1>Order History:</h1>
                    <Card.Group>
                        {this.renderPastOrders()}
                    </Card.Group>
                </div>
            </div>
        )
    }
}
export default connect(null, {logoutUser})(ProfileCard);
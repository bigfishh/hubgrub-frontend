import React from 'react'; 
import {connect} from 'react-redux';
import {addItemToCart, removeItemFromCart} from '../Actions/userActions';
import { Label, Table, Card, Item } from 'semantic-ui-react'


class MenuItemCard extends React.Component {

    handleAddToCart = () => {
        let {item:{id, price, quantity}, cart} = this.props
        let increaseQuant = quantity + 1
        console.log(cart.id)
        fetch(`http://localhost:3000/orderitems`, {
            method: 'POST',
            headers : {
                'Content-Type': 'application/json',
                'Accept': 'application/json', 
                'Authorization': `bearer ${localStorage.token}` 
            },
            body: JSON.stringify({
                    order_id: cart.id,
                    restitem_id: id, 
                    price: price,
                    quantity: increaseQuant
            })
        })
        .then(resp => resp.json())
        .then(updatedCart => {
            this.props.addItemToCart(updatedCart.food_ordered)
        })
    }

    handleDecrease = () => {
        let id = this.props.item.orderitem_id
        fetch(`http://localhost:3000/orderitems/${id}`, {
            method: 'DELETE',
            headers : {
                'Content-Type': 'application/json',
                'Accept': 'application/json', 
                'Authorization': `bearer ${localStorage.token}` 
            }
        })
        .then(resp => resp.json())
        .then(updatedCart => {
            this.props.removeItemFromCart(updatedCart.food_ordered)
        })
    }

    renderItem = () => {
        // console.log(this.props.item)
        let {item_name, price} = this.props.item
        if(this.props.cardType === "Menu Item"){
            return (
                    <Item onClick={this.handleAddToCart}>
                        <Item.Content verticalAlign='middle'>{item_name} -- {`$${price}`}</Item.Content>
                    </Item>       
            )
        } else if (this.props.cardType === "Cart Item") {
            return (
                <div>
                    <button onClick={this.handleDecrease}>-</button>
                    <span> </span>{item_name} <span>    </span>  ${price}
                </div>
            )
        }
    }

    render(){
        return(
            <div>
                {this.renderItem()}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        cart: state.userInfo.user.cart
    }
}

export default connect(mapStateToProps, {addItemToCart, removeItemFromCart})(MenuItemCard);
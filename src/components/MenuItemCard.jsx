import React from 'react'; 
import {connect} from 'react-redux';
import {addItemToCart, removeItemFromCart} from '../Actions/userActions';

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
                // let data = {
                    order_id: cart.id,
                    restitem_id: id, 
                    price: price,
                    quantity: increaseQuant
            // }
            })
        })
        .then(resp => resp.json())
        .then(updatedCart => {
            // console.log(updatedCart)
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

    handleIncrease = () => {
        console.log("i'm growing")
        this.handleAddToCart()
    }

    renderItem = () => {
        console.log(this.props.item)
        let {item_name, price, quantity} = this.props.item
        if(this.props.cardType === "Menu Item"){
            return (
                <div onClick={this.handleAddToCart}>
                    {item_name}
                    {price}
                    {quantity}
                </div>
            )
        } else if (this.props.cardType === "Cart Item") {
            return (
                <div>
                    {item_name}
                    <button onClick={this.handleIncrease}>+</button>
                    <button onClick={this.handleDecrease}>-</button>
                    {price}
                    {quantity}

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
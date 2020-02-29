import React from 'react'; 
import {connect} from 'react-redux'
import MenuItemCard from './MenuItemCard';
import {checkoutCart} from '../Actions/userActions'

class CheckoutCard extends React.Component {

    findCartTotal = () => {
        let {food_ordered} = this.props.cart
        let total = 0 
        if(food_ordered){
            food_ordered.map((food) => {
                return total += food.price
            })
        }
        return total
    }

    handleCheckout = () => {
        let {id} = this.props.cart
        let total = this.findCartTotal()
        fetch(`http://localhost:3000/orders/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type' : 'application/json',
                'Accept': 'application/json',
                'Authorization': `bearer ${localStorage.token}`
            },
            body: JSON.stringify({
                total: total
            })
        })
        .then( resp => resp.json())
        .then(updatedUser => {
            this.props.checkoutCart(updatedUser)
        })
    }

    renderCartItem = () => {
        let {food_ordered} = this.props.cart
            if (food_ordered) {
                return food_ordered.map((food) => {
                    return (<MenuItemCard cardType="Cart Item" key={food.id} item={food}/>)
                })
            }
    }

    render(){
        console.log(this.props.cart)
        return(
            <div className={"hello cart"}>
                {this.renderCartItem()}
                <p>Total: {this.findCartTotal()}</p>
                <button onClick={this.handleCheckout}>Checkout</button>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        cart: state.userInfo.user.cart
    }
}

export default connect(mapStateToProps, {checkoutCart})(CheckoutCard);
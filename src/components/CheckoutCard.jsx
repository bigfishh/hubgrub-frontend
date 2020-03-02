import React from 'react'; 
import {connect} from 'react-redux'
import {NavLink, withRouter} from 'react-router-dom';
import StripeCheckout from 'react-stripe-checkout'
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

    onToken = (token) => {
        let {id} = this.props.cart
        let total = this.findCartTotal()

        const charge = {
            token: token.id
        };
        
        const config = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 
                charge: charge, 
                price: total * 100
            })
        };
        fetch('http://localhost:3000/charges', config)
        .then(res => res.json())
        .then(console.log)

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

    renderButton = () => {

    }

    render(){
        console.log(this.props)
        let {cardType} = this.props
        return(
            <div className={"hello cart"}>
                {this.renderCartItem()}
                <p>Total: ${this.findCartTotal()}</p>
                {cardType === "Checkout"? <StripeCheckout token={this.onToken} stripeKey={process.env.REACT_APP_STRIPE_API_KEY}/>:<button><NavLink to="/checkout">Checkout</NavLink></button>}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        cart: state.userInfo.user.cart
    }
}

export default connect(mapStateToProps, {checkoutCart})(withRouter(CheckoutCard));
// {cardType === "Checkout"? <button onClick={this.handleCheckout}>Submit</button>:<button><NavLink to="/checkout">Checkout</NavLink></button>}

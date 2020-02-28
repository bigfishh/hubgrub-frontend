import React from 'react'; 
import {connect} from 'react-redux';
import {addItemToCart} from '../Actions/userActions';

class MenuItemCard extends React.Component {

    handleAddToCart = () => {
        let {item:{id, price}, cart} = this.props
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
                    price: price
            // }
            })
        })
        .then(resp => resp.json())
        .then(data => {
            console.log(data)
            this.props.addItemToCart(data.food_ordered)
        })
    }

    render(){
        let {item_name, price} = this.props.item
        console.log(this.props)
        return(
            <div onClick={this.handleAddToCart}>
                {item_name}
                {price}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        cart: state.userInfo.user.cart
    }
}

export default connect(mapStateToProps, {addItemToCart})(MenuItemCard);
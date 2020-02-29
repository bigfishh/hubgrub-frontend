import React from 'react';
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import RestaurantCard from './RestaurantCard';
import MenuItemCard from './MenuItemCard';
import CheckoutCard from './CheckoutCard'
import ProfileCard from './ProfileCard';
import { Card } from 'semantic-ui-react'


class CardContainer extends React.Component {


    renderRestaurantCards = () => {
        let {restaurants} = this.props
        return restaurants.map((restObj) => 
            <Link to={`/restaurants/${restObj.id}`}>
                <Card>
                    <RestaurantCard cardType="One Restaurant Obj" key={restObj.id} restaurant={restObj}/>
                </Card>
            </Link>)
    }

    renderMenuItems = () => {
        let targetRestaurant = this.props.restaurant
        let {restaurants} = this.props
        let foundRestaurant = restaurants.find((restObj) => restObj.id === parseInt(targetRestaurant))        
        if(foundRestaurant){
            return foundRestaurant.restitems.map((item) => {
                return <MenuItemCard cardType="Menu Item" key={item.id} item={item}/>
            })
        }
    }

    renderContainer = () => {
        if (this.props.containerType === "All Restaurant Container"){
            return(
                this.renderRestaurantCards()
            )
        } else if (this.props.containerType === "Profile"){
            return <ProfileCard userInfo={this.props.userInfo} cardType="Profile"/>
        } 
        else if (this.props.containerType === "Menu"){
            return (
                <div>
                    <CheckoutCard cart={this.props.userInfo.cart}/>
                    {this.renderMenuItems()}
                </div>
            )
        }
    }


    render(){
        return (
            <div>
                {this.renderContainer()}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        restaurants: state.restaurants.all,
        userInfo: state.userInfo.user
    }
}

export default connect(mapStateToProps)(CardContainer);
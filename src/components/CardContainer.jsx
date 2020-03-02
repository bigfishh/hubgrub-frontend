import React from 'react';
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import RestaurantCard from './RestaurantCard';
import MenuItemCard from './MenuItemCard';
import CheckoutCard from './CheckoutCard'
import ProfileCard from './ProfileCard';
import { Card, Grid } from 'semantic-ui-react'


class CardContainer extends React.Component {


    renderRestaurantCards = () => {
        let {restaurants, searchTerm} = this.props
        return restaurants.map((restObj) => {
            let restMenuItems = restObj.restitems.map((item) => item.item_name)
            let itemIncludingSearch = restMenuItems.some((string) => {
                return string.toLowerCase().includes(searchTerm.toLowerCase())
            })
            if(restObj.name.toLowerCase().includes(searchTerm.toLowerCase()) || itemIncludingSearch){
                return (
                    <Link to={`/restaurants/${restObj.id}`}>
                        <Card>
                            <RestaurantCard cardType="One Restaurant Obj" key={restObj.id} restaurant={restObj}/>
                        </Card>
                    </Link>
                )
            } else {
                return null
            }
        })
    }

    renderMenuItems = () => {
        let targetRestaurant = this.props.restaurant
        let {restaurants, searchTerm} = this.props
        let foundRestaurant = restaurants.find((restObj) => restObj.id === parseInt(targetRestaurant))        
        if(foundRestaurant){
            return foundRestaurant.restitems.map((item) => {
                if(item.item_name.toLowerCase().includes(searchTerm.toLowerCase())){
                    return <MenuItemCard cardType="Menu Item" key={item.id} item={item}/>

                }
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
        } else if (this.props.containerType === "Menu"){
            return (
                <div>
                    {/* <CheckoutCard cardType="Cart" cart={this.props.userInfo.cart}/> */}
                    {/* {this.renderMenuItems()} */}

                    <Grid centered columns={3}>
                    {/* <Grid.Row centered columns={3}> */}
                        <Grid.Column>
                            {this.renderMenuItems()}
                        </Grid.Column>
                        <Grid.Column>
                            <CheckoutCard cardType="Cart" cart={this.props.userInfo.cart}/>
                        </Grid.Column>
                    {/* </Grid.Row> */}
                </Grid>
                </div>
            )
        } else if (this.props.containerType === "Checkout"){
            return  <CheckoutCard cardType="Checkout" cart={this.props.userInfo.cart}/>
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
        searchTerm: state.restaurants.searchTerm,
        userInfo: state.userInfo.user
    }
}

export default connect(mapStateToProps)(CardContainer);
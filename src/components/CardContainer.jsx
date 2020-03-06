import React from 'react';
import {connect} from 'react-redux'
import {Link, withRouter} from 'react-router-dom';
import RestaurantCard from './RestaurantCard';
import MenuItemCard from './MenuItemCard';
import CheckoutCard from './CheckoutCard'
import ProfileCard from './ProfileCard';
import { Card, Item, Grid} from 'semantic-ui-react'


class CardContainer extends React.Component {

    renderRestaurantCards = () => {
        let {restaurants, searchTerm} = this.props
        let filteredArr = restaurants
        if (this.props.category !== "All"){
            filteredArr = restaurants.filter((restObj) => {
                return restObj.category === this.props.category
            })
        }
        return filteredArr.map((restObj) => {
            let restMenuItems = restObj.restitems.map((item) => item.item_name)
            let itemIncludingSearch = restMenuItems.some((string) => {
                return string.toLowerCase().includes(searchTerm.toLowerCase())
            })

            if(restObj.name.toLowerCase().includes(searchTerm.toLowerCase()) || itemIncludingSearch ){
                return (
                    <RestaurantCard cardType="One Restaurant Obj" key={restObj.id} restaurant={restObj}/>
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

    handleButtonClick = (evt) => {
        this.props.changeCategory(evt.target.value)
    }

    renderCategoryButton = () => {
        let {categories} = this.props
        return categories.map((category) => {
            return <button value={`${category.name}`} onClick={this.handleButtonClick}>{category.name}</button>
        })
    }

    renderStatement = () => {
        if (this.props.userInfo.cart.restaurant_id){
            if(window.location.pathname === `/restaurants/${this.props.userInfo.cart.restaurant_id}`){
                return null
            } else {
                return <h3>You have a open cart with <Link to={`/restaurants/${this.props.userInfo.cart.restaurant_id}`}>{this.props.userInfo.cart.restaurant_name}</Link></h3>
            }
        }
    }

    renderContainer = () => {
        console.log(window.location.pathname)
        if (this.props.containerType === "All Restaurant Container"){
            return(
                <div className="restaurantsCard over_map">
                    <h1>Categories</h1>
                    <button value="All" onClick={this.handleButtonClick}>All</button>
                    {this.renderCategoryButton()}
                    <h1>Restaurants</h1>
                    <Card.Group className="restaurants" style={{"margin-top": "1%", "margin-right": "1%"}}itemsPerRow={3}>
                    {this.renderRestaurantCards()}
                    </Card.Group>
                </div>
            )
        } else if (this.props.containerType === "Profile"){
            return <ProfileCard userInfo={this.props.userInfo} cardType="Profile"/>
        } else if (this.props.containerType === "Menu"){
            console.log(`/restaurants/${this.props.userInfo.cart.restaurant_id}`)
        return (
                <div className="MenuPage">
                    <div className="MenuPageDiv">
                        <Grid style={{"padding-top": "3%"}} columns={3} divided>
                        <Grid.Column style={{width: "1%"}}>
                        </Grid.Column> 
                        <Grid.Column className="styleMenu cartMenu" style={{"background-color": "white"}}>
                        <h1 style={{"padding-top": "1%"}}>Menu Items</h1>
                        <Item.Group divided>
                            {this.renderMenuItems()}
                        </Item.Group>
                        </Grid.Column>
                        <Grid.Column className="styleMenu">
                            <h1 style={{"padding-top": "1%"}}>Your Cart</h1>
                            {this.renderStatement()}
                            <CheckoutCard cardType="Cart" cart={this.props.userInfo.cart}/>
                        </Grid.Column>
                        {/* <Grid.Column style={{width: "1%"}}>
                        </Grid.Column>  */}
                        </Grid>
                    </div>
                </div>
            )
        } else if (this.props.containerType === "Checkout"){
            return  <CheckoutCard cardType="Checkout" cart={this.props.userInfo.cart}/>
        }
    }


    render(){
        console.log(window.location.pathname)
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
        categories: state.restaurants.categories,
        userInfo: state.userInfo.user
    }
}

export default connect(mapStateToProps)(withRouter(CardContainer));
{/* <h3>You have a open cart with <Link to={`/restaurants/${this.props.userInfo.cart.restaurant_id}`}>{this.props.userInfo.cart.restaurant_name}</Link></h3> */}
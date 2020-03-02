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
                    <Link to={`/restaurants/${restObj.id}`}>
                        <Card key={`Card-${restObj.id}`}>
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

    handleButtonClick = (evt) => {
        this.props.changeCategory(evt.target.value)
    }

    renderCategoryButton = () => {
        let {categories} = this.props
    
        return categories.map((category) => {
            return <button value={`${category.name}`} onClick={this.handleButtonClick}>{category.name}</button>
        })
    }

    renderContainer = () => {
        if (this.props.containerType === "All Restaurant Container"){
            return(
                <div>
                    <button value="All" onClick={this.handleButtonClick}>All</button>
                    {this.renderCategoryButton()}
                    {this.renderRestaurantCards()}
                </div>
            )
        } else if (this.props.containerType === "Profile"){
            return <ProfileCard userInfo={this.props.userInfo} cardType="Profile"/>
        } else if (this.props.containerType === "Menu"){
            return (
                <div>
                    <Grid centered columns={3}>
                        <Grid.Column>
                            {this.renderMenuItems()}
                        </Grid.Column>
                        <Grid.Column>
                            <CheckoutCard cardType="Cart" cart={this.props.userInfo.cart}/>
                        </Grid.Column>
                    </Grid>
                </div>
            )
        } else if (this.props.containerType === "Checkout"){
            return  <CheckoutCard cardType="Checkout" cart={this.props.userInfo.cart}/>
        }
    }


    render(){
        console.log(this.state)
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

export default connect(mapStateToProps)(CardContainer);
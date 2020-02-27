import React from 'react';
import MenuCard from './MenuCard'
import {NavLink, withRouter} from 'react-router-dom';
import { Button, Image } from 'semantic-ui-react'


class OneRestaurantContainer extends React.Component {

    state = {
        restaurant: {},
        restItems: []
    }

    componentDidMount(){
        let restId = this.props.match.params.id
        fetch(`http://localhost:3000/restaurants/${restId}`)
        .then(resp => resp.json())
        .then(restObj => {
            let restItems = restObj.restitems
            this.setState({
                restaurant: restObj,
                restItems: restItems
            })
        })
    }

    renderMenuItems = () => {
        let {restItems} = this.state
        return restItems.map((menuObj) => {
            return <MenuCard key={menuObj.id} menuObj={menuObj}/>
        })
    }

    renderNavButtons = () => {
        return (
            <div>
                <Button className="ui button">
                    <NavLink to="/home">Back</NavLink>
                </Button>
                <Button className="ui button">
                    <NavLink to="/profile">Profile</NavLink>
                </Button>
                <Button className="ui button" onClick={this.handleLogOut}>
                    Log out
                </Button>
            </div>)
    }

    render(){
        let {restaurant} = this.state
        return (
        <div className="OneRestaurantContainer">
            {this.renderNavButtons()}
                <Image className="ui med image" src={restaurant.media_image} alt={restaurant.name} wrapped ui={false} />
                <h1>{restaurant.name}</h1>
            {this.renderMenuItems()}
        </div>
        )
    }
}

export default withRouter(OneRestaurantContainer);
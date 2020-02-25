import React from 'react';
import { Card, Image } from 'semantic-ui-react'


class RestaurantCard extends React.Component {

    render(){
        let {restaurant} = this.props
        return (
        <div>
            <Image className="ui fluid image" src={restaurant.media_image} wrapped ui={false} />
            <Card.Content>
            <Card.Header>{restaurant.name}</Card.Header>
            </Card.Content>
        </div>
        )
    }
}

export default RestaurantCard;
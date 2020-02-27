import React from 'react';
import { Card, Image } from 'semantic-ui-react'


class RestaurantCard extends React.Component {

    render(){
        let {media_image, name} = this.props.restaurant
        return (
            <div>
                <Image className="ui fluid image" src={media_image} wrapped ui={false} />
                <Card.Content>
                    <Card.Header>{name}</Card.Header>
                </Card.Content>
            </div>
        )
    }
}

export default RestaurantCard;
import React from 'react';
import { Card } from 'semantic-ui-react'
import {Link} from 'react-router-dom'

class RestaurantCard extends React.Component {

    render(){
        let {media_image, name, id} = this.props.restaurant
        return (
            <Card as={Link} to={`/restaurants/${id}`} image={media_image} header={name}/>
        )
    }
}

export default RestaurantCard;
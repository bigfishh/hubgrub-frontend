import React from 'react';
import RestaurantCard from './RestaurantCard'
// import MenuContainer from './MenuContainer'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import { Card } from 'semantic-ui-react'


class RestaurantContainer extends React.Component {



    renderAllCard = () => {
        let {restaurants} = this.props
        return restaurants.map((restObj) => <Link to={`/restaurants/${restObj.id}`}><Card><RestaurantCard key={restObj.id} restaurant={restObj}/></Card></Link>)
    }

    render(){
        return (
            <div>
                    {this.renderAllCard()}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        restaurants: state.restaurants.all
    }
}

export default connect(mapStateToProps)(RestaurantContainer);
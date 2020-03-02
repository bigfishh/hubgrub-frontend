import React from 'react';
import {connect} from 'react-redux'
import { Map, GoogleApiWrapper, Marker} from 'google-maps-react';
import {Container} from 'semantic-ui-react'

const mapStyles = {
    width: '100%',
    height: '100%'
    // "min-height": '100%',
};

class MapContainer extends React.Component {

    displayMarkers = () => {
        let {restaurants} = this.props
        let filteredArr = restaurants
        if (this.props.category !== "All"){
            filteredArr = restaurants.filter((restObj) => {
                return restObj.category === this.props.category
            })
        }
        return filteredArr.map((restaurant) => {
        return <Marker key={restaurant.id} id={restaurant.id} position={{
            lat: restaurant.latitude,
            lng: restaurant.longitude
        }}
        onClick={() => console.log(`${restaurant.name}`)} />
        })
    }

    render(){
        return (
            <Container style={{height: "800px"}}>

                <Map
                    google={this.props.google}
                    zoom={15}
                    style={mapStyles}
                    initialCenter={{ lat: 40.7007, lng: -73.9875}}>
                    {this.displayMarkers()}
                </Map>
            </Container >
        )
    }
}

const mapStateToProps = (state) => {
    return {
        restaurants: state.restaurants.all
    }
}

export default connect(mapStateToProps)(GoogleApiWrapper({
    apiKey: process.env.REACT_APP_GOOGLE_API_KEY
})(MapContainer));
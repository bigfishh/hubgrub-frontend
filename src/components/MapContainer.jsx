import React from 'react';
import {connect} from 'react-redux'
import { Map, GoogleApiWrapper, Marker} from 'google-maps-react';

const mapStyles = {
    width: '97%',
    height: '100%',
};

class MapContainer extends React.Component {

    displayMarkers = () => {
        // console.log(this.state.restaurants)
        let {restaurants} = this.props
        return restaurants.map((restaurant) => {
        return <Marker key={restaurant.id} id={restaurant.id} position={{
            lat: restaurant.latitude,
            lng: restaurant.longitude
        }}
        onClick={() => console.log(`${restaurant.name}`)} />
        })
    }

    render(){
        return (
            <Map
                google={this.props.google}
                zoom={15}
                style={mapStyles}
                initialCenter={{ lat: 40.7007, lng: -73.9875}}>
                {this.displayMarkers()}
            </Map>
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
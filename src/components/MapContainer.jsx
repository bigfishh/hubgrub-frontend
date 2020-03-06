import React from 'react';
import {connect} from 'react-redux'
import { Map, GoogleApiWrapper, Marker} from 'google-maps-react';
// import {Container} from 'semantic-ui-react'

const mapStyles = {
    position: 'absolute',
    "margin-top": '1%',
    "margin-left": '1%',
    width: '97%',
    height: "85vh",
    border: 'solid 2px gray',
    "border-radius": "20px"
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
            // <Container style={{"max-height": "800px"}}>
            <div className="wrapper">
                <Map 
                    className="map"
                    google={this.props.google}
                    zoom={13}
                    style={mapStyles}
                    initialCenter={{ lat: 40.7229, lng: -73.99992}}>
                    {this.displayMarkers()}
                </Map>
            </div>
            // </Container >
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
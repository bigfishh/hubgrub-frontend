import React from 'react';
import MapContainer from './MapContainer';
import CardContainer from './CardContainer';
// import { Card, Grid } from 'semantic-ui-react'


class MainContainer extends React.Component {

    renderContainer = () => {
        if (this.props.containerType === "Home Container"){
            return(
                <div>
                <CardContainer containerType="All Restaurant Container"/>
                <MapContainer/>
                </div>
            )
        } else if (this.props.containerType === "Profile Container"){
            return <CardContainer containerType="Profile"/>
        } else if (this.props.containerType === "Restaurant Container"){
            return (<div>
                <CardContainer containerType="Menu" restaurant={this.props.restaurantObjId}/>
                <CardContainer containerType="Checkout"/>
                </div>)
        }
    }

    render(){
        return (
            <div>
                {this.renderContainer()}
            </div>
        )
    }
}

export default MainContainer;

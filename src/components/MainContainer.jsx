import React from 'react';
import MapContainer from './MapContainer';
import CardContainer from './CardContainer';
import Search from './Search';
import { Grid } from 'semantic-ui-react';


class MainContainer extends React.Component {

    renderContainer = () => {
        if (this.props.containerType === "Home Container"){
            return(
                <div>
                    <Search searchFor="Restaurant"/>
                    <Grid centered columns={2}>
                            <Grid.Column>
                                <MapContainer/>
                            </Grid.Column>
                            <Grid.Column>
                                <CardContainer containerType="All Restaurant Container"/>      
                            </Grid.Column>
                    </Grid>
                </div>
            )
        } else if (this.props.containerType === "Profile Container"){
            return <CardContainer containerType="Profile"/>
        } else if (this.props.containerType === "Restaurant Container"){
            return (
                <div>
                    <Search value={"ewfwe"} searchFor="Menu Items"/>
                    <CardContainer containerType="Menu" restaurant={this.props.restaurantObjId}/>
                </div>)
        } else if (this.props.containerType === "Checkout Container"){
            return <CardContainer containerType="Checkout"/>
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

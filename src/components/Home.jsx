import React from 'react';
import MapContainer from './MapContainer';
import RestaurantContainer from './RestaurantContainer';
import { Card, Grid } from 'semantic-ui-react'


class Home extends React.Component {

    render(){
        return (
            <Grid columns={2} divided>
                <Grid.Row>
                    <Grid.Column >
                        <MapContainer/>
                    </Grid.Column>
                    <Grid.Column>
                        <Card>
                            <RestaurantContainer/>
                        </Card>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        )
    }
}

export default Home;

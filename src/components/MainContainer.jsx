import React from 'react';
import MapContainer from './MapContainer';
import CardContainer from './CardContainer';


class MainContainer extends React.Component {

    state = {
        category: "All"
    }

    changeCategory = (category) => {
        this.setState({
            category: category
        })
    }

    renderContainer = () => {
        if (this.props.containerType === "Home Container"){
            return(
                <div className="parentgrid">
                    <MapContainer category={this.state.category}/>
                    <CardContainer category={this.state.category} changeCategory={this.changeCategory} containerType="All Restaurant Container"/>      
                </div>
            )
        } else if (this.props.containerType === "Profile Container"){
            return <CardContainer containerType="Profile"/>
        } else if (this.props.containerType === "Restaurant Container"){
            return (
                <div className="menuCheckoutParentGrid">
                    <CardContainer containerType="Menu" restaurant={this.props.restaurantObjId}/>
                </div>)
        } else if (this.props.containerType === "Checkout Container"){
            return <CardContainer containerType="Checkout"/>
        }
    }

    render(){
        return (
            <div className="MainContainer">
                {this.renderContainer()}
            </div>
        )
    }
}

export default MainContainer;

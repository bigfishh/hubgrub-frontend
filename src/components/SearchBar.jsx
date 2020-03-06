import React from 'react'
import {connect} from 'react-redux'
import {searchRestaurants, searchMenuItems} from '../Actions/restaurantActions'

const SearchBar = props => {

    const searchRestaurants = (evt) => {
        // console.log(evt.target.value)
        props.searchRestaurants(evt.target.value)
    }

    const searchMenuItems = (evt) => {
        props.searchMenuItems(evt.target.value)
    }

    const renderSearch = () => {
        if (props.searchFor === "Restaurant"){
            return(
                // <Search value={props.searchTerm} onChange={searchRestaurants}/>
                <div className="ui icon input">
                    <input className="prompt"  value={props.searchTerm} onChange={searchRestaurants} placeholder="Search by Restaurant Name"/>
                    <i className="search icon" />
                </div>
            )
        } else if (props.searchFor === "Menu Items"){
            return(
                <div className="ui icon input">
                    <input className="prompt" value={props.searchTerm} onChange={searchMenuItems} placeholder="Search by Menu Item"/>
                    <i className="search icon" />
                </div>)
        }
    }

    return (
        <div className="SearchBar">
            {renderSearch()}
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        searchTerm: state.searchTerm
    }
}

export default connect(mapStateToProps, {searchRestaurants, searchMenuItems})(SearchBar)

import React from 'react'

const Search = props => {

    const renderSearch = () => {
        if (props.searchFor === "Restaurant"){
            return(
            <div className="ui icon input">
                <input className="prompt" onChange={props.onChange} />
                <i className="search icon" />
            </div>)
        } else if (props.searchFor === "Menu Items"){
            return(
                <div className="ui icon input">
                    <input className="prompt" onChange={props.onChange} />
                    <i className="search icon" />
                </div>)
        }
    }

    return (
        <div>
            {renderSearch()}
        </div>
    )
}

export default Search
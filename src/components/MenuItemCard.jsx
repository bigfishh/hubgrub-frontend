import React from 'react'; 

class MenuItemCard extends React.Component {
    render(){
        let {item_name, price} = this.props.item
        return(
            <div>
                {item_name}
                {price}
            </div>
        )
    }
}
export default MenuItemCard;
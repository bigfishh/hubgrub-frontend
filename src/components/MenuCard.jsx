import React from 'react';

const MenuCard = ({menuObj}) => {

  return (
    <div >
        <p>{menuObj.item_name} ----- ${menuObj.price}</p>
    </div>
  )
};

export default MenuCard;
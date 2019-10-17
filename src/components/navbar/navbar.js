import React from 'react';
import './navbar.css'
import SvgIcon from '@material-ui/core/SvgIcon';
import Logo from '../../content/img/logo'
import LogoText from '../../content/img/logo.js'
const NavBar=(props)=>{

    return(
        <div className="food-navbar">
             <div className="logo-text">
            <LogoText/>
             </div>

             <div className="food-search">
                 <input type="text" placeholder="Search food items" onChange={props.search}/>
             </div>
       
             <div className="food-navbar-right-options">
             <button onClick={props.goToHome} className="home-btn">
     Go Home</button>
                   <button className="add-item-btn" onClick={props.addNewItem} >+ Add Item</button>
             </div>
        </div>
    )
}

export default NavBar
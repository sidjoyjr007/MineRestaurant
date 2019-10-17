import React from 'react';
import './container.css'
const noInternet=(props)=>{
        return(
            <div className="no-internet">
                <div className="no-internet-heading">{props.heading}</div>
                <div className="no-internet-title">{props.title}</div>
                <button className="no-internet-retry-btn" onClick={props.retry}>Retry</button>
            </div>
        )
}


export default noInternet
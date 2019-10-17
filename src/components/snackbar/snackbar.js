import React from 'react';
import './snackbar.css'
const snackBar=(props)=>{
    let clipPath='circle(0% at 0% 0%)'
    if(props.open==='block'){
        clipPath='circle(100%)'
    }
  return(
      <div className="snackBar" style={{display:props.open,clipPath:clipPath}} >
          <div className="snack-message">
              {props.message}
          </div>
      </div>
  )
}

export default snackBar
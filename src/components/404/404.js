import React from 'react';

const notFound=(props)=>{

   let goHome=()=>{
        props.history.goBack()
    }
  return(
      <div className="not-found-page">
              <h1>Page Not Found</h1>
              <button className="go-home-btn" onClick={goHome}>Go Back To Home</button>
      </div>
  )

}

export default notFound;
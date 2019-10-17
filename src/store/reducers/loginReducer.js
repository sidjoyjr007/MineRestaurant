import * as actionTypes from '../actions/action'
  const initialState={
    auth:false
}

const loginReducer=(state=initialState,action)=>{
    switch(action.type){
  case  actionTypes.isLoggedIn:
  console.log(action.type)
              return{
                  ...state,
                  auth:true
              }
    }

    return state
}


export default loginReducer
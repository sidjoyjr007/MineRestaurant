import * as actionTypes from '../actions/action'
const initialState = {
    foodList: [],
    error: false,
    errorType: '',
    actionTaken: '',
    foodHistory: [],
    amount_collected: 0,
    total_orders: 0,

}

const firebaseReducer = (state = initialState, action) => {
    let newFoodList;
    if (action.error) {
        return {
            ...state,
            error: true,
            errorType: action.errorType
        }
    } else {
        let newState = { ...state };
        newState.error = false;
        switch (action.type) {
            case actionTypes.storeFoodList:
                newFoodList = [...action.result];
                return {
                    ...newState,
                    foodList: newFoodList,
                    actionTaken: 'foodListFetch',
                }

            case actionTypes.addItem:
                newFoodList = [...state.foodList];
                newFoodList.push(action.result);
                return {
                    ...newState,
                    foodList: newFoodList,
                    actionTaken: 'itemAdded',
                }

            case actionTypes.addBill:
                return {
                    ...newState,
                    actionTaken: 'billAdded',
                }

            case actionTypes.changePrice:
                newFoodList = [...state.foodList]
                newFoodList[action.index].price = parseInt(action.price);
                return {
                    ...newState,
                    foodList: newFoodList,
                    actionTaken: 'priceChanged',
                }

            case actionTypes.fetchFoodHistory:
                return {
                    ...newState,
                    foodHistory: action.foodHistoryList,
                    amount_collected: action.amount_collected,
                    total_orders: action.total_orders
                }
        }
    }


    return state;
}


export default firebaseReducer


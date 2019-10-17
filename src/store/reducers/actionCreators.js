import * as actionTypes from '../actions/action'
import firebase from '../../firebase'
import image from '../../content/img/no-image.jpg'

export const getFoodList = () => {
    let foodList = [];
    return dispatch => {
        let db = firebase.firestore()

        db.collection("FoodList")
            .get()
            .then(querySnapshot => {
                querySnapshot.docs.map(doc => {
                    let food_img = doc.data().food_img
                    if (doc.data().food_img === '' || doc.data().food_img === undefined) {
                        food_img = image
                    }
                    foodList.push({
                        name: doc.data().food_name,
                        id: doc.id,
                        type: doc.data().food_type,
                        price: doc.data().food_price,
                        img: food_img,
                        available: true

                    })
                });
                dispatch(storeResult(foodList, false, ''))

            }).catch(err => {
                dispatch(storeResult([], true, 'foodListFetchError'))
            });

    }
}

export const storeResult = (res, error, errorType) => {
    return {
        type: actionTypes.storeFoodList,
        result: res,
        error: error,
        errorType: errorType
    }
}

export const addItem = (form) => {
    return dispatch => {
        firebase.firestore().collection('FoodList').
            add({
                food_name: form.food_name,
                food_price: parseInt(form.food_price),
                food_img: form.food_img,
                food_type: form.food_type
            }).then(res => {
                let data = {
                    name: form.food_name,
                    id: res.id,
                    type: form.food_type,
                    price: parseInt(form.food_price),
                    img: form.food_img,
                    available: true
                }
                dispatch(storeItemResult(data, false, ''))
            }
            ).
            catch(err => dispatch(storeItemResult({}, true, 'addItemError')))
    }
}

export const storeItemResult = (res, error, errorType) => {
    return {
        type: actionTypes.addItem,
        result: res,
        error: error,
        errorType: errorType
    }
}

export const addBill = (billingList, billAmount) => {
    return dispatch => {
        firebase.firestore().collection('FoodOrder').
            add({
                order_amount: billAmount,
                order_date: parseInt((new Date()).valueOf()),
                orders: billingList
            }).then(res => {
                dispatch(addBillResult(false, ''))

            })
            .catch(err => {
                dispatch(addBillResult(true, 'addBillError'))
            })
    }

}

export const addBillResult = (error, errorType) => {
    return {
        type: actionTypes.addBill,
        error: error,
        errorType: errorType
    }
}

export const changePrice = (price, id, index) => {
    return dispatch => {
        firebase.firestore().collection('FoodList').doc(String(id)).update
            ({
                food_price: parseInt(price)
            }).then(res => {
                dispatch(callChangePrice(price, id, index, false, ''))
            })
            .catch(err => {
                dispatch(callChangePrice(0, '', '', true, 'changePriceError'))
            })
    }
}

export const callChangePrice = (price, id, index, error, errorType) => {
    return {
        type: actionTypes.changePrice,
        price: price,
        index: index,
        id: id,
        error: error,
        errorType: errorType
    }
}


export const fetchFoodHistory = date => {
    return dispatch => {
        let beiginingTime = new Date(date)
        beiginingTime.setHours(0, 0, 0, 0)
        let endingTime = new Date(date)
        endingTime.setHours(23, 59, 59, 999)
        let newFoodHistoryList = [];
        let amount_collected = 0;
        let total_orders = 0;
        let db = firebase.firestore()
        db.collection("FoodOrder").where("order_date", ">=", parseInt(beiginingTime.valueOf()))
            .where("order_date", "<=", parseInt(endingTime.valueOf()))
            .get()
            .then(querySnapshot => {
                querySnapshot.docs.map(doc => {
                    amount_collected += parseInt(doc.data().order_amount);
                    total_orders += 1
                    newFoodHistoryList.push({
                        id: doc.id,
                        data: doc.data()
                    })
                });
                dispatch(historyFetched(newFoodHistoryList, amount_collected, total_orders, false, ''))

            }).catch(err => {
                dispatch(historyFetched([], 0, 0, true, 'fetchHistoryError'))
            })
    }
}


export const historyFetched = (list, amount, orders, error, errorType) => {
    return {
        type: actionTypes.fetchFoodHistory,
        amount_collected: amount,
        total_orders: orders,
        error: error,
        errorType: errorType,
        foodHistoryList: list
    }
}


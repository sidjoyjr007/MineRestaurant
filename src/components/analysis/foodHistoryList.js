import React from 'react';

const FoodHistoryList = (props) => {
    return (
        <div className="food-history-list">
            {props.foodHistoryList.map(food => {
                return (
                    <div key={food.id} className="food-ordered-list">
                        <div className="header">
                            <div className="order-id">Order ID : {food.id}</div>
                            <div className="order-amount">Total Amount : ₹{food.data.order_amount}</div>
                        </div>

                        <div className="food-ordered-list-table">
                            <div className="table-heading">
                                <div>Item Name</div>
                                <div>Price</div>
                                <div>Quantity</div>
                            </div>

                            <div className="table-data">
                                {Object.keys(food.data.orders).map((key, index) => {
                                    return (
                                        <div key={index} className="table-data-list">
                                            <div>{food.data.orders[key].itemName}</div>
                                            <div>{food.data.orders[key].price}</div>
                                            <div>{food.data.orders[key].quantity}</div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>

    )
}

export default FoodHistoryList
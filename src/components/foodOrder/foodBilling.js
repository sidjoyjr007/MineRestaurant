import React, { Fragment } from 'react';

const FoodBilling = (props) => {
    return (
        <Fragment>
            {props.billingAmount > 0 ? <div className="food-billing">
                <div className="billing-header">
                    <h3 style={{ textAlign: 'center' }}>Bill</h3>
                </div>


                <div className="food-billing-list">
                    {props.billingList !== null ? Object.keys(props.billingList).map((key, index) => {
                        return (
                            <div key={index} className="food-billing-item">
                                <div className="food-bill-item">
                                    {props.billingList[key].itemName}
                                </div>
                                <div className="food-bill-quantity">
                                    <span onClick={() => props.deleteItem(key, props.billingList[key].price)}>-</span>
                                    <span>{props.billingList[key].quantity}</span>
                                    <span onClick={() => props.addItem(key, props.billingList[key].price)}>+</span>
                                </div>
                                <div className="food-bill-price">
                                    ₹{props.billingList[key].total}
                                </div>
                            </div>
                        )
                    })

                        : null}
                </div>
                <div className="food-bill-amount">
                    <div>SGST </div>
                    <div> 9%</div>
                </div>
                <div className="food-bill-amount">
                    <div>CGST </div>
                    <div> 9%</div>
                </div>
                <div className="food-bill-amount">
                    <div>Total Amount </div>
                    <div> ₹{props.billingAmount}</div>
                </div>
                <div className="food-btns">
                    <button onClick={props.cancelOrder} className="food-btn food-cancel-btn">Cancel</button>
                    <button className="food-btn food-print-btn" onClick={props.print}>Order</button>
                </div>
            </div> : null}
        </Fragment>
    )
}

export default FoodBilling;
import React, { Fragment } from 'react';
import './food.css'
import Tooltip from '@material-ui/core/Tooltip';
import Checkbox from '@material-ui/core/Checkbox';
import image from '../../content/img/no-image.jpg'

const FoodList = (props) => {
    let classes = ['food-item'];
    if (!props.food.available) {
        classes.push('food-disabled')
    }
    let finalClasses = classes.join(' ')
    return (
        <Fragment>

            <div className="food-item-box">
                <div className="food-item-side">
                    <Tooltip title="Change item availability" placement="left-start">
                        <Checkbox
                            checked={props.food.available}
                            value={props.food.name} onChange={() => props.handleChange(props.index)}
                        />
                    </Tooltip>
                    <Tooltip title="Change food price" placement="left-start">
                        <div className="food-item-edit-price" onClick={() => props.openPriceModal(props.food.id, props.index)}>₹</div>
                    </Tooltip>
                </div>

                <div className={finalClasses} onClick={() => props.clicked(props.food.id, props.food.name, props.food.price)} >
                    <img src={props.food.img} onError={(ev) => ev.target.src = image} />
                    <div className="food-content">

                        <div className="food-name">{props.food.name}</div>
                        <div className="food-price">₹{props.food.price}</div>
                    </div>


                </div>

            </div>
        </Fragment>

    )
}

export default FoodList;
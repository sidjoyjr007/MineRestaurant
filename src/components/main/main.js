import React, { Component } from 'react';
import './main.css'
import HistoryIcon from '../../content/img/history.js'
import FoodIcon from '../../content/img/food.js'

class Main extends Component {

    goTo = (comp) => {
        this.props.history.push(comp)
    }

    render() {
        return (
            <div className="main-page">
                <div className="list-cards">
                    <div className="list-card" onClick={() => this.goTo('Food')}>
                        <div className="list-card-image">
                            <FoodIcon />
                        </div>
                        <div className="list-card-name">Food</div>
                    </div>
                    <div className="list-card" onClick={() => this.goTo('Analysis')}>
                        <div className="list-card-image">
                            <HistoryIcon />
                        </div>
                        <div className="list-card-name">History</div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Main;
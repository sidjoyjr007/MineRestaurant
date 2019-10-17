import React, { Component } from 'react';
import order from '../../content/img/order.png'
import profit from '../../content/img/profit.png'
import './analysis.css'
import FoodHistoryList from './foodHistoryList'
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import dataNotFound from '../../content/img/data-not-found.svg'
import ErrorIcon from '../../content/img/error.png'
import { connect } from 'react-redux'
import * as actionCreators from '../../store/reducers/actionCreators'
import LogoText from '../../content/img/logo.js'


class Analysis extends Component {
    state = {
        foodHistoryList: [],
        amount_collected: 0,
        total_orders: 0,
        selectedDate: new Date(),
        isLoading: true,
        error: false
    }

    componentDidMount() {
        this.dateChanged(new Date())
    }

    componentWillReceiveProps(props) {
        if (props.error) {
            this.setState({ error: true, isLoading: false })

        } else {
            this.setState({
                isLoading: false,
                foodHistoryList: props.firebaseData.foodHistory,
                amount_collected: props.firebaseData.amount_collected,
                total_orders: props.firebaseData.total_orders
            })
        }
    }

    handleDateChange = date => {
        this.setState({ selectedDate: date,isLoading: true})
        this.dateChanged(date)
    }

    dateChanged = date => {
        let beiginingTime = new Date(date);
        if (beiginingTime > new Date()) {
            this.setState({
                foodHistoryList: [],
                amount_collected: 0,
                total_orders: 0,
                isLoading: false,
                error: false
            })
        } else {
            this.props.fetchFoodHistoryList(date)
        }
    }

    goToHome = () => {
        this.props.history.goBack()
    }


    render() {
        return (
            <div className="analysis-page">
                <div className="analysis-bar">
                    <div class="logo-text">
                        <LogoText />
                    </div>
                    <div className="analysis-bar-right-options">
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <KeyboardDatePicker
                                margin="normal"
                                id="date-picker-dialog"
                                format="MM/dd/yyyy"
                                value={this.state.selectedDate}
                                onChange={this.handleDateChange}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                            />

                        </MuiPickersUtilsProvider>

                        <button className="invoice-btn" onClick={this.goToHome}>Go Home</button>
                    </div>
                </div>

                <div className={this.state.isLoading ? 'food-loader' : 'food-loader loader-hide'}> </div>
                {this.state.foodHistoryList.length > 0 ? <div className="analysis-data">

                    <div className="analysis-box">
                        <div className="analysis-header">
                            <div className="analysis-item-box" onClick={this.getAnalysisData} style={{ background: 'linear-gradient(to right, #159957, #155799)' }}>
                                <div className="analysis-item-heading" >Orders Recieved</div>
                                <div className="analysis-content">
                                    <div className="analysis-item-image">
                                        <img src={order} />
                                    </div>
                                    <div className="analysis-item-data">{this.state.total_orders}</div>
                                </div>
                            </div>

                            <div className="analysis-item-box" style={{ background: 'linear-gradient(to right, #c33764, #1d2671)' }}>
                                <div className="analysis-item-heading">Amount Collected</div>
                                <div className="analysis-content">
                                    <div className="analysis-item-image">
                                        <img src={profit} />
                                    </div>
                                    <div className="analysis-item-data">₹{this.state.amount_collected}</div>
                                </div>
                            </div>

                        </div>
                    </div>
                    <FoodHistoryList foodHistoryList={this.state.foodHistoryList} />
                </div> : null}
                {!this.state.isLoading && this.state.foodHistoryList.length === 0 && !this.state.errot ? <div className="no-data-img"><img src={dataNotFound} />Data Not Found</div> : null}

                {this.state.error ? <div className="no-data-img"><img src={ErrorIcon}/>Error Occured</div> : null}
            </div>
        );
    }
}
const mapStateToProps = state => {
    return {
        firebaseData: state.firebase
    }
}

const mapdispatchToProps = dispatch => {
    return {
        fetchFoodHistoryList: (date) => dispatch(actionCreators.fetchFoodHistory(date))
    }
}
export default connect(mapStateToProps, mapdispatchToProps)(Analysis);
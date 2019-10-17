import React, { Component } from 'react';
import './food.css'
import FoodList from './foodList'
import FoodBilling from './foodBilling'
import NavBar from '../navbar/navbar'
import ChangePriceDialog from '../dialogs/changepricedialog'
import AddItemDialog from '../dialogs/additem'
import Skeleton from '@material-ui/lab/Skeleton';
import Snackbar from '../snackbar/snackbar'
import * as actionCreators from '../../store/reducers/actionCreators'
import { connect } from 'react-redux'
// import { Offline, Online } from "react-detect-offline";
import NoInternet from '../../containers/nointernet'
// import offline from "react-offline";
class Food extends Component {
    constructor(props) {
        super(props)
        this.newPriceInput = React.createRef();
        this.state = {
            foodList: [],
            items: [],
            billingList: {},
            billingAmount: 0,
            isLoading: true,
            FoodItemStyle: {},
            modal: {
                changePriceModal: false,
                addItemModal: false
            },
            currentId: '',
            currentIndex: '',
            addItemForm: {
                food_name: '',
                food_type: 'veg',
                food_img: '',
                food_price: 0
            },
            error: false,
            snackbar: {
                open: 'none',
                message: '',
            },
            noInternet: {
                show: false,
                heading: 'Connection Error',
                title: 'It seems you don\'t have healthy or no internet connection',
            }

        }
    }


    componentDidMount() {
        this.props.fetchFoodList();
    }

    componentWillReceiveProps(props) {
        if (props.error) {
            switch (props.errorType) {
                case 'changePriceError':
                    this.showSnackBar('Unable to change price try again');
                    break;
                case 'addBillError':
                    this.showSnackBar('Order is not processed retry');
                    break;

                case 'foodListFetchError':
                    this.setState({
                        error: true,
                        noInternet: {
                            show: true,
                            heading: 'Something went wrong',
                            title: 'Unable to fetch food list please try again'
                        }
                    })
                    break;

                case 'addItemError':
                    this.showSnackBar('Unable to add new item')
                    break;
            }

        } else {
            let newFoodList
            switch (props.actionTaken) {
                case 'foodListFetch':
                    newFoodList = [...props.foodList];
                    this.setState({
                        foodList: newFoodList, items: newFoodList, isLoading: false, error: props.foodListError
                    });
                    break;

                case 'itemAdded':
                    newFoodList = props.foodList;
                    this.setState({ modal: { addItemModal: false }, foodList: newFoodList });
                    this.showSnackBar('Item added successfully')
                    break;

                case 'billAdded':
                    this.setState({
                        FoodItemStyle: { marginRight: '0px' },
                        billingList: {},
                        billingAmount: 0,
                    });
                    this.showSnackBar('Order Processed successfully')
                    break;

                case 'priceChanged':
                    newFoodList = props.foodList;
                    this.showSnackBar('Price changed successfully')
                    this.setState({ foodList: newFoodList });
                    break;
            }

        }

    }

    showSnackBar = (msg) => {
        this.setState({
            snackbar: { open: 'block', message: msg },
        })
        setTimeout(() => {
            this.setState({ snackbar: { open: 'none', message: '' } })
        }, 3000)
    }

    addFoodItemToBilling = (id, name, price) => {
        let newBilllingList = { ...this.state.billingList };
        let newBillingAmount = this.state.billingAmount;
        if (newBilllingList[id]) {

            newBilllingList[id].quantity += 1;
            newBillingAmount += price;
            newBilllingList[id].total = newBilllingList[id].price * newBilllingList[id].quantity
        } else {
            newBilllingList[id] = { 'itemName': name, 'price': price, 'quantity': 1, 'total': price }
            newBillingAmount += price
        }
        this.setState({
            billingList: newBilllingList,
            billingAmount: newBillingAmount,
        })

        if (this.state.billingList !== {}) {
            this.setState({
                FoodItemStyle: { marginRight: '370px' }
            })
        }
    }

    cancelOrder = () => {
        let newBilllingList = {};
        let newBillingAmount = 0;
        this.setState({
            billingList: newBilllingList,
            billingAmount: newBillingAmount,
        })
        this.setState({
            FoodItemStyle: { marginRight: '0' }
        })
    }

    addItem = (id, price) => {
        let newBilllingList = { ...this.state.billingList }
        let newBillingAmount = this.state.billingAmount;
        newBilllingList[id].quantity += 1;
        newBillingAmount += price;
        newBilllingList[id].total = newBilllingList[id].price * newBilllingList[id].quantity
        this.setState({
            billingList: newBilllingList,
            billingAmount: newBillingAmount,
        })
    }

    deleteItem = (id, price) => {
        let newBilllingList = { ...this.state.billingList }
        let newBillingAmount = this.state.billingAmount;
        if (newBilllingList[id].quantity <= 1) {
            delete newBilllingList[id]
            newBillingAmount -= price
        } else {
            newBilllingList[id].quantity -= 1;
            newBillingAmount -= price;
            newBilllingList[id].total -= price
        }
        this.setState({
            billingList: newBilllingList,
            billingAmount: newBillingAmount,
        })
        if (newBillingAmount === 0) {
            this.setState({
                FoodItemStyle: { marginRight: '0' }
            })
        }
    }

    handleChange = (index) => {
        let newFoodList = [...this.state.foodList];
        newFoodList[index].available = !newFoodList[index].available
        this.setState({
            foodList: newFoodList,
        })
    }

    openPriceModal = (id, index) => {
        this.setState({
            modal: {
                changePriceModal: true
            },
            currentId: id,
            currentIndex: index
        })
    }

    changePrice = () => {
        if (this.newPriceInput.current.value === '') {

            this.setState({
                snackbar: { open: 'block', message: 'Please enter valid amount' },
                modal: { changePriceModal: false }
            })
            setTimeout(() => {
                this.setState({
                    snackbar: { open: 'none', message: '' }
                })
            }, 3000)
        } else {
            this.setState({
                modal: {
                    changePriceModal: false
                }
            })
            this.props.changePrice(this.newPriceInput.current.value, this.state.currentId, this.state.currentIndex)
        }

    }

    closeModal = (modalName) => {
        let modal = this.state.modal;
        modal[modalName] = false
        this.setState({
            modal: modal, currentId: '',
            currentIndex: '',
        })
    }

    print = () => {
        this.props.addBill(this.state.billingList, this.state.billingAmount)
    }

    goToHome = () => {
        this.props.history.goBack()
    }

    addNewItem = () => {
        this.setState({ modal: { addItemModal: true } })
    }

    addItemSubmit = (ev) => {
        ev.preventDefault()
        this.setState({ modal: { addItemModal: false } })
        this.props.addItem(this.state.addItemForm)
    }


    searchItems = (ev) => {
        let newFoodList;
        if (ev.target.value.length > 0) {
            newFoodList = this.state.items.filter((food, index) => {
                return food.name.toLowerCase().match((ev.target.value).toLowerCase())
            })
        }
        else {
            newFoodList = this.state.items
        }
        this.setState({
            foodList: newFoodList
        })
    }

    changeAddItemFormData = (ev, itemName) => {
        let newAddItem = this.state.addItemForm;
        newAddItem[itemName] = ev.target.value;
        this.setState({
            addItemForm: newAddItem
        })
    }
    retry = () => {
        this.props.fetchFoodList();
        this.setState({ isLoading: true, error: false, noInternet: { show: false } })
    }
    render() {
        let skeleton = [...Array(10)].map((e, index) => {
            return (
                <div className="skeleton-box" key={index}>
                    <Skeleton variant="rect" width={210} height={118} />
                    <Skeleton width={210} />
                    <Skeleton width={105} />
                </div>
            )
        })


        return (
            <React.Fragment>
                {this.state.noInternet.show ? <NoInternet retry={this.retry} heading={this.state.noInternet.heading} title={this.state.noInternet.title} /> : null}


                {this.state.error ? null : <div className="food-order-page">
                    <NavBar goToHome={this.goToHome} search={this.searchItems} addNewItem={this.addNewItem} />
                    {this.state.isLoading ? <div className="skeleton-div">
                        {skeleton}
                    </div> : null}


                    <div className="food-order">
                        <div className="food-list">

                            <div style={this.state.FoodItemStyle} className="food-items" >
                                {this.state.foodList.map((food, index) => {

                                    return (
                                        <FoodList openPriceModal={this.openPriceModal} key={food.id} index={index} food={food} clicked={this.addFoodItemToBilling}
                                            handleChange={this.handleChange}
                                        />
                                    )

                                })}
                            </div>
                        </div>
                    </div>
                    <FoodBilling print={this.print} billingList={this.state.billingList} billingAmount={this.state.billingAmount}
                        billingListCache={this.state.billingListCache} cancelOrder={this.cancelOrder}
                        addItem={this.addItem} deleteItem={this.deleteItem}
                    />


                    <ChangePriceDialog modalName="changePriceModal" openModal={this.state.modal.changePriceModal} newPriceInput={this.newPriceInput} closeModal={this.closeModal} changePrice={this.changePrice} />

                    <AddItemDialog changeAddItemFormData={this.changeAddItemFormData} addItemSubmit={this.addItemSubmit} modalName="addItemModal" formValue={this.state.addItemForm} openModal={this.state.modal.addItemModal} closeModal={this.closeModal} />

                    <Snackbar open={this.state.snackbar.open} message={this.state.snackbar.message} ></Snackbar>

                </div>}
            </React.Fragment>
        );
    }
}


const mapStateToProps = state => {
    return {
        foodList: state.firebase.foodList,
        itemAdded: state.firebase.itemAdded,
        error: state.firebase.error,
        errorType: state.firebase.errorType,
        actionTaken: state.firebase.actionTaken

    }
}

const mapStateToDispatch = dispatch => {
    return {
        fetchFoodList: () => dispatch(actionCreators.getFoodList()),
        addItem: (formData) => dispatch(actionCreators.addItem(formData)),
        addBill: (billingList, amount) => dispatch(actionCreators.addBill(billingList, amount)),
        changePrice: (price, id, index) => dispatch(actionCreators.changePrice(price, id, index))
    }
}
export default connect(mapStateToProps, mapStateToDispatch)(Food);
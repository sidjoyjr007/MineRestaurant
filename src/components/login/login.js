import React, { Component } from 'react';
import './login.css'
import {connect} from 'react-redux'
import LogoText from '../../content/img/logo.js'
import MainLogo from '../../content/img/logo.png'
import * as actionTypes from '../../store/actions/action'
import SnackBar from '../snackbar/snackbar'



class Login extends Component {
    constructor(props){
        super(props);
        this.state={
            snackbar:{
                open:'none',
                 message:''
            }
        }
    }

    login=(event)=>{
        event.preventDefault();
        if(event.target.userName.value==='admin' && event.target.password.value==='admin@007'){
            this.props.changeLoginStatus();
        }else{
            this.setState({snackbar:{open:'block',message:'Please enter valid credentials'}});
            setTimeout(() => {
                this.setState({
                    snackbar: { open: 'none', message: '' }
                })
            }, 3000)
        }   
    }
    
    render() { 
        return ( 
            <div className="login-page">
            <div className="login-page-logo">
            <LogoText/>
                <img src={MainLogo}/>
            </div>
                <div className="login-card">
                <div className="login-content">
                    <div className="login-heading">Login</div>
                    <form className="login-form" onSubmit={ev=>this.login(ev)}>
                        <div className="input">
                        
                      <input type="text"  name="userName" className="userName-input" autoComplete="off" placeholder="Enter user name" required/>
                        </div>
                        <div className="input">
                        <input className="password-input" type="password"  name="password"  autoComplete="off" placeholder="Enter password" required/>
                        </div>
                        <button className="login-btn" >Let's Go</button>
                        <SnackBar open={this.state.snackbar.open} message={this.state.snackbar.message} />

                    </form>
                    </div>
                </div>
            </div>
         );
    }
}

const mapStateToProps=state=>{
    return{
        auth:state.login.auth,
    }
}

const mapDispatchToProps=dispatch=>{
    return {
       changeLoginStatus:()=>dispatch({type:actionTypes.isLoggedIn})
    }
}
 
export default connect(mapStateToProps,mapDispatchToProps)(Login);
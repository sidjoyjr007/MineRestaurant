import React, { Fragment, Component } from 'react';
import { Route, withRouter, Switch } from 'react-router-dom'
import Login from './components/login/login'
import { connect } from 'react-redux';
import Main from './components/main/main'
import Food from './components/foodOrder/food'
import Analysis from './components/analysis/analysis'
import NotFound from './components/404/404.js'

class RouteConfig extends Component {
  render() {
    return (
      <Fragment>
        <Switch>

          {/* If 'auth' is 'true' goto 'Main' page otherwise 'Login' page */}
          <Route exact path="/" component={this.props.auth ? Main : Login} />

          <Route path="/Food" component={Food} />
          <Route path="/Analysis" component={Analysis} />
          <Route path="*" component={NotFound} />
        </Switch>
      </Fragment>
    )
  }
}
const mapStateToProps = state => {
  return {
    auth: state.login.auth
  }
}
export default withRouter(connect(mapStateToProps)(RouteConfig))
import React from 'react';
import { Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { PrivateRoute } from './PrivateRoute.js';
import { history } from './helpers';
import { alertActions } from './actions';
import { HomePage } from './components/HomePage';
import ConnectedLoginPage, { LoginPage } from './components/LoginPage';
import ConnectedRegisterPage, { RegisterPage } from './components/RegisterPage';
import Logout from './components/LogoutPage'

export class App extends React.Component {
    constructor(props) {
        super(props);

        const { dispatch } = this.props;
        history.listen((location, action) => {
            dispatch(alertActions.clear());
        });
    }

    render() {
        const { alert } = this.props;
        return (
            <div className="container">
                <div className="col-sm-8 col-sm-offset-2">
                <br />
                {alert &&
                    <div className={`alert ${alert.type}`} role="alert">
                        {alert.message}
                    </div>
                }
                <Router history={history}>
                    <div>
                        <PrivateRoute exact path="/" component={HomePage} />
                        <Route exact path="/login" component={ConnectedLoginPage} />
                        <Route exact path="/register" component={ConnectedRegisterPage} />
                        <Route exact path="/logout" component={Logout} />
                    </div>
                </Router>
                </div>
            </div>
        );
    }
}

const mapState = (state) => ({
    alert: state.alert,
    authentication: state.authentication,
})

export default connect(mapState)(App)

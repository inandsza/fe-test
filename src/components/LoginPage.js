import React from 'react';
import { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { history } from '../helpers';

import { userActions } from '../actions';

export class LoginPage extends Component {
    constructor(props) {
        super(props);

        // reset login status

        this.state = {
            username: '',
            password: '',
            submitted: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(value) {
        this.setState({ ...value })
    }

    handleSubmit(e) {
        e.preventDefault()
        const { login } = this.props
        const { username, password } = this.state
        login({username, password})
    }

    render() {
        const { username, password, submitted } = this.state;

        return (
            <div className="col-md-6 col-md-offset-3">
                <h2>Login</h2>
                <form name="form">
                    <div className={'form-group' + (submitted && !username ? ' has-error' : '')}>
                        <label htmlFor="username">Username</label>
                        <input
                            onChange={e => this.handleChange({ username: e.target.value })}
                            type="text"
                            className="form-control username"
                            name="username"
                        />
                        {submitted && !username &&
                            <div className="help-block">Username is required</div>
                        }
                    </div>
                    <div className={'form-group' + (submitted && !password ? ' has-error' : '')}>
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            className="form-control"
                            name="password"
                            onChange={e => this.handleChange({ password: e.target.value })}
                        />
                        {submitted && !password &&
                            <div className="help-block">Password is required</div>
                        }
                    </div>
                <div className="form-group">
                        <button
                            to="/"
                            className="btn btn-primary"
                            onClick={this.handleSubmit}
                        >Login</button>
                        <Link
                            to="/register"
                            className="btn btn-link"
                        >Register</Link>
                    </div>
                </form>
            </div>
        );
    }
}

export default connect(null, {
    ...userActions
})(LoginPage)

export { LoginPage as TestLoginPage };

import React from 'react';
import { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions } from '../actions';

export class RegisterPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: {
                username: '',
                password: ''
            },
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
        const { register } = this.props
        const { username, password } = this.state
        register({username, password})
    }

    render() {
        const { user, submitted } = this.state;

        return (
            <div className="col-md-6 col-md-offset-3">
                <h2>Register</h2>
                <form name="form">
                    <div className={'form-group' + (submitted && !user.username ? ' has-error' : '')}>
                        <label htmlFor="username">Username</label>
                        <input
                            onChange={e => this.handleChange({ username: e.target.value })}
                            type="text"
                            className="form-control username"
                            name="username"
                        />
                        {submitted && !user.username &&
                            <div className="help-block">Username is required</div>
                        }
                    </div>
                    <div className={'form-group' + (submitted && !user.password ? ' has-error' : '')}>
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            className="form-control"
                            name="password"
                            onChange={e => this.handleChange({ password: e.target.value })}
                        />
                        {submitted && !user.password &&
                            <div className="help-block">Password is required</div>
                        }
                    </div>
                    <div className="form-group">
                        <button
                            className="btn btn-primary"
                            onClick={this.handleSubmit}
                        >Register</button>
                        <Link to="/login" className="btn btn-link">Cancel</Link>
                    </div>
                </form>
            </div>
        );
    }
}

export default connect(null, {
    ...userActions
})(RegisterPage)

export { RegisterPage as TestRegisterPage };

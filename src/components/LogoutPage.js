import { Component } from 'react';
import { connect } from 'react-redux';
import { userActions } from '../actions/user.actions';

import { history } from '../helpers/history';

class LogoutPage extends Component {

  componentWillMount() {
    this.props.dispatch(userActions.logout())
    history.push('/')
  }

  render() {
    return null
  }
}

export default connect()(LogoutPage)

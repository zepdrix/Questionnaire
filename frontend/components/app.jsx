const React = require('react');
const NavBar = require('./nav_bar');
const AdminHomepage = require('./admin_homepage');
const UserHomepage = require('./user_homepage');
const NotLoggedIn = require('./not_logged_in');
const SessionActions = require('../actions/session_actions');
const SessionStore = require('../stores/session_store');

var App = React.createClass({
  getInitialState () {
    return { currentUser: SessionStore.currentUser() };
  },

  componentDidMount () {
    this.sessionListener = SessionStore.addListener(this.handleSession);
    SessionActions.fetchCurrentUser();
  },

  handleSession () {
    this.setState({ currentUser: SessionStore.currentUser });
  },

  renderPage () {
    if (SessionStore.isUserLoggedIn()) {
      if (SessionStore.isCurrentUserAdmin() ) {
        return <AdminHomepage />;
      } else {
        return <UserHomepage />;
      }
    } else {
      return <NotLoggedIn />;
    }
  },

  render () {
    return (
      <div>
        <NavBar />
        { this.props.children }
      </div>
    );
  }
});

module.exports = App;

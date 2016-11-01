const React = require('react');
const NavBar = require('./nav_bar');
const AdminHomepage = require('../homepage/admin_homepage');
const UserHomepage = require('../homepage/user_homepage');
const NotLoggedIn = require('../homepage/not_logged_in');
const SessionActions = require('../../actions/session_actions');
const SessionStore = require('../../stores/session_store');

var App = React.createClass({
  getInitialState () {
    return { currentUser: SessionStore.currentUser() };
  },

  componentDidMount () {
    this.sessionListener = SessionStore.addListener(this.handleSession);
    SessionActions.fetchCurrentUser();
  },

  handleSession () {
    this.setState({ currentUser: SessionStore.currentUser() });
  },

  renderPage () {
    if (this.props.location.pathname == "/") {
      if (SessionStore.isUserLoggedIn()) {
        if (SessionStore.isCurrentUserAdmin() ) {
          return <AdminHomepage />;
        } else {
          return <UserHomepage />;
        }
      } else {
        return <NotLoggedIn />;
      }
    }
  },

  render () {
    return (
      <div>
        <NavBar refresh={ this.handleSession } />
        { this.renderPage() }
        { this.props.children }
      </div>
    );
  }
});

module.exports = App;

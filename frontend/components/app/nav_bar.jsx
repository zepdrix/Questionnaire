const React = require('react');
const Link = require('react-router').Link;
const Modal = require('react-modal');
const ModalStyle = require('../../modal/style');
const SessionStore = require('../../stores/session_store');
const SessionActions = require('../../actions/session_actions');
const LoginForm = require('./login_form');

var NavBar = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  getInitialState () {
    return { currentUser: SessionStore.currentUser(), modalOpen: false };
  },

  componentDidMount () {
    this.sessionListener = SessionStore.addListener(this.onModalClose);
    this.redirectListener = SessionStore.addListener(this.redirectIfLoggedOut);
  },

  componentWillUnmount () {
    this.sessionListener.remove();
    this.redirectListener.remove();
  },

  onModalClose () {
    ModalStyle.content.opacity = '0';
    this.setState({ currentUser: SessionStore.currentUser() ,modalOpen: false });
  },

  onModalOpen () {
    ModalStyle.content.opacity = '100';
  },

  redirectIfLoggedOut () {
    if (!SessionStore.isUserLoggedIn()) {
      this.context.router.push('/');
    }
  },

  handleLogout (e) {
    e.preventDefault();
    SessionActions.logoutUser();
  },

  handleLogin (e) {
    e.preventDefault();
    this.setState({ modalOpen: true });
  },

  renderWelcome () {
    if (SessionStore.isUserLoggedIn()) {
      return 'Welcome, ' + this.state.currentUser.username +'!';
    }
  },

  render () {
    var handleUser = this.handleLogin,
        buttonText = 'Log In';

    if (SessionStore.isUserLoggedIn()) {
      handleUser = this.handleLogout;
      buttonText = 'Log Out';
    }

    return (
      <nav className="group">
        <div className="nav-container group">
          <div className="nav-title"><Link to="/">Questionnaire</Link></div>
          <ul className="login-options">
            <li>
              <button className="edit-user" onClick={ handleUser }>{ buttonText }</button>
              <Modal
                isOpen={ this.state.modalOpen }
                onRequestClose={ this.onModalClose }
                style={ ModalStyle }
                onAfterOpen={ this.onModalOpen }>
                <button onClick={ this.onModalClose }>[X] Close</button>
                <LoginForm onModalClose={ this.onModalClose } currentUser={ this.state.currentUser } />
              </Modal>
            </li>
            <li>
              <div className="nav-welcome">{ this.renderWelcome() }</div>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
});

module.exports = NavBar;

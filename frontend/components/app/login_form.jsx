const React = require('react');
const ErrorStore = require('../../stores/error_store');
const ErrorActions = require('../../actions/error_actions');
const SessionStore = require('../../stores/session_store');
const SessionActions = require('../../actions/session_actions');
const FormConstants = require('../../constants/form_constants');


var LoginForm = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  getInitialState () {
    return { username: '', password: '', form: FormConstants.SIGNUP_FORM };
  },

  componentDidMount () {
    this.errorListener = ErrorStore.addListener(this.forceUpdate.bind(this));
    this.sessionListener = SessionStore.addListener(this.redirectIfLoggedIn);
  },

  componentWillUnmount () {
    this.errorListener.remove();
    this.sessionListener.remove();
    setTimeout(() => { ErrorActions.clearErrors(); }, 1000);
  },


  formErrors () {
    let errorString;

    if (this.state.form === FormConstants.SIGNUP_FORM) {
      errorString = FormConstants.SIGNUP_FORM;
    } else {
      errorString = FormConstants.LOGIN_FORM;
    }

    let errors = ErrorStore.errors(errorString) || [];
    if (errors.length > 0) {

      let errorMessages = errors.map( (error, key) => {
        return <li className="form-error" key={ key }>{ error }</li>;
        });

        return <ul>{ errorMessages }</ul>;
    }
  },

  redirectIfLoggedIn () {
    this.context.router.push("/");
    this.props.redirect();
  },

  handleSubmit (e) {
    e.preventDefault();
    if (this.state.form === FormConstants.SIGNUP_FORM) {
      SessionActions.createUser(this.state);
    } else {
      SessionActions.loginUser(this.state);
    }
  },

  formName () {
    if (this.state.form === FormConstants.SIGNUP_FORM) {
      return <div>Sign Up</div>;
    } else {
      return <div>Log In</div>;
    }
  },

  formText () {
    if (this.state.form === FormConstants.SIGNUP_FORM) {
      return "Don't have an account yet? Sign up to start answering questionnaires!";
    } else {
      return "Already have an account? Log in to answer questionnaires!";
    }
  },

  toggleForm (e) {
    e.preventDefault();
    if (this.state.form === FormConstants.SIGNUP_FORM) {
      this.setState({ form: FormConstants.LOGIN_FORM });
    } else {
      this.setState({ form: FormConstants.SIGNUP_FORM });
    }
  },

  phoneNumber () {
    if (this.state.form === FormConstants.SIGNUP_FORM) {
      return (
        <div>
          <label htmlFor="phone-number">Phone Number</label>
          <div className="login-input phone-number">
            <input className="input"
              id="phone-number"
              placeholder="###-###-####"
              value={this.state.phoneNumber}
              onChange={this.handlePhoneNumber}/>
          </div>
        </div>
      );
    }
  },

  handleUsername (e) {
    e.preventDefault();
    this.setState({ username: e.target.value });
  },

  handlePassword(e) {
    e.preventDefault();
    this.setState({ password: e.target.value });
  },

  formChange () {
    if (this.state.form === FormConstants.SIGNUP_FORM) {
      return 'Login Instead';
    } else {
      return 'Sign Up Instead';
    }
  },

  render () {
    return(
      <div className="form-wrapper">
        <h1 className="login-form-title">{ this.formName() }</h1>

        <div className="form-text">{ this.formText() }</div>
        <form className="login-form" onSubmit={this.handleSubmit}>
          <label htmlFor="username">Username</label>
          <div className="login-input username">
            <input className="input"
              id="username"

              placeholder="Username"
              value={this.state.username}
                onChange={this.handleUsername}/>
          </div>

          <label htmlFor="password">Password</label>
          <div className="login-input password">

            <input className="input"
              id="password"
              placeholder="Password"
              type="password"
              value={this.state.password}
              onChange={this.handlePassword}/>
          </div>
          { this.formErrors() }
          <div className="login-buttons">
            <button className="login-button">Submit</button>
            <a className="login-button" onClick={ this.toggleForm }>{ this.formChange() }</a>
          </div>
        </form>
      </div>
    );
  }
});

module.exports = LoginForm;

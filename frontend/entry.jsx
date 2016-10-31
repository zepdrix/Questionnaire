const React = require('react'),
      ReactDOM = require('react-dom'),
      Modal = require('react-modal'),
      ReactRouter = require('react-router'),
      Router = ReactRouter.Router,
      Route = ReactRouter.Route,
      IndexRoute = ReactRouter.IndexRoute,
      hashHistory = ReactRouter.hashHistory,
      browserHistory = ReactRouter.browserHistory;

const SessionActions = require('./actions/session_actions'),
      SessionStore = require('./stores/session_store');

const App = require('./components/app'),
      QuestionnaireForm = require('./components/questionnaire_form');
      const AdminHomepage = require('./components/admin_homepage');
      const UserHomepage = require('./components/user_homepage');
      const NotLoggedIn = require('./components/not_logged_in'),
      QuestionnaireShow = require('./components/questionnaire_show'),
      ResponseIndex = require('./components/response_index'),
      ResponseUserIndex = require('./components/response_user_index');
      // QuestionnaireIndex = require('./components/questionnaire_index');
// const LoginForm = require('./components/login_form');

// <IndexRoute component={ QuestionnaireForm }/>
// <Route path='/questionnaires/:questionnaireId' component={ QuestionnaireShow }/>
// <Route path='/questionnaires' component={ QuestionnaireIndex }/>
const _renderPage = () => {
  if (SessionStore.isUserLoggedIn()) {
    if (SessionStore.isCurrentUserAdmin() ) {
      return <AdminHomepage />;
    } else {
      return <UserHomepage />;
    }
  } else {
    return <NotLoggedIn />;
  }
};

const _ensureLoggedIn = function (nextState, replace) {
  if (!SessionStore.isUserLoggedIn()) {
    replace('/');
  }
};

const appRouter = (
  <Router history={ browserHistory }>
    <Route path='/' component={ App }>
      <Route path='/home' component={ _renderPage }/>
      <Route path='/responses' component={ ResponseIndex } onEnter={ _ensureLoggedIn }/>
      <Route path='/responses/:questionnaireId' component={ ResponseUserIndex } onEnter={ _ensureLoggedIn }/>
      <Route path='/questionnaires/:questionnaireId' component={ QuestionnaireShow } onEnter={ _ensureLoggedIn }/>
      <Route path='/createnew' component={ QuestionnaireForm } onEnter={ _ensureLoggedIn }/>
    </Route>
  </Router>

);

document.addEventListener("DOMContentLoaded", () => {
  if (window.currentUser) {
    SessionActions.receiveCurrentUser(window.currentUser);
  } else {
    SessionActions.receiveCurrentUser({});
  }

  Modal.setAppElement(document.body);

  const root = document.getElementById("content");
  ReactDOM.render(appRouter, root);
});

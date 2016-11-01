const React = require('react'),
      ReactDOM = require('react-dom'),
      Modal = require('react-modal'),
      ReactRouter = require('react-router'),
      Router = ReactRouter.Router,
      Route = ReactRouter.Route,
      IndexRoute = ReactRouter.IndexRoute,
      browserHistory = ReactRouter.browserHistory;

const SessionActions = require('./actions/session_actions'),
      SessionStore = require('./stores/session_store');

const App = require('./components/app/app'),
      QuestionnaireForm = require('./components/questionnaire/questionnaire_form'),
      AdminHomepage = require('./components/homepage/admin_homepage'),
      UserHomepage = require('./components/homepage/user_homepage'),
      NotLoggedIn = require('./components/homepage/not_logged_in'),
      QuestionnaireShow = require('./components/questionnaire/questionnaire_show'),
      ResponseIndex = require('./components/response/response_index'),
      ResponseUserIndex = require('./components/response/response_user_index');

const _ensureLoggedIn = function (nextState, replace) {
  if (!SessionStore.isUserLoggedIn()) {
    replace('/');
  }
};

const appRouter = (
  <Router history={ browserHistory }>
    <Route path='/' component={ App }>
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

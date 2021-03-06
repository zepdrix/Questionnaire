const Store = require('flux/utils').Store,
      AppDispatcher = require('../dispatcher/dispatcher'),
      SessionConstants = require('../constants/session_constants');

var SessionStore = new Store(AppDispatcher);

var _currentUser = {};

const _login = function (currentUser) {
  _currentUser = currentUser;
};

const _logout = function () {
  _currentUser = {};
};

SessionStore.isUserLoggedIn = function () {
  return !!_currentUser.id;
};

SessionStore.currentUser = function () {
  return Object.assign({}, _currentUser);
};

SessionStore.isCurrentUserAdmin = function () {
  return _currentUser.administrator;
};

SessionStore.__onDispatch = function (payload) {
  switch (payload.actionType) {
    case SessionConstants.LOGIN:
      _login(payload.user);
      this.__emitChange();
      break;
    case SessionConstants.LOGOUT:
      _logout(payload.user);
      this.__emitChange();
      break;
  }
};

module.exports = SessionStore;

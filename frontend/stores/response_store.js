const Store = require('flux/utils').Store,
      AppDispatcher = require('../dispatcher/dispatcher'),
      ResponseConstants = require('../constants/response_constants');

var ResponseStore = new Store(AppDispatcher);

var _responses = {};

const _resetResponse = function (response) {
  _responses[response.id] = response;
};

const _resetAllResponses = function (responses) {
  _responses = {};
  responses.forEach( (response) => {
    _responses[response.id] = response;
  });
};

ResponseStore.all = function () {
  var responses = [];
  Object.keys(_responses).forEach( (id) => {
    responses.push(_responses[id]);
  });
  return responses;
};

ResponseStore.find = function (id) {
  return _responses[id];
};

ResponseStore.__onDispatch = function (payload) {
  switch (payload.actionType) {
    case ResponseConstants.RECEIVE_RESPONSE:
      _resetResponse(payload.response);
      this.__emitChange();
      break;
    case ResponseConstants.RECEIVE_RESPONSES:
      _resetAllResponses(payload.responses);
      this.__emitChange();
      break;
  }
};

module.exports = ResponseStore;

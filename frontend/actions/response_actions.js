const ResponseApiUtil = require('../util/response_api_util'),
      ResponseConstants = require('../constants/response_constants'),
      AppDispatcher = require('../dispatcher/dispatcher'),
      ErrorActions = require('./error_actions');

module.exports = ({
  fetchResponse (id) {
    ResponseApiUtil.fetchResponse(
      id,
      this.receiveResponse);
  },

  fetchAllResponses () {
    ResponseApiUtil.fetchAllResponses(
      this.receiveAllResponses);
  },

  createResponse (formData) {
    ResponseApiUtil.createResponse(
      formData,
      this.receiveResponse,
      ErrorActions.setErrors);
  },

  receiveResponse (response) {
    AppDispatcher.dispatch({
      actionType: ResponseConstants.RECEIVE_RESPONSE,
      response: response
    });
  },

  receiveAllResponses (responses) {
    AppDispatcher.dispatch({
      actionType: ResponseConstants.RECEIVE_RESPONSES,
      responses: responses
    });
  }
});

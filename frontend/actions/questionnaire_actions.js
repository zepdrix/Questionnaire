const QuestionnaireApiUtil = require('../util/questionnaire_api_util'),
      QuestionnaireConstants = require('../constants/questionnaire_constants'),
      AppDispatcher = require('../dispatcher/dispatcher'),
      ErrorActions = require('./error_actions');

module.exports = ({
  fetchQuestionnaire (id) {
    QuestionnaireApiUtil.fetchQuestionnaire(
      id,
      this.receiveQuestionnaire);
  },

  fetchAllQuestionnaires () {
    QuestionnaireApiUtil.fetchAllQuestionnaires(
      this.receiveAllQuestionnaires);
  },

  createQuestionnaire (formData) {
    QuestionnaireApiUtil.createQuestionnaire(
      formData,
      this.receiveQuestionnaire,
      ErrorActions.setErrors);
  },

  receiveQuestionnaire (questionnaire) {
    AppDispatcher.dispatch({
      actionType: QuestionnaireConstants.RECEIVE_QUESTIONNAIRE,
      questionnaire: questionnaire
    });
  },

  receiveAllQuestionnaires (questionnaires) {
    AppDispatcher.dispatch({
      actionType: QuestionnaireConstants.RECEIVE_QUESTIONNAIRES,
      questionnaires: questionnaires
    });
  }
});

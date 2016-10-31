const Store = require('flux/utils').Store,
      AppDispatcher = require('../dispatcher/dispatcher'),
      QuestionnaireConstants = require('../constants/questionnaire_constants');

var QuestionnaireStore = new Store(AppDispatcher);

var _questionnaires = {};

const _login = function (currentUser) {
  _currentUser = currentUser;
};

const _logout = function () {
  _currentUser = {};
};

const _resetQuestionnaire = function (questionnaire) {
  _questionnaires[questionnaire.id] = questionnaire;
};

const _resetAllQuestionnaires = function (questionnaires) {
  _questionnaires = {};
  questionnaires.forEach( (questionnaire) => {
    _questionnaires[questionnaire.id] = questionnaire;
  });
};

QuestionnaireStore.all = function () {
  var questionnaires = [];
  Object.keys(_questionnaires).forEach( (id) => {
    questionnaires.push(_questionnaires[id]);
  });
  return questionnaires;
};

QuestionnaireStore.find = function (id) {
  return _questionnaires[id];
};

QuestionnaireStore.__onDispatch = function (payload) {
  switch (payload.actionType) {
    case QuestionnaireConstants.RECEIVE_QUESTIONNAIRE:
      _resetQuestionnaire(payload.questionnaire);
      this.__emitChange();
      break;
    case QuestionnaireConstants.RECEIVE_QUESTIONNAIRES:
      _resetAllQuestionnaires(payload.questionnaires);
      this.__emitChange();
      break;
  }
};

module.exports = QuestionnaireStore;

const FormConstants = require('../constants/form_constants');

module.exports = {
  createQuestionnaire (formData, successCb, errorCb) {
    $.ajax({
      url: "/api/questionnaires",
      method: "POST",
      dataType: "json",
      contentType: false,
      processData: false,
      data: formData,
      success: (resp) => {
        successCb(resp);
      },
      error: (xhr) => {
        errorCb(FormConstants.CREATE_QUESTIONNAIRE_FORM, xhr.responseJSON, xhr.responseText);
      }
    });
  },

  fetchQuestionnaire (id, successCb) {
    $.ajax({
      url: `/api/questionnaires/${id}`,
      method: "GET",
      success: (resp) => {
        successCb(resp);
      },
      error: (xhr) => {
        console.log("Error in QuestionnaireApiUtil#fetchQuestionnaire");
      }
    });
  },

  fetchAllQuestionnaires (successCb) {
    $.ajax({
      url: `/api/questionnaires`,
      method: "GET",
      success: (resp) => {
        successCb(resp);
      },
      error: (xhr) => {
        console.log("Error in QuestionnaireApiUtil#fetchAllQuestionnaires");
      }
    });
  }
};

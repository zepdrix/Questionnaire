const FormConstants = require('../constants/form_constants');

module.exports = {

  createResponse (formData, successCb, errorCb) {
    $.ajax({
      url: "/api/responses/",
      method: "POST",
      dataType: "json",
      contentType: false,
      processData: false,
      data: formData,
      success: (resp) => {
        successCb(resp);
      },
      error(xhr) {
        errorCb(FormConstants.CREATE_RESPONSE_FORM, xhr.responseJSON, xhr.responseText);
      }
    });
  }
};

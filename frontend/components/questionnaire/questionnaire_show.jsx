const React = require('react');

const ErrorActions = require('../../actions/error_actions'),
      ErrorStore = require('../../stores/error_store'),
      FormConstants = require('../../constants/form_constants'),
      QuestionnaireStore = require('../../stores/questionnaire_store'),
      QuestionnaireActions = require('../../actions/questionnaire_actions'),
      ResponseActions = require('../../actions/response_actions'),
      ResponseStore = require('../../stores/response_store'),
      SessionStore = require('../../stores/session_store');

var QuestionnaireShow = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  getInitialState () {
    var questionnaire = QuestionnaireStore.find(parseInt(this.props.params.questionnaireId));
    return { questionnaire: questionnaire, responseAttributes: {}, currentUser: SessionStore.currentUser() };
  },

  componentDidMount () {
    this.questionnaireListener = QuestionnaireStore.addListener(this.getQuestionnaire);
    this.responseListener = ResponseStore.addListener(this.redirectIfResponseSaved);
    this.errorListener = ErrorStore.addListener(this.forceUpdate.bind(this));
    QuestionnaireActions.fetchQuestionnaire(parseInt(this.props.params.questionnaireId));
  },

  componentWillUnmount () {
    this.errorListener.remove();
    this.questionnaireListener.remove();
    this.responseListener.remove();
    setTimeout(() => { ErrorActions.clearErrors(); }, 1000);
  },

  componentWillReceiveProps () {
    let questionnaireId = parseInt(this.props.params.questionnaireId);

    QuestionnaireActions.fetchQuestionnaire(questionnaireId);
    this.setState({ questionnaire: QuestionnaireStore.find(questionnaireId) });
  },

  getQuestionnaire () {
    // The questionnaire is set in the state and a callback defines the responseAttributes object in the state.

    var questionnaire = QuestionnaireStore.find(parseInt(this.props.params.questionnaireId));
    this.setState({ questionnaire: questionnaire }, this.defineResponseAttributes);
  },

  defineResponseAttributes () {
    // Defines the responseAttributes object in the state

    var responseAttributes = {};
    for (var i = 0; i < this.state.questionnaire.questions.length; i++) {
      responseAttributes[this.state.questionnaire.questions[i].id] = { question_label:'', response_text:'' };
      responseAttributes[this.state.questionnaire.questions[i].id].question_label = this.state.questionnaire.questions[i].label;
      responseAttributes[this.state.questionnaire.questions[i].id].position = this.state.questionnaire.questions[i].position;
    }

    this.setState({ responseAttributes: responseAttributes });
  },

  redirectIfResponseSaved () {
    this.context.router.push("/");
  },

  formErrors () {
    let errors = ErrorStore.errors(FormConstants.CREATE_RESPONSE_FORM) || [];
    if (errors.length > 0) {
      let errorMessages = errors.map( (error, key) => {
        return <li className="form-error" key={ key }>{ error }</li>;
      });

      return <ul>{ errorMessages }</ul>;
    }
  },

  handleSubmit (e) {
    e.preventDefault();
    var formData = new FormData();
    formData.append("response[questionnaire_id]", this.state.questionnaire.id);
    formData.append("response[user_id]", this.state.currentUser.id);
    formData.append("response[title]", this.state.questionnaire.title);
    formData.append("response[description]", this.state.questionnaire.description);
    var responses = [];
    Object.keys(this.state.responseAttributes).forEach( (id) => {
      responses.push(this.state.responseAttributes[id]);
    });
    formData.append("response[question_response_attributes]",  JSON.stringify(responses));
    ResponseActions.createResponse(formData);
  },

  handleInput (e) {
    // Each question has a textarea field with the question's id, which is used to edit the
    // corresponding object in the state's responseAttributes

    e.preventDefault();
    var responseText = this.state.responseAttributes;
    responseText[e.target.id].response_text = e.target.value;
    this.setState({ responseAttributes: responseText });
  },

  renderQuestionnaire () {
    if (this.state.questionnaire) {
      var questions = this.state.questionnaire.questions.map( (question, key) => {
        return (
          <li key={ question.id }>
            <label htmlFor={ question.id }>{question.position + 1}. { question.label }</label>
            <div>
              <textarea className="input"
                id={ question.id }
                rows="2"
                placeholder="Type your answer here"
                onChange={ this.handleInput }>
              </textarea>
            </div>

          </li>
        );
        });

        return (
          <form className="questionnaire" onSubmit={ this.handleSubmit }>
            <h1>
              { this.state.questionnaire.title }
            </h1>
            <h3>
              { this.state.questionnaire.description }
            </h3>
            <ul>
              { questions }
            </ul>
            <button>Submit</button>
          </form>
        );
    }
  },

  render () {
    return (
      <div className="page">
        { this.renderQuestionnaire() }
        { this.formErrors() }
      </div>
    );
  }
});

module.exports = QuestionnaireShow;

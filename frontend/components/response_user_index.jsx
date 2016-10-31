const React = require('react');

const ResponseStore = require('../stores/response_store'),
      ResponseActions = require('../actions/response_actions'),
      QuestionnaireStore = require('../stores/questionnaire_store'),
      QuestionnaireActions = require('../actions/questionnaire_actions');

const UserResponseItem = require('./user_response_item');

var ResponseIndex = React.createClass({

  getInitialState () {

    return ({ questionnaire: QuestionnaireStore.find(parseInt(this.props.params.questionnaireId)) });
  },

  componentDidMount () {
    this.questionnaireListener = QuestionnaireStore.addListener(this.loadQuestionnaire);
    QuestionnaireActions.fetchQuestionnaire(parseInt(this.props.params.questionnaireId));
  },

  componentWillUnmount () {
    this.questionnaireListener.remove();
  },

  loadQuestionnaire () {
    this.setState({ questionnaire: QuestionnaireStore.find(parseInt(this.props.params.questionnaireId)) });
  },

  render () {
    var allUserResponseItems, questionnaireTitle, questionnaireDescription, allQuestions, notice, questionHeader;
    if (this.state.questionnaire) {
      questionnaireTitle = this.state.questionnaire.title;
      questionnaireDescription = this.state.questionnaire.description;
      allQuestions = this.state.questionnaire.questions.map((question) => {
        return <li key={ question.id }>{ question.position + 1 }. { question.label }</li>;
      });
      if (this.state.questionnaire.responses.length > 0) {
        allUserResponseItems = this.state.questionnaire.responses.map( (response) => {
          return <UserResponseItem key={ response.id } response={ response }/>;
        });
      } else {
        questionHeader = this.state.questionnaire.questions.length > 1 ? "Questions:" : "Question:";
        notice = "There are no responses for this questionnaire yet!";
        allUserResponseItems = this.state.questionnaire.questions.map((question) => {
          return <li key={ question.id }>{ question.position + 1 }. { question.label }</li>;
        });
      }
    }

    return (
      <div className="page">
        <h1>Responses for { questionnaireTitle }</h1>
        <div>Description: { questionnaireDescription }</div>
        <div>{ questionHeader }</div>
        <ul className="response-items">{ allUserResponseItems }</ul>
        { notice }
      </div>
    );

  }


});


module.exports = ResponseIndex;

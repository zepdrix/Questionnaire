const React = require('react');
const Link = require('react-router').Link;

const QuestionnaireStore = require('../../stores/questionnaire_store'),
      QuestionnaireActions = require('../../actions/questionnaire_actions');

const QuestionnaireIndex = require('../questionnaire/questionnaire_index');

var UserHomepage = React.createClass({
  getInitialState () {
    return { questionnaires: QuestionnaireStore.all() };
  },

  componentDidMount () {
    this.questionnaireListener = QuestionnaireStore.addListener(this.updateQuestionnaires);
    QuestionnaireActions.fetchAllQuestionnaires();
  },

  componentWillUnmount () {
    this.questionnaireListener.remove();
  },

  updateQuestionnaires () {
    this.setState({ questionnaires: QuestionnaireStore.all() });
  },

  render () {
    return (
      <div className="home page user">
        <h1>
          User Home
        </h1>
        <h3>
          Fill out any questionnaire below!
        </h3>
        <QuestionnaireIndex questionnaires={ this.state.questionnaires }/>

      </div>
    );
  }
});

module.exports = UserHomepage;

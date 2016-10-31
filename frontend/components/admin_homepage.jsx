const React = require('react');
const Link = require('react-router').Link;

const QuestionnaireStore = require('../stores/questionnaire_store'),
      QuestionnaireActions = require('../actions/questionnaire_actions');

const QuestionnaireIndex = require('./questionnaire_index');

var AdminHomepage = React.createClass({
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
      <div className="home page admin">
        <h1>
          Hello, admin user!
        </h1>
        <Link to='/createnew'>Create a new questionnaire</Link>
        <Link to='/responses'>View responses!</Link>
      </div>
    );
  }
});

module.exports = AdminHomepage;

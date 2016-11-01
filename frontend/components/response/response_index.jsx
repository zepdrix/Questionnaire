const React = require('react');

const QuestionnaireStore = require('../../stores/questionnaire_store'),
      QuestionnaireActions = require('../../actions/questionnaire_actions'),
      ResponseStore = require('../../stores/response_store'),
      ResponseActions = require('../../actions/response_actions');

const ResponseIndexItem = require('./response_index_item');

var ResponseIndex = React.createClass({

  getInitialState () {
    return ({ questionnaires: QuestionnaireStore.all() });
  },

  componentDidMount () {
    this.questionnaireListener = QuestionnaireStore.addListener(this.loadQuestionnaires);
    QuestionnaireActions.fetchAllQuestionnaires();
  },

  componentWillUnmount () {
    this.questionnaireListener.remove();
  },

  loadQuestionnaires () {
    this.setState({ questionnaires: QuestionnaireStore.all() });
  },

  render () {
    var allResponseIndexItems = this.state.questionnaires.map( (questionnaire) => {
      return <ResponseIndexItem key={ questionnaire.id } questionnaire={ questionnaire }/>;
    });

    return (
      <div className="page">
        <h1>All Questionnaires</h1>
        <table className="response-index-items">
          <tbody>
            <tr className="response-index-item group">
              <td className="response-title-header">
                <h3>
                  Title
                </h3>
              </td>
              <td className="response-number-header">
                <h3>
                  Number of Responses
                </h3>
              </td>
              <td className="response-date-header">
                <h3>
                  Date Created
                </h3>
              </td>
            </tr>
            { allResponseIndexItems }
          </tbody>
        </table>
      </div>

    );
  }
});


module.exports = ResponseIndex;

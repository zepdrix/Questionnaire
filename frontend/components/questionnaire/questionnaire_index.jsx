const React = require('react');

const QuestionnaireStore = require('../../stores/questionnaire_store'),
      QuestionnaireActions = require('../../actions/questionnaire_actions');

const QuestionnaireIndexItem = require('./questionnaire_index_item');

var QuestionnaireIndex = React.createClass({

  render () {
    var allQuestionnaireIndexItems;
    if (this.props.questionnaires.length > 0) {
      allQuestionnaireIndexItems = this.props.questionnaires.sort((a, b) => { return a.answered - b.answered ;}).map( (questionnaire) => {
        return <QuestionnaireIndexItem key={ questionnaire.id } questionnaire={ questionnaire }/>;
      });
    } else {
      allQuestionnaireIndexItems = <li>There are no questionnaires right now! (Ask an administrator make some)</li>;
    }

    return (
      <div className="questionnaire-index">
        <ul>{ allQuestionnaireIndexItems }</ul>
      </div>

    );

  }


});


module.exports = QuestionnaireIndex;

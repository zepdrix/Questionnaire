const React = require('react'),
      Link = require('react-router').Link;

var QuestionnaireIndexItem = React.createClass({
  shortenDescription () {
    var shortenedDescription = this.props.questionnaire.description;
    if (shortenedDescription && shortenedDescription.length > 140) {
      shortenedDescription = shortenedDescription.slice(0, 140);
      return <p>{ shortenedDescription }</p>;
    } else if (shortenedDescription) {
      return <p>{ shortenedDescription }</p>;

    }
  },

  render () {
    var questionnaireUrl = `/questionnaires/${this.props.questionnaire.id}`;
    var questionnaireLink;
    if (this.props.questionnaire.answered) {
      questionnaireLink = (
        <div to={ questionnaireUrl }>
          <h3>{ this.props.questionnaire.title }</h3>
          <p>Already Answered!</p>
        </div>
      );
    } else {
      questionnaireLink = (
        <Link to={ questionnaireUrl }>
          <h3>{ this.props.questionnaire.title }</h3>
        </Link>
      );
    }
    return (
      <li className="questionnaire-index-item">
        { questionnaireLink }
        { this.shortenDescription() }
        <div>Number of questions: { this.props.questionnaire.questions.length }</div>
      </li>

    );
  }

});


module.exports = QuestionnaireIndexItem;

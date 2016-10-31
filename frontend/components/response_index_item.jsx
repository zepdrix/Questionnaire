const React = require('react'),
      Link = require('react-router').Link;

var ResponseIndexItem = React.createClass({
  parseDate () {
    var dateNum = Date.parse(this.props.questionnaire.created_at);
    var dateObj = new Date(dateNum);
    return dateObj.getMonth() + 1 + '/' + dateObj.getDate() + '/' + dateObj.getFullYear();
  },

  render () {
    var responseUrl = `/responses/${this.props.questionnaire.id}`;

    return (
      <tr className="response-index-item group">
        <td className="response-title-header">
          <Link to={ responseUrl }>
            <div>{ this.props.questionnaire.title }</div>
          </Link>
        </td>
        <td className="response-number-header">
          <div className="response-numbers">{ this.props.questionnaire.responses.length } responses</div>
        </td>
        <td className="response-date-header">
          <div className="response-dates">{ this.parseDate() }</div>
        </td>
      </tr>
    );
  }
});

module.exports = ResponseIndexItem;

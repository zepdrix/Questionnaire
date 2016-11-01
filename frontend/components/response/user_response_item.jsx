const React = require('react'),
      Link = require('react-router').Link;

var ResponseIndexItem = React.createClass({
  parseDate () {
    var dateNum = Date.parse(this.props.response.created_at);
    var dateObj = new Date(dateNum);
    return dateObj.getMonth() + 1 + '/' + dateObj.getDate() + '/' + dateObj.getFullYear();
  },

  renderQuestionResponses () {
    var allQuestionResponses = this.props.response.question_responses.map((questionResponse) => {
      return (
        <table className="question-response" key={ questionResponse.id }>
          <tbody>
            <tr className="response-row">
              <td>
                Question { questionResponse.position + 1 }
              </td>
              <td>
                { questionResponse.question_label }
              </td>
            </tr>
            <tr>
              <td>
                Response
              </td>
              <td>
                { questionResponse.response_text }
              </td>
            </tr>
          </tbody>
        </table>
        );
    });

    return <div className="question-responses">{ allQuestionResponses }</div>;
  },

  render () {
    return (
      <li className="response-item group">
        <Link >
        </Link>
        <div className="response-username">{ this.props.response.response_user.username }</div>
        <div className="created-at">Submitted on { this.parseDate() }</div>
        { this.renderQuestionResponses() }
      </li>
    );
  }
});


module.exports = ResponseIndexItem;

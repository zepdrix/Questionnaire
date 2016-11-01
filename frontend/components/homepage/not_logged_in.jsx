const React = require('react');

var NotLoggedIn = React.createClass({
  render () {
    return (
      <div className="home page logged-out">
        <h1>
          Log in to make questionnaires!
        </h1>
      </div>
    );
  }
});

module.exports = NotLoggedIn;

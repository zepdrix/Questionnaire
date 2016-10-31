const React = require('react');

var NotLoggedIn = React.createClass({
  render () {
    return (
      <div className="home page logged-out">Log in to make questionnaires!</div>
    );
  }
});

module.exports = NotLoggedIn;

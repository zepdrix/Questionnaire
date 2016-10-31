module.exports = {
  parseDate () {
    var dateNum = Date.parse(this.props.response.created_at);
    var dateObj = new Date(dateNum);
    return dateObj.getMonth() + 1 + '/' + dateObj.getDate() + '/' + dateObj.getFullYear();
  }

};

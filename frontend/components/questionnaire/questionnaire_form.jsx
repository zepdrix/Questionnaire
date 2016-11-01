const React = require('react');
const QuestionnaireActions = require('../../actions/questionnaire_actions'),
      QuestionnaireStore = require('../../stores/questionnaire_store'),
      ErrorStore = require('../../stores/error_store'),
      FormConstants = require('../../constants/form_constants');

var QuestionnaireForm = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  getInitialState () {
    return { title: '', description: '', questions: {}, currentQuestionTitle: '', currentQuestionLabel: '', currentQuestionPos: 0, error: '', formError: '' };
  },

  componentDidMount () {
    this.errorListener = ErrorStore.addListener(this.forceUpdate.bind(this));
    this.questionnaireListener = QuestionnaireStore.addListener(this.redirectIfQuestionnaireSaved);
  },

  componentWillUnmount () {
    this.questionnaireListener.remove();
    this.errorListener.remove();
  },

  redirectIfQuestionnaireSaved () {
    this.context.router.push('/responses');
  },

  handleTitle (e) {
    e.preventDefault();
    this.setState({ title: e.target.value });
  },

  handleDescription (e) {
    e.preventDefault();
    this.setState({ description: e.target.value });
  },

  handleQuestionLabel (e) {
    e.preventDefault();
    this.setState({ currentQuestionLabel: e.target.value });
  },

  formErrors () {
    let errors = ErrorStore.errors(FormConstants.CREATE_QUESTIONNAIRE_FORM) || [];
    if (errors.length > 0) {
      let errorMessages = errors.map( (error, key) => {
        return <li className="form-error" key={ key }>{ error }</li>;
        });

        return <ul>{ errorMessages }</ul>;
    }
  },

  handleSubmit (e) {
    e.preventDefault();
    if (Object.keys(this.state.questions).length < 1) {
      this.setState({ formError: "Must have at least 1 question!" });
    } else {
      var formData = new FormData();

      formData.append("questionnaire[title]", this.state.title);
      formData.append("questionnaire[description]", this.state.description);

      var questions = [];

      Object.keys(this.state.questions).sort((a, b) => { return a - b; }).forEach( (formPosition, index) => {
        this.state.questions[formPosition].position = index;
        questions.push(this.state.questions[formPosition]);
      });

      formData.append("questionnaire[questions_attributes]", JSON.stringify(questions));
      QuestionnaireActions.createQuestionnaire(formData);
    }
  },


  handleAddQuestion (e) {
    // Questions are added to the state's question object with a position counter (this.state.currentQuestionPos)
    // so that questions can be rendered in correct order and deleted.

    e.preventDefault();
    var allQuestions = [];

    Object.keys(this.state.questions).forEach((position) => {
      allQuestions.push(this.state.questions[position].label);
    });

    var currentLabel = this.state.currentQuestionLabel;

    if (currentLabel === undefined || currentLabel === '') {
      this.setState({ error: "Question can't be blank!"});
    } else if (allQuestions.indexOf(currentLabel) >= 0) {
      this.setState({ error: "Can't ask same question twice!" });
    } else {
      var position = this.state.currentQuestionPos;
      var questions = this.state.questions;
      questions[position] = { label: currentLabel };
      position += 1;
      this.setState({ questions: questions, currentQuestionLabel: '', error: '', formError: '', currentQuestionPos: position});
    }
  },

  removeQuestion (e) {
    // Allows the user to delete any question in the state's question object.

    e.preventDefault();
    var int = parseInt(e.target.dataset.position);
    var questions = this.state.questions;
    delete questions[int];
    this.setState({ questions: questions });
  },

  renderQuestions () {
    // Renders all questions in the state's question object.
    // Questions are ordered in the order they are created in.
    // The Delete Question button stores the question's 'position' counter
    // so that it can be removed accurately.

    var questionList;
    if (Object.keys(this.state.questions).length > 0) {
      questionList = Object.keys(this.state.questions).sort( (a, b) => { return a - b; }).map( (position, key) => {
        return (
          <li className="questionnaire-form-question" key={ position }>
            <div>
              { key + 1 }. { this.state.questions[position].label }
            </div>
            <button data-position={ position } onClick={ this.removeQuestion }>
              Delete Question { key + 1 }
            </button>
          </li>
        );
      });

    } else {
      questionList = <li>(No questions yet)</li>;
    }
    return <ul>{ questionList }</ul>;
  },

  render () {
    return (
      <div className="page">
        <h1>Create a new questionnaire!</h1>
        <p>Enter a title and a description for your questionnaire. You can also provide a description but it is not required. You add as many questions as you like. When you are done, just click the 'Create Questionnaire' button to save the questionnaire!</p>
        <form className="questionnaire-form" onSubmit={ this.handleSubmit }>
          <label htmlFor="title">Title</label>
          <div>
            <input className="input"
              id="title"

              placeholder="Title"
              value={this.state.title}
              onChange={this.handleTitle}/>
          </div>

          <label htmlFor="description">Description</label>
          <div>
            <textarea className="input"
              id="description"
              placeholder="Description"
              value={this.state.description}
              onChange={this.handleDescription}
              rows="4">

            </textarea>

          </div>
          <label>Questions</label>
          <div>
            { this.renderQuestions() }
          </div>
          <div>
            { this.formErrors() }
            <div className="form-error">
              { this.state.formError }
            </div>
          </div>

          <button>Create Questionnaire</button>
        </form>
        <form className="question-form" onSubmit={ this.handleAddQuestion }>

          <label htmlFor="new-question-name">New Question Name</label>
          <div>
            <input className="input"
              id="new-question-name"

              placeholder="Add a name"
              value={this.state.currentQuestionLabel}
              onChange={this.handleQuestionLabel}/>
          </div>
          <div className="form-error">{ this.state.error }</div>
          <button>Create Question</button>

        </form>
      </div>
    );
  }


});

module.exports = QuestionnaireForm;

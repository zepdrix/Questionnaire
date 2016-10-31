# Questionnaire

[Questionnaire](http:/everplansquestionnaire.herokuapp.com)

# Summary

PhantomVibrations is a single page web application built with Ruby on Rails and using the React.js/flux architecture.

# Features

  - User authentication with usernames and passwords
  - Regular users can sign up/log in and answer questionnaires
  - Admin users can log in and create questionnaires
  - Admin users can look at a questionnaire's responses
  - All questionnaires and responses are stored in a postgresql database
  - Responsive styling to accomodate mobile users

# Technical Details
---
## Defining a questionnaire

Admin users have the ability to define a questionnaire on the front end with the QuestionnaireForm component. The component stores questions in an object and keeps track of the order of the questions with 'position' key.

```JavaScript
handleAddQuestion (e) {
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
}
```

The component allows an admin user to delete any question they've defined at any point by simply deleting the corresponding key of the question stored in the component state's question object.

```JavaScript
removeQuestion (e) {
  e.preventDefault();
  var int = parseInt(e.target.dataset.position);
  var questions = this.state.questions;
  delete questions[int];
  this.setState({ questions: questions });
},
```
On the back end, there is a Questionnaire model that has_many Questions and accepts_nested_attributes_for :questions. The questions are passed in through the params as nested attributes and saved as a Questionnaire created by the current user.

```Ruby
class Api::QuestionnairesController < ApplicationController
  def create
    @questionnaire = current_user.questionnaires.new(questionnaire_data)

    if @questionnaire.save
      render :show
    else
      render json: @questionnaire.errors.full_messages, status: 422
    end
  end

# ...skipping code...

  private

  def questionnaire_data
    questionnaire_params = {}
    questionnaire_params[:title] = params[:questionnaire][:title]
    questionnaire_params[:description] = params[:questionnaire][:description]
    questionnaire_params[:questions_attributes] = JSON.parse(params[:questionnaire][:questions_attributes])
    questionnaire_params
  end
end

```

## Responding to a questionnaire

Regular users can answer a questionnaire through the QuestionnaireShow component. Since questionnaires can have any number of questions, the component must input handlers that correspond to the number of questions on the fly. Each question in the questionnaire is rendered with a textarea that has an id attribute set to the question.id.


```JavaScript
var questions = this.state.questionnaire.questions.map( (question, key) => {
  return (
    <li key={ question.id }>
      <label htmlFor={ question.id }>{question.position + 1}. { question.label }</label>
      <div>
        <textarea className="input"
          id={ question.id }
          rows="2"
          placeholder="Type your answer here"
          onChange={ this.handleInput }>
        </textarea>
      </div>
    </li>
  );
  });
```

The handleInput method then takes the value of the target and applies it to the corresponding question response object being stored in the state.

```JavaScript
handleInput (e) {
  e.preventDefault();

  var responseText = this.state.responseAttributes;
  responseText[e.target.id].response_text = e.target.value;
  this.setState({ responseAttributes: responseText });
}
```

# Questionnaire

[Questionnaire](http:/phantomvibrations.herokuapp.com)

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

Admin users have the ability to define a questionnaire on the front end with the QuestionnaireForm component. The component stores questions in an object and keeps track of the order of the questions with 'position' key. An admin user can delete questions they've defined at any point. 

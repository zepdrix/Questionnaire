class Api::QuestionnairesController < ApplicationController
  def create
    @questionnaire = current_user.questionnaires.new(questionnaire_data)

    if @questionnaire.save
      render :show
    else
      render json: @questionnaire.errors.full_messages, status: 422
    end
  end

  def show
    @questionnaire = Questionnaire.find(params[:id])
    if @questionnaire
      render "api/questionnaires/show"
    else
      render json: {}
    end
  end

  def index
    @questionnaires = Questionnaire.all
    render "api/questionnaires/index"
  end

  private

  def questionnaire_data
    questionnaire_params = {}
    questionnaire_params[:title] = params[:questionnaire][:title]
    questionnaire_params[:description] = params[:questionnaire][:description]
    questionnaire_params[:questions_attributes] = JSON.parse(params[:questionnaire][:questions_attributes])
    questionnaire_params
  end
end

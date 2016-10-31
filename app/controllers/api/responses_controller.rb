class Api::ResponsesController < ApplicationController
  def create
    @response = Response.new(response_data)

    if @response.save
      render :show
    else
      render json: @response.errors.full_messages, status: 422
    end
  end

  private

  def response_data
    response_params = {}
    response_params[:user_id] = params[:response][:user_id]
    response_params[:questionnaire_id] = params[:response][:questionnaire_id]
    response_params[:title] = params[:response][:title]
    response_params[:description] = params[:response][:description]
    response_params[:question_responses_attributes] = JSON.parse(params[:response][:question_response_attributes])
    response_params
  end
end

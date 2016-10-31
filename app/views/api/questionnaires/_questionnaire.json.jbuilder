json.extract! questionnaire, :id, :author_id, :title, :description, :created_at
json.questions do
  json.array! questionnaire.questions do |question|
    json.partial! "api/questions/question", question: question
  end
end
json.responses do
  json.array! questionnaire.responses do |response|
    json.partial! "api/responses/response", response: response
  end
end
if current_user
  json.answered Response.response_exists?(current_user.id, questionnaire.id)
end

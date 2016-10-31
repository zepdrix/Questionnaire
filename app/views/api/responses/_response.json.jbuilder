json.extract! response, :id, :questionnaire_id, :user_id, :title, :description ,:created_at
json.question_responses do
  json.array! response.question_responses do |question_response|
    json.position question_response
    json.partial! "api/question_responses/question_response", question_response: question_response
  end
end
json.response_user do
  json.partial! "api/users/user", user: response.user
end

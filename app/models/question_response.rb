# == Schema Information
#
# Table name: question_responses
#
#  id             :integer          not null, primary key
#  response_id    :integer          not null
#  question_label :text             not null
#  response_text  :text
#  created_at     :datetime         not null
#  updated_at     :datetime         not null
#

class QuestionResponse < ActiveRecord::Base
  validates :question_label, presence: true

  belongs_to :response
  belongs_to :question
end

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
#  position       :integer          not null
#

class QuestionResponse < ActiveRecord::Base
  belongs_to :response

  validates :question_label, :position, presence: true
end

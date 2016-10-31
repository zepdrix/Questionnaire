# == Schema Information
#
# Table name: questions
#
#  id               :integer          not null, primary key
#  questionnaire_id :integer          not null
#  position         :integer          not null
#  label            :text             not null
#  created_at       :datetime         not null
#  updated_at       :datetime         not null
#

class Question < ActiveRecord::Base
  belongs_to :questionnaire
  has_many :question_responses
  validates :questionnaire_id, uniqueness: { scope: :label, message: "can't repeat questions!" }
end

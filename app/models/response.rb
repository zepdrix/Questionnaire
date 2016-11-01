# == Schema Information
#
# Table name: responses
#
#  id               :integer          not null, primary key
#  questionnaire_id :integer          not null
#  user_id          :integer          not null
#  created_at       :datetime         not null
#  updated_at       :datetime         not null
#  title            :string           not null
#  description      :text
#

class Response < ActiveRecord::Base
  belongs_to :questionnaire
  belongs_to :user
  has_many :question_responses, dependent: :destroy

  validates :user_id, :questionnaire_id, presence: true
  validates :user_id, uniqueness: { scope: :questionnaire_id, message: "can only answer a questionnaire once!" }
  accepts_nested_attributes_for :question_responses, allow_destroy: true

  def self.response_exists?(user_id, questionnaire_id)
    if Response.includes(:user).where(user_id: user_id, questionnaire_id: questionnaire_id).length > 0
      return true
    end
    false
  end
end

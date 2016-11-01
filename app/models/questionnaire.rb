# == Schema Information
#
# Table name: questionnaires
#
#  id          :integer          not null, primary key
#  title       :string           not null
#  description :text
#  author_id   :integer          not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

class Questionnaire < ActiveRecord::Base
  belongs_to(
    :author,
    class_name: 'User',
    foreign_key: :author_id
  )

  has_many :questions, dependent: :destroy
  has_many :responses, dependent: :destroy

  accepts_nested_attributes_for :questions, allow_destroy: true
  validates :author_id, :title, presence: true
  validate :only_admin_user_can_create_questionnaire, :require_at_least_one_question
  private

  def only_admin_user_can_create_questionnaire
    errors.add(:base, "Questionnaire has to belong to an admin") unless User.find(author_id).admin?
  end

  def require_at_least_one_question
    errors.add(:base, "You must provide at least one question") if questions.size < 1
  end
end

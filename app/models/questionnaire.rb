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
end

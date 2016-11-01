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

require 'faker'

FactoryGirl.define do
  factory :questionnaire do |questionnaire|
  end
end

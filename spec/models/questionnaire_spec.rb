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

require 'rails_helper'

describe Questionnaire do
  it 'validates that the author is an admin' do
    regular_user = User.create(username: 'regs', password: 'password123', administrator: false)
    questionnaire = Questionnaire.new(author_id: regular_user.id, title: 'Test', questions_attributes: [{label: 'Label', position: 0}])
    questionnaire.valid?
    expect(questionnaire.errors[:base].size).to eq(1)
  end

  it { should belong_to(:author) }
  it { should have_many(:questions) }
  it { should have_many(:responses) }
end

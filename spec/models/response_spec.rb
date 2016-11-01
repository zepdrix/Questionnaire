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

#  id             :integer          not null, primary key
#  response_id    :integer          not null
#  question_label :text             not null
#  response_text  :text
#  created_at     :datetime         not null
#  updated_at     :datetime         not null
#  position       :integer          not null
#
require 'rails_helper'

describe Response do
  it 'does not allow a user to answer the same questionnaire twice' do
    response1 = Response.create(questionnaire_id: 1, user_id: 1, title: 'Test1', question_responses_attributes: [{question_label: 'Label', position: 0}])
    response2 = Response.new(questionnaire_id: 1, user_id: 1, title: 'Test2', question_responses_attributes: [{question_label: 'Label', position: 0}])

    expect(response2.valid?).to be false
    expect(response2.errors[:user_id].size).to eq(1)
  end

  it { should belong_to(:user) }
  it { should belong_to(:questionnaire) }
  it { should have_many(:question_responses) }
end

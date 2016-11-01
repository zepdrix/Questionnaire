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

require 'rails_helper'

describe QuestionResponse do
  it { should belong_to(:response) }
  it { should validate_presence_of(:question_label) }
  it { should validate_presence_of(:position) }
end

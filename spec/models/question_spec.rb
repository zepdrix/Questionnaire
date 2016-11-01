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

require 'rails_helper'

describe Question do
  it { should belong_to(:questionnaire) }
  it { should validate_presence_of(:position) }
  it { should validate_presence_of(:label) }
end

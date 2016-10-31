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

require 'test_helper'

class QuestionTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end

class AddColumnToQuestionResponses < ActiveRecord::Migration
  def change
    add_column :question_responses, :position, :integer, null: false
  end
end

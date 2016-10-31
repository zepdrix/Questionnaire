class CreateQuestionResponses < ActiveRecord::Migration
  def change
    create_table :question_responses do |t|
      t.integer :response_id, null: false
      t.text :question_label, null: false
      t.text :response_text
      t.timestamps null: false
    end

    add_index :question_responses, :response_id
  end
end

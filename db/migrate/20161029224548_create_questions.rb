class CreateQuestions < ActiveRecord::Migration
  def change
    create_table :questions do |t|
      t.integer :questionnaire_id, null: false
      t.integer :position, null: false
      t.text :label, null: false
      t.timestamps null: false
    end
  end
end

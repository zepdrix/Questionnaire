class CreateResponses < ActiveRecord::Migration
  def change
    create_table :responses do |t|
      t.integer :questionnaire_id, null: false
      t.integer :user_id, null: false

      t.timestamps null: false
    end

    add_index :responses, :questionnaire_id
  end
end

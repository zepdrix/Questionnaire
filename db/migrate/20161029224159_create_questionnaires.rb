class CreateQuestionnaires < ActiveRecord::Migration
  def change
    create_table :questionnaires do |t|
      t.string :title, null: false
      t.text :description
      t.integer :author_id, null: false
      t.timestamps null: false
    end

    add_index :questionnaires, :author_id
  end
end

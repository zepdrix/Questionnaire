class AddColumnsToResponses < ActiveRecord::Migration
  def change
    add_column :responses, :title, :string, null: false
    add_column :responses, :description, :text
  end
end

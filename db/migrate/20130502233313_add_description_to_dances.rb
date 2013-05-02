class AddDescriptionToDances < ActiveRecord::Migration
  def change
    add_column :dances, :description, :string
  end
end

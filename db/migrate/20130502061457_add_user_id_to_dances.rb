class AddUserIdToDances < ActiveRecord::Migration
  def change
    add_column :dances, :user_id, :integer
  end
end

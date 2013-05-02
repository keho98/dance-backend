class CreateDances < ActiveRecord::Migration
  def change
    create_table :dances do |t|
      t.string :title
      t.string :foreign_id

      t.timestamps
    end
  end
end

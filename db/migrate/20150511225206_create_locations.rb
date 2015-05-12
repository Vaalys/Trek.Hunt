class CreateLocations < ActiveRecord::Migration
  def change
    create_table :locations do |t|
      t.integer :user_id
      t.text :city
      t.text :state
      t.text :country

      t.timestamps null: false
    end
  end
end

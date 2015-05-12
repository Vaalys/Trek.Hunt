class CreateActivities < ActiveRecord::Migration
  def change
    create_table :activities do |t|
      t.string :location_id
      t.string :image_url
      t.text :activity_type

      t.timestamps null: false
    end
  end
end

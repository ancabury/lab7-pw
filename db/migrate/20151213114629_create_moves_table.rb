class CreateMovesTable < ActiveRecord::Migration
  def change
    create_table :moves do |t|
      t.integer :line
      t.integer :column
      t.string :character
    end
  end
end

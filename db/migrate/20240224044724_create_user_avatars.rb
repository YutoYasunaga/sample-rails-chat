class CreateUserAvatars < ActiveRecord::Migration[7.1]
  def change
    create_table :user_avatars do |t|
      t.string :username
      t.string :avatar

      t.timestamps
    end

    add_index :user_avatars, :username, unique: true
  end
end

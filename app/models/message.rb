# frozen_string_literal: true

# == Schema Information
#
# Table name: messages
#
#  id         :integer          not null, primary key
#  username   :string
#  body       :text
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class Message < ApplicationRecord
  scope :recent, -> { Message.order('created_at DESC').limit(100) }

  validates :username, length: { maximum: 20 }, allow_nil: true
  validates :body, presence: true, length: { maximum: 2000 }

  before_create :set_username
  after_create :create_user

  after_create_commit lambda {
    broadcast_append_to 'messages'
    ActionCable.server.broadcast('message_channel', {})
  }

  def avatar
    UserAvatar.find_by(username:).avatar
  end

  private

  def set_username
    self.username = 'Anonymous' unless username?
  end

  def create_user
    user = UserAvatar.find_by(username:)
    return if user

    UserAvatar.create(username:, avatar: FFaker::Avatar.image)
  end
end

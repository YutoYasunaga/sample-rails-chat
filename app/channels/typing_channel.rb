# frozen_string_literal: true

class TypingChannel < ApplicationCable::Channel
  def subscribed
    stream_from 'typing_channel'
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end

  def typing(data)
    active = data['active']
    if active
      username = data['username'].presence || 'Anonymous'
      user_id = data['user_id']
      ActionCable.server.broadcast('typing_channel', { active:, message: "#{username} is typing...", user_id: })
    else
      ActionCable.server.broadcast('typing_channel', { active: })
    end
  end
end

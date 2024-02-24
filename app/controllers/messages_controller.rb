# frozen_string_literal: true

class MessagesController < ApplicationController
  def index
    @messages = Message.recent.reverse
    @message = Message.new
  end

  def create
    @message = Message.new(message_params)
    return if @message.save

    flash.now[:alert] = @message.errors.full_messages.join("\n")
    render turbo_stream: turbo_stream.replace('flash', partial: 'partials/flash_message'), status: :bad_request
  end

  private

  def message_params
    params.require(:message).permit(:username, :body)
  end
end

import consumer from "./consumer"

const typingChannel = consumer.subscriptions.create("TypingChannel", {
  connected() {
  },

  disconnected() {
  },

  received(data) {
    const typing = document.getElementById('typing')
    const currentUserId = document.body.dataset.userId
    if (data.active) {
      if (data.user_id.toString() !== currentUserId) {
        typing.innerText = data.message
      }
    } else {
      typing.innerText = ''
    }
  },

  typing(data) {
    this.perform('typing', data)
  }
});

window.App ||= {}
App.typingChannel = typingChannel

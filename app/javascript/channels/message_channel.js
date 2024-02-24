import consumer from "./consumer"

consumer.subscriptions.create("MessageChannel", {
  connected() {
  },

  disconnected() {
    // Called when the subscription has been terminated by the server
  },

  received() {
    scrollToBottom()
  },
});

const scrollToBottom = () => {
  const messagesBox = document.getElementById('messages')
  setTimeout(() => {
    messagesBox.scrollTop = messagesBox.scrollHeight;
  }, 100)
}

document.addEventListener('turbo:load', () => {
  scrollToBottom()
})

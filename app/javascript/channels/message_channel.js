import consumer from "./consumer"

consumer.subscriptions.create("MessageChannel", {
  connected() {
    // Called when the subscription is ready for use on the server
    document.addEventListener('turbo:load', () => {
      this.scrollToBottom()
    })
  },

  disconnected() {
    // Called when the subscription has been terminated by the server
  },

  received() {
    this.scrollToBottom()
  },

  scrollToBottom() {
    const messagesBox = document.getElementById('messages')
    setTimeout(() => {
      messagesBox.scrollTop = messagesBox.scrollHeight;
    }, 100)
  }
});

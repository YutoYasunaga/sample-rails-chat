import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  initialize() {
    this.isTyping = false
    this.typingTimer = null
    this.doneTypingInterval = 3000
  }

  connect() {
    // Directly attach event listener to the body input by ID
    const bodyField = document.getElementById('message_body');
    bodyField.addEventListener('input', () => this.userTyping());

    // Listen for beforeunload if needed
    window.addEventListener('beforeunload', () => this.doneTyping());
  }

  resetForm(event) {
    if (event.detail.success) {
      const bodyField = document.getElementById('message_body');
      bodyField.value = '';
    }
  }

  userTyping() {
    if (!this.isTyping) {
      const usernameField = document.getElementById('message_username');
      const currentUserId = document.body.dataset.userId;
      App.typingChannel.perform('typing', { active: true, username: usernameField.value, user_id: currentUserId });
      this.isTyping = true;
    }

    clearTimeout(this.typingTimer);
    this.typingTimer = setTimeout(() => this.doneTyping(), this.doneTypingInterval);
  }

  doneTyping() {
    if (this.isTyping) {
      App.typingChannel.perform('typing', { active: false });
      this.isTyping = false;
    }
  }
}

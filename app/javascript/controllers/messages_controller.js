import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  connect() {
  }

  disconnect() {
  }

  resetForm(event) {
    if (event.detail.success) {
      this.element.querySelector('textarea').value = ''
    }
  }
}

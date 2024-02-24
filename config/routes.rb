# frozen_string_literal: true

Rails.application.routes.draw do
  root to: 'messages#index'

  get 'up' => 'rails/health#show', as: :rails_health_check

  resources :messages, only: %i[index create]
end

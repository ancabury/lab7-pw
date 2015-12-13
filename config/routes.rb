Rails.application.routes.draw do
  root to: 'home#index'
  get 'next', to: 'home#next_move'
end

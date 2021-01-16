Rails.application.routes.draw do
  concern :authrouting do
  devise_for :users, controllers: {
      registrations: 'registrations',
      sessions: 'sessions',
      passwords: 'passwords',
      confirmations: 'confirmations',
      unlocks: 'unlocks'
    }
  end
  scope :api, defaults: { format: 'json' } do
    concerns :authrouting
  end
  resources :grid
  root 'api/v1/main#index', as: :home_path
  get '*path', to: 'api/v1/main#index'
  # get '/users/sign_in', to: 'api/v1/main#index'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end

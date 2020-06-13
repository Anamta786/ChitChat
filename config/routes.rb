Rails.application.routes.draw do
  devise_for :users
  root 'api/v1/main#index'
  get '*path', to: 'api/v1/main#index'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end

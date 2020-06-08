Rails.application.routes.draw do
  post '/register', to: 'users#register'
  post '/login', to: 'users#login'
  # resource :users do
  #   post :register
  # end
  root :to => "hello_world#index"
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end

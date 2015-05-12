Rails.application.routes.draw do
  devise_for :users

  root 'welcome#home'

  resources :welcome
  resources :activities
  resources :locations
  resources :users

  get '/search', to: 'welcome#search'

end

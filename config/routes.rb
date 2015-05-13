Rails.application.routes.draw do
  devise_for :users

  root 'welcome#home'

  resources :welcome
  resources :activities
  resources :locations

  get '/search', to: 'welcome#search'

end

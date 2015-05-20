Rails.application.routes.draw do
  devise_for :users

  root 'welcome#home'

# so the use case for resources is when the argument is an entity in your database
# activities and locations would be resources but welcome would not be one
# additionaly devise will handle the resource for users, you don't need the users unless you plan on having user be a resource in your application, IE crud functionality for users
  resources :welcome
  resources :activities
  resources :locations
  resources :users

  get '/search', to: 'welcome#search'

end

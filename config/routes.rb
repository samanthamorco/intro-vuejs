Rails.application.routes.draw do
  root to: "tasks#index"

  resources :tasks, only: :index

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  namespace :api do
    namespace :v1 do
      get "/tasks", to: 'tasks#index'
      post "/tasks", to: 'tasks#create'
    end
  end
end

Rails.application.routes.draw do
  root to: "pages#index"

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  namespace :api do
    namespace :v1 do
      get "/tasks", to: 'tasks#index'
    end
  end
end

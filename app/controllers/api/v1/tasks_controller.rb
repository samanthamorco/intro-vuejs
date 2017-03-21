class Api::V1::TasksController < ApplicationController
  def index
    @tasks = Task.all
    render "index.json.jbuilder"
  end

  def create
    @task = Task.new(name: params[:name], description: params[:description], complete: false)
    if @task.save
      render 'show.json.jbuilder'
    else
      render json: { errors: @task.errors.full_messages }, status: 422
    end
  end
end

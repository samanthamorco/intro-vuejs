class Api::V1::TasksController < ApplicationController
  def index
    @tasks = Task.all
    render "index.json.jbuilder"
  end

  def create
    @task = Task.new(name: params[:name], description: params[:description], complete: false)
    @task.save
    render 'show.json.jbuilder'
  end
end

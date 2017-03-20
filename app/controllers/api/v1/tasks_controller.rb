class Api::V1::TasksController < ApplicationController
  def index
    @tasks = Task.all
    render "index.json.jbuilder"
  end
end

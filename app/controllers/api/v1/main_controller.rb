class Api::V1::MainController < ApplicationController
  layout "main"

  def index
    @start_props = { name: "IslioChat" }
    render 'layouts/index'
  end
end

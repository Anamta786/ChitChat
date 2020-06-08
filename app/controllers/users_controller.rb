class UsersController < ApplicationController
  skip_before_action :verify_authenticity_token
  def register
    p params
    p '++++++++++++++++++++++++++++==='
  end
  def login
    p params
    p '>>>>>>>>>>>>>>>>>>>>>>'
  end
end

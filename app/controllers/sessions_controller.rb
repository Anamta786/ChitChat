class SessionsController < Devise::SessionsController
after_action :set_csrf_headers, only: [:create, :destroy]
respond_to :json
  def create
    # # super
    # resource = warden.authenticate!(auth_options)
    # if resource
    #   # sign_in(resource_name, resource)
    #   respond_with resource, json: { code: 200, message: 'created' }
    # else
    #   respond_with resource, json: { code: 404, message: 'Not found' }
    # end
    p user_signed_in?
    p user_session
    p current_user
    @user = User.find_by(email:params["user"]["email"])
      if @user && @user.valid_password?(params["user"]["password"])
          # @user.skip_confirmation!
            flash[:notice] = 'Signed successfully'
             sign_in(:user, @user)
             render json: {code: 200, currentUser: @user}
      else
              flash[:error] = "Invalid Password."
              render json: {code: 404, currentUser: 'User Not Found'}
      end
  end

  protected

  def set_csrf_headers
    if request.format.json?
      response.headers['X-CSRF-Param'] = request_forgery_protection_token
      response.headers['X-CSRF-Token'] = form_authenticity_token
    end
  end

end

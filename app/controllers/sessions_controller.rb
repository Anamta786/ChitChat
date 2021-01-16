# sessions controller
class SessionsController < Devise::SessionsController
  skip_before_action :verify_authenticity_token
  def create
    @user = User.find_by(email: params['user']['email'])
    if @user&.valid_password?(params['user']['password'])
      flash[:notice] = 'Signed successfully'
      sign_in(:user, @user)
      render json: { code: 200, currentUser: @user }
    else
      flash[:error] = 'Invalid Password.'
      render json: { code: 404, currentUser: 'User Not Found' }
    end
  end
end

class RegistrationsController < Devise::RegistrationsController
  def create
    p '========================'
    p params
    build_resource(sign_up_params)
    p resource
    resource.save!
    yield resource if block_given?
    if resource.persisted?
      render json: { code: 200, message: 'created' }
    else
      clean_up_passwords resource
      render json: { code: 401, message: 'unauthorized' }
    end
  end

  protected

  def sign_up_params
    params.require(:registration).permit(:email, :password)
  end

end

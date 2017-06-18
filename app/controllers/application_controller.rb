class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  # protect_from_forgery with: :null_session
	skip_before_action :verify_authenticity_token
	before_action :add_allow_credentials_headers
	def add_allow_credentials_headers
		puts "Origin: #{request.headers['Origin']}, Method: #{request.headers['Access-Control-Request-Method']}"
	    response.headers['Access-Control-Allow-Origin'] = request.headers['Origin'] || '*'   
	    # response.headers['Access-Control-Allow-Credentials'] = 'true'
	    response.headers['Access-Control-Allow-Methods'] = 'POST, GET, PUT, DELETE, OPTIONS'
	end 

end

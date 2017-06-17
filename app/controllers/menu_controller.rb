class MenuController < ApplicationController
	def index
		@menu = Menu.all
    	render json: @menu
	end

end

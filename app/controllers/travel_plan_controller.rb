class TravelPlanController < ApplicationController
  # before_action :check_params
  def index
    @travel = Travel.all
    render json: @travel
  end

  def new
    @travel = Travel.new
    reder json: { status: 200, created:true}
  end

  def show
    @travel = Travel.where({"loc": params[:loc]})

    render json: { status: 200, travel: @travel}
  end
  def create
    raise params.inspect
    params.each do |value|
      puts "request params #{value}"
    end
    @travel = Travel.new(travel_params)

    if @travel.save
      # redirect_to travel_path, notice: "Note created" and return
      render  json: { status: 200, travel: @travel}
    end
    # render 'new'
  end

  def edit
    @travel = Travel.find(params[:id])
  end

  def update
    @travel = Travel.find(params[:id])

    if @travel.update_attributes(travel_params)
      redirect_to travel_path, notice: "#{loc} #{country} has been updated" and return
    end
    render json: { status: 200, travel: @travel}
  end

  def destroy
    @travel = Travel.find(params[:id])
    @travel.destroy

    # redirect_to travel_path, notice: "#{loc} #{country} has been deleted" and return
    render json: { status: 200, deleted:true}
  end
private
  def travel_params
    params.require(:travel).permit(:country, :loc, :date_time, :note)
  end
end

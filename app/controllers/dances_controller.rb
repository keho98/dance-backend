class DancesController < ApplicationController
  skip_before_filter :authenticate_user!, :only => [:show, :get_data, :print]
  protect_from_forgery :except => :sync
  # GET /dances
  # GET /dances.json
  def index
    @dances = current_user.dances

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @dances }
    end
  end

  # GET /dances/1
  # GET /dances/1.json
  def show
    @dance = Dance.find(params[:id])
    @editable = current_user and current_user.dances.exists?(@dance) 
    render :layout => 'dance_layout'
  end

  # GET /dances/new
  # GET /dances/new.json
  def new
    @dance = Dance.new

    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @dance }
    end
  end

  # GET /dances/1/edit
  def edit
    @dance = Dance.find(params[:id])
  end

  # POST /dances
  # POST /dances.json
  def create
    @dance = Dance.new(params[:dance])
    @dance.user = current_user
    respond_to do |format|
      if @dance.save
        format.html { redirect_to @dance, notice: 'Dance was successfully created.' }
        format.json { render json: @dance, status: :created, location: @dance }
      else
        format.html { render action: "new" }
        format.json { render json: @dance.errors, status: :unprocessable_entity }
      end
    end
  end

  # PUT /dances/1
  # PUT /dances/1.json
  def update
    @dance = Dance.find(params[:id])

    respond_to do |format|
      if @dance.update_attributes(params[:dance])
        format.html { redirect_to @dance, notice: 'Dance was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: "edit" }
        format.json { render json: @dance.errors, status: :unprocessable_entity }
      end
    end
  end

  # POST /dances/1/sync
  def sync
    @dance = Dance.find(params[:id])
    data = params[:data]
    if @dance.sync data
      render :nothing => true
    else
      render json: 'Syncing error', status: :unprocessable_entity
    end
  end

  # GET /dances/1/get_data
  def get_data
    @dance = Dance.find(params[:id])
    data = @dance.get_data
    render :json => data, :status => :ok
  end

  # DELETE /dances/1
  # DELETE /dances/1.json
  def destroy
    @dance = Dance.find(params[:id])
    @dance.destroy

    respond_to do |format|
      format.html { redirect_to dances_url }
      format.json { head :no_content }
    end
  end

  # GET /dances/1/print
  def print
    @dance = Dance.find(params[:id])
    @data = @dance.get_data
    render :layout => 'print_layout'
  end
  
end
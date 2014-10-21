class WebsiteController < ApplicationController
  skip_before_filter :authenticate_user!, :only => [:landing]
  
  def landing
  	render :layout => 'website_layout'
  end
end

class UsersController < ApplicationController

  before_action :authenticate_user!

  def index
  end

# so the idea here is the resource being accessed here is locations
# this sort of logic should be placed in the locations controller, you can
# still query based on current_user though!
  def show
    @locations = current_user.locations

    respond_to do |format|
      format.html { render :index }
      # whats the usecase for rendering json here, additionally what is @cards? I think its undefined in this method
      format.json { render :json => @cards }
    end
  end

# what are the plans for these methods below?
  def location
  end

# why is there a second show method definition?
  def show
  end

end

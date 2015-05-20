class Activity < ActiveRecord::Base
  belongs_to :location
  # i see that you have an activities model, but what does it do for your app, or what is it going to do for your app going forward?
end

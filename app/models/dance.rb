class Dance < ActiveRecord::Base
  attr_accessible :foreign_id, :title
  belongs_to :user
end

class Dance < ActiveRecord::Base
  attr_accessible :foreign_id, :title
  belongs_to :user

  def sync data

  end

  def get_data

  end
end

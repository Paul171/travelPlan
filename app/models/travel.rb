class Travel
  include Mongoid::Document ##use Mongoid and interact with MongoDB
  include Mongoid::Timestamps
  field :travel_id, type: Integer
  field :country, type: String
  field :loc, type: String
  field :date_time, type: DateTime
  field :note, type: String
  index({ travel_id: 1 }, { unique: true, name: "travel_index" })
  def self.search(q)
    Travel.where({ :$text => { :$search => q, :$language => "none" } })
  end
end

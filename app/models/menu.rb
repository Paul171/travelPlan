class Menu
  class << self
	  def [](menu_id)
	  	redis.lindex(hash, menu_id)
	  end
	  def []=(name)
	  	redis.rpush(hash, name)
	  end
	  def destroy
	  	redis.del(hash)
	  end
	  def all
	  	redis.lrange(hash, 0, -1)
	  end
	  private 
	  	def redis
	  		$redis
	  	end
	  	def hash
	  		"menu"
	  	end
  end
end

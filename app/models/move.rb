class Move < ActiveRecord::Base
    validates_presence_of :line, :column, :character
end

# frozen_string_literal: true

# == Schema Information
#
# Table name: user_avatars
#
#  id         :integer          not null, primary key
#  username   :string
#  avatar     :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class UserAvatar < ApplicationRecord
end

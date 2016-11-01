# == Schema Information
#
# Table name: users
#
#  id              :integer          not null, primary key
#  username        :string           not null
#  session_token   :string           not null
#  password_digest :string           not null
#  administrator   :boolean          default(FALSE), not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#

require 'faker'

FactoryGirl.define do
  factory :user do |user|
    user.username { Faker::Internet.user_name }
    user.password { Faker::Internet.password(8) }
  end

  factory :admin_user do |admin|
    admin.username { Faker::Internet.user_name }
    admin.password { Faker::Internet.password(8) }
    admin.administrator true
  end
end

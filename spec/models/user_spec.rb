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

require 'spec_helper'

describe User, '.admin?' do

  subject(:admin_user) do
    FactoryGirl.build(:user,
    username: "bill",
    password: "great_password",
    administrator: true)
  end

  it 'returns true for admin user' do
    expect(admin_user.admin?).to be true
  end
end

describe User do
  subject(:user) do
    FactoryGirl.build(:user,
      username: "yangster",
      password: "good_password")
  end

  it { should validate_presence_of(:username) }
  it { should validate_presence_of(:session_token) }
  it { should validate_presence_of(:password_digest) }
  it { should validate_length_of(:password).is_at_least(8) }

  it { should have_many(:responses) }
  it "creates a password digest when a password is given" do
    expect(user.password_digest).to_not be_nil
  end

  it "creates a session token before validation" do
    user.valid?
    expect(user.session_token).to_not be_nil
  end

  describe "#reset_session_token!" do
    it "sets a new session token on the user" do
      user.valid?
      old_session_token = user.session_token
      user.reset_session_token!

      expect(user.session_token).to_not eq(old_session_token)
    end

    it "returns the new session token" do
      expect(user.reset_session_token!).to eq(user.session_token)
    end
  end

  describe "#matches_password?" do
    it "verifies a password is correct" do
      expect(user.matches_password?("good_password")).to be true
    end

    it "verifies a password is not correct" do
      expect(user.matches_password?("bad_password")).to be false
    end
  end

  describe ".find_by_credentials" do
    before { user.save! }

    it "returns user given good credentials" do
      expect(User.find_by_credentials("yangster", "good_password")).to eq(user)
    end

    it "returns nil given bad credentials" do
      expect(User.find_by_credentials("yangster", "bad_password")).to eq(nil)
    end
  end

end

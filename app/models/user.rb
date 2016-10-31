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

class User < ActiveRecord::Base
  has_many(
    :questionnaires,
    foreign_key: :author_id,
    dependent: :destroy
  )

  has_many(
    :responses,
    dependent: :destroy
  )

  attr_reader :password

  validates :username, :session_token, :password_digest, presence: true
  validates :username, :session_token, uniqueness: true
  validates :password, length: { minimum: 8, allow_nil: true }

  after_initialize :ensure_session_token

  def self.find_by_credentials(username, password)
    user = User.find_by(username: username)

    if user && user.matches_password?(password)
      return user
    end
    nil
  end

  def admin?
    self.administrator
  end

  def generate_session_token
    session_token = SecureRandom.urlsafe_base64(16)
    while User.find_by(session_token: session_token)
      session_token = SecureRandom.urlsafe_base64(16)
    end
    return session_token
  end

  def reset_session_token!
    self.session_token = generate_session_token
    self.save!
    self.session_token
  end

  def matches_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def ensure_session_token
    self.session_token = generate_session_token
  end
end

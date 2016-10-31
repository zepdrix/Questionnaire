require 'test_helper'

class UsersControllerTest < ActionController::TestCase
  # test "the truth" do
  #   assert true
  # end

  test "show action should render show" do
    get :show
    assert_response :success
  end

  test "renders the show template" do
      get :show
      expect(response).to render_template("show")
  end
end

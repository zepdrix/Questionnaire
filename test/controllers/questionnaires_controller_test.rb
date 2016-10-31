require 'test_helper'

class QuestionnairesControllerTest < ActionController::TestCase
  # test "the truth" do
  #   assert true
  # end
  test "index action should render index" do
    get :index
    assert_response :success
  end

  test "renders the index template" do
      get :index
      expect(response).to render_template("index")
  end
end

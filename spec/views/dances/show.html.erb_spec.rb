require 'spec_helper'

describe "dances/show" do
  before(:each) do
    @dance = assign(:dance, stub_model(Dance,
      :title => "Title",
      :foreign_id => "Foreign"
    ))
  end

  it "renders attributes in <p>" do
    render
    # Run the generator again with the --webrat flag if you want to use webrat matchers
    rendered.should match(/Title/)
    rendered.should match(/Foreign/)
  end
end

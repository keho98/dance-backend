require 'spec_helper'

describe "dances/index" do
  before(:each) do
    assign(:dances, [
      stub_model(Dance,
        :title => "Title",
        :foreign_id => "Foreign"
      ),
      stub_model(Dance,
        :title => "Title",
        :foreign_id => "Foreign"
      )
    ])
  end

  it "renders a list of dances" do
    render
    # Run the generator again with the --webrat flag if you want to use webrat matchers
    assert_select "tr>td", :text => "Title".to_s, :count => 2
    assert_select "tr>td", :text => "Foreign".to_s, :count => 2
  end
end

require 'spec_helper'

describe "dances/new" do
  before(:each) do
    assign(:dance, stub_model(Dance,
      :title => "MyString",
      :foreign_id => "MyString"
    ).as_new_record)
  end

  it "renders new dance form" do
    render

    # Run the generator again with the --webrat flag if you want to use webrat matchers
    assert_select "form", :action => dances_path, :method => "post" do
      assert_select "input#dance_title", :name => "dance[title]"
      assert_select "input#dance_foreign_id", :name => "dance[foreign_id]"
    end
  end
end

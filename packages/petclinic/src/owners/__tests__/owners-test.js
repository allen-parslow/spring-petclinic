jest.mock('i18n-lite');

import {OwnerSearchComponent} from'../owners';

import React from "react";
import { shallow } from 'enzyme';

describe('Owner Search Component', () => {  
  const props = {
    searchTextChanged: jest.fn(),
    submitSearch: jest.fn(),
    search: { searchText: "Jones" }
  };

  it('Should render component', () => {
    const wrapper = shallow(<OwnerSearchComponent {...props}/>);

    expect(wrapper.find('button').text()).toBe("Find Owner");
  });  

  it('Should save search text when leaving the search field', () => {
    const wrapper = shallow(<OwnerSearchComponent {...props}/>);

    const searchField = wrapper.find('input');

    searchField.simulate('blur', {"target": {"value": "New Search Text"}});
    expect(props.searchTextChanged).toBeCalledWith("New Search Text");
  });  

  it('Should submit search with search text', () => {
    const wrapper = shallow(<OwnerSearchComponent {...props}/>);

    const searchButton = wrapper.find('button');

    searchButton.simulate('click');
    expect(props.submitSearch).toBeCalledWith('Jones');
  });  
});
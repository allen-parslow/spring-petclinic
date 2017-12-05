jest.mock('i18n-lite');

import {MessagesComponent} from'../index';

import React from "react";
import { shallow } from 'enzyme';

describe('Messages Component', () => {  
  let props = null;

  beforeEach(() => {
    props = {
      msg: { error: true, text: "Doh!" }
    };
  });

  it('Should render component when there is an error', () => {
    const wrapper = shallow(<MessagesComponent {...props}/>);

    expect(wrapper.text()).toBe(" Doh!");
  }); 

  it('Should NOT render component when no error', () => {
    props.msg = {};
    
    const wrapper = shallow(<MessagesComponent {...props}/>);

    expect(wrapper.text()).toBe("");
  }); 
});
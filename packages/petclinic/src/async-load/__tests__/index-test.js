jest.mock("i18n-lite");

import LoadAsync from "../index";

import React, {Children} from "react";
import {shallow} from "enzyme";

const shallowComponent = (props) => shallow(<LoadAsync {...props}>
    <div className="children">Some Children</div>
</LoadAsync>);

describe("LoadAsync Component", () => {
    let props = null;

    beforeEach(() => {
        props = {
            load: jest.fn()
        };
    });

    it("Should render loading animation and invoke load callback when not loaded and not pending", () => {
        const wrapper = shallowComponent(props);

        //console.log(wrapper.debug());
        expect(wrapper.find(".children").length).toBe(0);
        expect(wrapper.find("img").length).toBe(1);
        expect(props.load).toBeCalled();
    });

    it("Should render loading animation when pending load", () => {
        props.pending = true;
        const wrapper = shallowComponent(props);

        //console.log(wrapper.debug());
        expect(wrapper.find(".children").length).toBe(0);
        expect(wrapper.find("img").length).toBe(1);
        expect(props.load.mock.calls.length).toBe(0);
    });

    it("Should render results when fully loaded", () => {
        props.result = {value: true};
        const wrapper = shallowComponent(props);

        //console.log(wrapper.debug());
        expect(wrapper.find(".children").text()).toBe("Some Children");
        expect(wrapper.find("img").length).toBe(0);
        expect(props.load.mock.calls.length).toBe(0);
    });

    it("Should render nothing when there is an error", () => {
        props.error = true;
        const wrapper = shallowComponent(props);

        //console.log(wrapper.debug());
        expect(wrapper.find(".children").length).toBe(0);
        expect(wrapper.find("img").length).toBe(0);
        expect(props.load.mock.calls.length).toBe(0);
    });
});
import {combineActions} from "../index";
import {spy} from "sinon";

describe("combine actions", () => {

    it("should create a reducer map function", () => {
        var aSpy = spy();
        var bSpy = spy();
        var reducer = combineActions({a: aSpy}, {b: bSpy});

        var state = reducer({result: 'found'}, {type: "a", payload: 'yes'});

        expect(aSpy.called).toBe(true);
        expect(bSpy.called).toBe(false);
        expect(aSpy.getCall(0).args[0]).toEqual({result: 'found'});
        expect(aSpy.getCall(0).args[1].payload).toBe('yes');
    });

    it("should create a reducer map function with array", () => {
        var aSpy = spy();
        var bSpy = spy();
        var reducer = combineActions(...[{a: aSpy}, {b: bSpy}]);

        var state = reducer({result: 'found'}, {type: "a", payload: 'yes'});

        expect(aSpy.called).toBe(true);
        expect(bSpy.called).toBe(false);
        expect(aSpy.getCall(0).args[0]).toEqual({result: 'found'});
        expect(aSpy.getCall(0).args[1].payload).toBe('yes');
    });

    it("reducer map function should return passed state when no match function ", () => {
        var aSpy = spy();
        var reducer = combineActions({a: aSpy});

        var state = reducer({result: 'found'}, {type: "c", payload: 'yes'});

        expect(aSpy.called).toBe(false);
        expect(state).toEqual({result: 'found'});
    });
});
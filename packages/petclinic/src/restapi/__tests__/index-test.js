import {createFetchActions} from "../index";

describe("Rest api", () => {

    describe("fetch actions", () => {
        const actions = createFetchActions("SOMETHING");

        it("should create function set state to pending", () => {
            var key = "SOMETHING_PENDING";
            var result = actions[key]({result: {text:'yes'}, error: true}, {type: key});
            expect(result.pending).toBe(true);
            expect(result.error).toBe(false);
            expect(result.result).toBe(null);
        });

        it("should create function set state to success", () => {
            var key = "SOMETHING_SUCCESS";
            var result = actions[key]( {result: {text:'nope'}, error: true}, {type: key, payload: {text:'yes'}});
            expect(result.pending).toBe(false);
            expect(result.error).toBe(false);
            expect(result.result.text).toBe('yes');
        });

        it("should create function set state to error", () => {
            var key = "ERROR__API";
            var result = actions[key]({result: {text:'yes'}, error: true}, {type: key});
            expect(result.pending).toBe(false);
            expect(result.error).toBe(true);
            expect(result.result).toBe(null);
        });
    });
});
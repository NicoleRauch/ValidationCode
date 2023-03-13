import * as t from "io-ts";

import {validationFailed, validationSuccessful} from "../helpers";

describe.skip("Step 1 - Constants and Variables", () => {

    describe("Step 1.1 - Fixed String", () => {

        const Codec1_1 = t.void;

        it("parses the expected string", () => {
            validationSuccessful(Codec1_1)("ABCD");
        });

        it("does not parse a shorter string", () => {
            validationFailed(Codec1_1)("ABC");
        });
        it("does not parse a longer string", () => {
            validationFailed(Codec1_1)("ABCDE");
        });
        it("does not parse a different string", () => {
            validationFailed(Codec1_1)("UVWX");
        });
    });

    describe("Step 1.2 - Fixed Number", () => {

        const Codec1_2 = t.void;

        it("parses the expected number", () => {
            validationSuccessful(Codec1_2)(777);
        });

        it("does not parse a different number", () => {
            validationFailed(Codec1_2)(456);
        });
    });

    describe("Step 1.3 - String Variable", () => {

        const Codec1_3 = t.void;

        it("parses various strings", () => {
            validationSuccessful(Codec1_3)("ABCD");
            validationSuccessful(Codec1_3)("Hello");
            validationSuccessful(Codec1_3)("A beautiful string");
        });

        it("does not parse a number", () => {
            validationFailed(Codec1_3)(123);
        });
        it("does not parse null", () => {
            validationFailed(Codec1_3)(null);
        });
        it("does not parse an object", () => {
            validationFailed(Codec1_3)({name: "Hello"});
        });
    });

    describe("Step 1.4 - Number Variable", () => {

        const Codec1_4 = t.void;

        it("parses various numbers", () => {
            validationSuccessful(Codec1_4)(1234);
            validationSuccessful(Codec1_4)(777);
            validationSuccessful(Codec1_4)(445566);
        });

        it("does not parse a string", () => {
            validationFailed(Codec1_4)("1234");
        });
        it("does not parse null", () => {
            validationFailed(Codec1_4)(null);
        });
        it("does not parse an object", () => {
            validationFailed(Codec1_4)({name: "Hello"});
        });
    });
});

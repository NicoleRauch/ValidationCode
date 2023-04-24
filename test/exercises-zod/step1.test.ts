import * as Z from "zod";

import {zodValidationFailed, zodValidationSuccessful} from "../helpers-zod";

it("has dummy test to avoid test failure", () => {
    expect(1).toEqual(1);
});

describe.skip("Step 1 - Constants and Variables", () => {

    describe("Step 1.1 - Fixed String", () => {

        const Codec1_1 = Z.void();
        
        it("parses the expected string", () => {
            zodValidationSuccessful(Codec1_1)("ABCD");
        });

        it("does not parse a shorter string", () => {
            zodValidationFailed(Codec1_1)("ABC");
        });
        it("does not parse a longer string", () => {
            zodValidationFailed(Codec1_1)("ABCDE");
        });
        it("does not parse a different string", () => {
            zodValidationFailed(Codec1_1)("UVWX");
        });
    });

    describe("Step 1.2 - Fixed Number", () => {

        const Codec1_2 = Z.void();

        it("parses the expected number", () => {
            zodValidationSuccessful(Codec1_2)(777);
        });

        it("does not parse a different number", () => {
            zodValidationFailed(Codec1_2)(456);
        });
    });

    describe("Step 1.3 - String Variable", () => {

        const Codec1_3 = Z.void();

        it("parses various strings", () => {
            zodValidationSuccessful(Codec1_3)("ABCD");
            zodValidationSuccessful(Codec1_3)("Hello");
            zodValidationSuccessful(Codec1_3)("A beautiful string");
        });

        it("does not parse a number", () => {
            zodValidationFailed(Codec1_3)(123);
        });
        it("does not parse null", () => {
            zodValidationFailed(Codec1_3)(null);
        });
        it("does not parse an object", () => {
            zodValidationFailed(Codec1_3)({name: "Hello"});
        });
    });

    describe("Step 1.4 - Number Variable", () => {

        const Codec1_4 = Z.void();

        it("parses various numbers", () => {
            zodValidationSuccessful(Codec1_4)(1234);
            zodValidationSuccessful(Codec1_4)(777);
            zodValidationSuccessful(Codec1_4)(445566);
        });

        it("does not parse a string", () => {
            zodValidationFailed(Codec1_4)("1234");
        });
        it("does not parse null", () => {
            zodValidationFailed(Codec1_4)(null);
        });
        it("does not parse an object", () => {
            zodValidationFailed(Codec1_4)({name: "Hello"});
        });
    });
});

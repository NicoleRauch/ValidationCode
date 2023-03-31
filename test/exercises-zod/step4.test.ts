import * as Z from "zod";
import {zodValidationFailed, zodValidationSuccessful, zodValidationSuccessfulResultingIn} from "../helpers-zod";


describe.skip("Step 4 - Union and Intersection", () => {
    describe("Step 4.1 - Union Types", () => {
        const Codec4_1 = Z.void();

        it("accepts each part of the union", () => {
            zodValidationSuccessful(Codec4_1)("ABC");
            zodValidationSuccessful(Codec4_1)(123);
        });

        it("rejects other types", () => {
            zodValidationFailed(Codec4_1)({a: "x"});
            zodValidationFailed(Codec4_1)({a: 5});
        });
    });

    describe("Step 4.2 - Intersection Types", () => {
        const Codec4_2 = Z.void();

        it("accepts objects that contain both parts", () => {
           zodValidationSuccessful(Codec4_2)({a: 7, b: "X"});
        });

        it("accepts objects that contain both parts and unknown entries - but strips fields", () => {
           zodValidationSuccessfulResultingIn(Codec4_2)({a: 7, b: "X", c: "ccc"}, {a: 7, b: "X"});
        });

        it("rejects objects that contain only one part", () => {
           zodValidationFailed(Codec4_2)({a: 111});
           zodValidationFailed(Codec4_2)({b: "ABC"});
        });

        it("rejects objects that contain one part and unknown entries", () => {
           zodValidationFailed(Codec4_2)({a: 111, c: "ccc"});
           zodValidationFailed(Codec4_2)({b: "ABC", c: "ccc"});
        });
    });
});

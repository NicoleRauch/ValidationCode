import * as z from "zod";
import {zodValidationFailed, zodValidationSuccessful, zodValidationSuccessfulResultingIn} from "../helpers-zod";


it("has dummy test to avoid test failure", () => {
  expect(1).toEqual(1);
});

describe.skip("Step 4 - Union and Intersection", () => {
    describe("Step 4.1 - Union Types", () => {
        const Codec4_1 = z.void();

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
        const Codec4_2A = z.object({a: z.number()});
        const Codec4_2B = z.object({b: z.string()});
        const Codec4_2 = z.void(); // zur Lösung Codec4_2A und Codec4_2B verwenden!

        it("accepts objects that contain both parts", () => {
           zodValidationSuccessful(Codec4_2)({a: 7, b: "X"});
        });

        it("accepts objects that contain both parts and unknown entries - but strips fields", () => {
           zodValidationSuccessfulResultingIn(Codec4_2)({a: 7, b: "X", c: "ccc"}, {a: 7, b: "X"});
        });

        it("rejects objects that contain only one part", () => {
           zodValidationSuccessful(Codec4_2A)({a: 111});
           zodValidationSuccessful(Codec4_2B)({b: "ABC"});

           zodValidationFailed(Codec4_2)({a: 111});
           zodValidationFailed(Codec4_2)({b: "ABC"});
        });

        it("rejects objects that contain one part and unknown entries", () => {
           zodValidationFailed(Codec4_2)({a: 111, c: "ccc"});
           zodValidationFailed(Codec4_2)({b: "ABC", c: "ccc"});
        });
    });
});

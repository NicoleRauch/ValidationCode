import * as t from "io-ts";
import {validationFailed, validationSuccessful} from "../helpers";


describe("Step 4 - Union and Intersection", () => {
    describe("Step 4.1 - Union Types", () => {
        const Codec4_1 = t.void;

        it("accepts each part of the union", () => {
            validationSuccessful(Codec4_1)("ABC");
            validationSuccessful(Codec4_1)(123);
        });

        it("rejects other types", () => {
            validationFailed(Codec4_1)({a: "x"});
            validationFailed(Codec4_1)({a: 5});
        });
    });

    describe("Step 4.2 - Intersection Types", () => {
        const Codec4_2 = t.void;

        it("accepts objects that contain both parts", () => {
           validationSuccessful(Codec4_2)({a: 7, b: "X"});
        });

        it("accepts objects that contain both parts and unknown entries", () => {
           validationSuccessful(Codec4_2)({a: 7, b: "X", c: "ccc"});
        });

        it("rejects objects that contain only one part", () => {
           validationFailed(Codec4_2)({a: 111});
           validationFailed(Codec4_2)({b: "ABC"});
        });

        it("rejects objects that contain one part and unknown entries", () => {
           validationFailed(Codec4_2)({a: 111, c: "ccc"});
           validationFailed(Codec4_2)({b: "ABC", c: "ccc"});
        });
    });
});

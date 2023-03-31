import * as Z from "zod";
import {zodValidationFailed, zodValidationSuccessful, zodValidationSuccessfulResultingIn} from "../helpers-zod";


describe.skip("Step 3 - Records and Types", () => {

    describe("Step 3.1 - Unknown Record", () => {
        const Codec3_1 = Z.void();

        it("accepts various records", () => {
            zodValidationSuccessful(Codec3_1)({});
            zodValidationSuccessful(Codec3_1)({"a": 123});
            zodValidationSuccessful(Codec3_1)({"b": "bbb"});
            zodValidationSuccessful(Codec3_1)({"c": {data: 5}});
            zodValidationSuccessful(Codec3_1)({"a": 123, "b": "bbb", "c": {data: 5}});
        });
        it("even accepts records with non-string keys - contrary to documentation", () => {
            const n: number = 7;
            const x: Record<number, string> = {[n]: "n"};
            zodValidationSuccessful(Codec3_1)(x);
        });
    });

    describe("Step 3.2 - Record", () => {
        const Codec3_2 = Z.void();
        it("accepts string-number records", () => {
            zodValidationSuccessful(Codec3_2)({});
            zodValidationSuccessful(Codec3_2)({"a": 123});
        });
        it("rejects records that don't match the string-number type", () => {
            zodValidationFailed(Codec3_2)({"b": "bbb"});
            zodValidationFailed(Codec3_2)({"c": {data: 5}});
            zodValidationFailed(Codec3_2)({"a": 123, "b": "bbb", "c": {data: 5}});
        });
        it("even accepts records with non-string keys - contrary to documentation", () => {
            const n: number = 7;
            const x: Record<number, number> = {[n]: 888};
            zodValidationSuccessful(Codec3_2)(x);
        });
    });

    describe("Step 3.3 - Type", () => {
        const Codec3_3 = Z.void();

        it("accepts objects with matching fields", () => {
            zodValidationSuccessful(Codec3_3)({a: 777, b: "Hello"});
            zodValidationSuccessful(Codec3_3)({a: 1.234, b: ""});
        });

        it("even accepts objects with excessive fields - but strips the field", () => {
            zodValidationSuccessfulResultingIn(Codec3_3)({a: 777, b: "Hello", also: "x", and: 123}, {a: 777, b: "Hello"});
        });

        it("does not accept objects with matching fields but wrong data", () => {
            zodValidationFailed(Codec3_3)({a: "Hello", b: 1})
        });

        it("does not accept objects with missing fields", () => {
            zodValidationFailed(Codec3_3)({a: 777});
            zodValidationFailed(Codec3_3)({b: "Hello"});
            zodValidationFailed(Codec3_3)({});
        });

        it("does not accept objects with different fields", () => {
            zodValidationFailed(Codec3_3)({x: "aaa"});
        });
    });

    describe("Step 3.4 - Partial Type", () => {
        const Codec3_4 = Z.void();

        it("accepts objects with matching fields", () => {
            zodValidationSuccessful(Codec3_4)({a: 777, b: "Hello"});
            zodValidationSuccessful(Codec3_4)({a: 1.234, b: ""});
        });

        it("even accepts objects with excessive fields - but strips the fields", () => {
            zodValidationSuccessfulResultingIn(Codec3_4)({a: 777, b: "Hello", also: "x", and: 123}, {a: 777, b: "Hello"});
        });

        it("also accepts objects with missing fields", () => {
            zodValidationSuccessful(Codec3_4)({a: 777});
            zodValidationSuccessful(Codec3_4)({b: "Hello"});
            zodValidationSuccessful(Codec3_4)({});
        });

        it("does not accept objects with matching fields but wrong data", () => {
            zodValidationFailed(Codec3_4)({a: "Hello", b: 1})
        });

        it("even accepts objects with different fields - but strips them", () => {
            zodValidationSuccessfulResultingIn(Codec3_4)({x: "aaa"}, {});
        });
    });

    describe("Step 3.5 - Strict Type", () => {
        const Codec3_5 = Z.void();

        it("accepts objects with matching fields", () => {
            zodValidationSuccessful(Codec3_5)({a: 777, b: "Hello"});
            zodValidationSuccessful(Codec3_5)({a: 1.234, b: ""});
        });

        it("accepts objects with excessive fields but drops them", () => {
            // !!! validationSuccessfulResultingIn(Codec3_5)({a: 777, b: "Hello", also: "x", and: 123}, {a: 777, b: "Hello"});
        });

        it("does not accept objects with missing fields", () => {
            zodValidationFailed(Codec3_5)({a: 777});
            zodValidationFailed(Codec3_5)({b: "Hello"});
            zodValidationFailed(Codec3_5)({});
        });

        it("does not accept objects with matching fields but wrong data", () => {
            zodValidationFailed(Codec3_5)({a: "Hello", b: 1})
        });

        it("does not accept objects with different fields", () => {
            zodValidationFailed(Codec3_5)({x: "aaa"});
        });
    });
});

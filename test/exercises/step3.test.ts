import * as t from "io-ts";
import {validationFailed, validationSuccessful, validationSuccessfulResultingIn} from "../helpers";


describe("Step 3 - Records and Types", () => {

    describe("Step 3.1 - Unknown Record", () => {
        const Codec3_1 = t.void;

        it("accepts various records", () => {
            validationSuccessful(Codec3_1)({});
            validationSuccessful(Codec3_1)({"a": 123});
            validationSuccessful(Codec3_1)({"b": "bbb"});
            validationSuccessful(Codec3_1)({"c": {data: 5}});
            validationSuccessful(Codec3_1)({"a": 123, "b": "bbb", "c": {data: 5}});
        });
        it("even accepts records with non-string keys - contrary to documentation", () => {
            const n: number = 7;
            const x: Record<number, string> = {[n]: "n"};
            validationSuccessful(Codec3_1)(x);
        });
    });

    describe("Step 3.2 - Record", () => {
        const Codec3_2 = t.void;
        it("accepts string-number records", () => {
            validationSuccessful(Codec3_2)({});
            validationSuccessful(Codec3_2)({"a": 123});
        });
        it("rejects records that don't match the string-number type", () => {
            validationFailed(Codec3_2)({"b": "bbb"});
            validationFailed(Codec3_2)({"c": {data: 5}});
            validationFailed(Codec3_2)({"a": 123, "b": "bbb", "c": {data: 5}});
        });
        it("even accepts records with non-string keys - contrary to documentation", () => {
            const n: number = 7;
            const x: Record<number, number> = {[n]: 888};
            validationSuccessful(Codec3_2)(x);
        });
    });

    describe("Step 3.3 - Type", () => {
        const Codec3_3 = t.void;

        it("accepts objects with matching fields", () => {
            validationSuccessful(Codec3_3)({a: 777, b: "Hello"});
            validationSuccessful(Codec3_3)({a: 1.234, b: ""});
        });

        it("even accepts objects with excessive fields", () => {
            validationSuccessful(Codec3_3)({a: 777, b: "Hello", also: "x", and: 123});
        });

        it("does not accept objects with matching fields but wrong data", () => {
            validationFailed(Codec3_3)({a: "Hello", b: 1})
        });

        it("does not accept objects with missing fields", () => {
            validationFailed(Codec3_3)({a: 777});
            validationFailed(Codec3_3)({b: "Hello"});
            validationFailed(Codec3_3)({});
        });

        it("does not accept objects with different fields", () => {
            validationFailed(Codec3_3)({x: "aaa"});
        });
    });

    describe("Step 3.4 - Partial Type", () => {
        const Codec3_4 = t.void;

        it("accepts objects with matching fields", () => {
            validationSuccessful(Codec3_4)({a: 777, b: "Hello"});
            validationSuccessful(Codec3_4)({a: 1.234, b: ""});
        });

        it("even accepts objects with excessive fields", () => {
            validationSuccessful(Codec3_4)({a: 777, b: "Hello", also: "x", and: 123});
        });

        it("also accepts objects with missing fields", () => {
            validationSuccessful(Codec3_4)({a: 777});
            validationSuccessful(Codec3_4)({b: "Hello"});
            validationSuccessful(Codec3_4)({});
        });

        it("does not accept objects with matching fields but wrong data", () => {
            validationFailed(Codec3_4)({a: "Hello", b: 1})
        });

        it("even accepts objects with different fields", () => {
            validationSuccessful(Codec3_4)({x: "aaa"});
        });
    });

    describe("Step 3.5 - Strict Type", () => {
        const Codec3_5 = t.void;

        it("accepts objects with matching fields", () => {
            validationSuccessful(Codec3_5)({a: 777, b: "Hello"});
            validationSuccessful(Codec3_5)({a: 1.234, b: ""});
        });

        it("accepts objects with excessive fields but drops them", () => {
            validationSuccessfulResultingIn(Codec3_5)({a: 777, b: "Hello", also: "x", and: 123}, {a: 777, b: "Hello"});
        });

        it("does not accept objects with missing fields", () => {
            validationFailed(Codec3_5)({a: 777});
            validationFailed(Codec3_5)({b: "Hello"});
            validationFailed(Codec3_5)({});
        });

        it("does not accept objects with matching fields but wrong data", () => {
            validationFailed(Codec3_5)({a: "Hello", b: 1})
        });

        it("does not accept objects with different fields", () => {
            validationFailed(Codec3_5)({x: "aaa"});
        });
    });
});

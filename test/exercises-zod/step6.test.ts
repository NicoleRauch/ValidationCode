import * as z from "zod";
import {zodValidationFailed, zodValidationSuccessful} from "../helpers-zod";


it("has dummy test to avoid test failure", () => {
    expect(1).toEqual(1);
});

describe.skip("Step 6 - Putting it all together", () => {
    describe("Step 6.1", () => {
        const Codec6_1 = z.void();

        it("allows and disallows various elements", () => {
            zodValidationSuccessful(Codec6_1)({a: "ABC"});
            zodValidationSuccessful(Codec6_1)({a: "DEF"});
            zodValidationSuccessful(Codec6_1)({a: 123});

            zodValidationFailed(Codec6_1)({a: 456});
        });
    });

    describe("Step 6.2", () => {
        const Codec6_2 = z.void();

        it("allows and disallows various elements", () => {
            zodValidationSuccessful(Codec6_2)({a: "abc"});
            zodValidationSuccessful(Codec6_2)({a: "def", b: "nnn"});

            zodValidationFailed(Codec6_2)({b: "hhh"});
        });
    });

    describe("Step 6.3", () => {
        const Codec6_3 = z.void();

        it("allows and disallows various elements", () => {
            zodValidationSuccessful(Codec6_3)({a: "AA", b: "B", version: "1.0"});
            zodValidationSuccessful(Codec6_3)({a: "AB", c: "C", version: "2.0"});

            zodValidationFailed(Codec6_3)({a: "A"});
            zodValidationFailed(Codec6_3)({b: "B"});
            zodValidationFailed(Codec6_3)({b: "B", version: "1.0"});
            zodValidationFailed(Codec6_3)({c: "C"});
            zodValidationFailed(Codec6_3)({c: "C", version: "2.0"});
            zodValidationFailed(Codec6_3)({a: "AA", b: "B", version: "2.0"});
            zodValidationFailed(Codec6_3)({a: "AB", c: "C", version: "1.0"});
        });
    });

});

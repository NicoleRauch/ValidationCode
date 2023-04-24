import * as Z from "zod";
import {zodValidationFailed, zodValidationSuccessful} from "../helpers-zod";


it("has dummy test to avoid test failure", () => {
    expect(1).toEqual(1);
});

describe.skip("Step 5 - Putting it all together", () => {
    describe("Step 5.1", () => {
        const Codec5_1 = Z.void();

        it("allows and disallows various elements", () => {
            zodValidationSuccessful(Codec5_1)({a: "ABC"});
            zodValidationSuccessful(Codec5_1)({a: "DEF"});
            zodValidationSuccessful(Codec5_1)({a: 123});

            zodValidationFailed(Codec5_1)({a: 456});
        });
    });

    describe("Step 5.2", () => {
        const Codec5_2 = Z.void();

        it("allows and disallows various elements", () => {
            zodValidationSuccessful(Codec5_2)({a: "abc"});
            zodValidationSuccessful(Codec5_2)({a: "def", b: "nnn"});

            zodValidationFailed(Codec5_2)({b: "hhh"});
        });
    });

    describe("Step 5.3", () => {
        const Codec5_3 = Z.void();

        it("allows and disallows various elements", () => {
            zodValidationSuccessful(Codec5_3)({a: "A", b: "B"});
            zodValidationSuccessful(Codec5_3)({a: "AA", c: "C"});

            zodValidationFailed(Codec5_3)({a: "A"});
            zodValidationFailed(Codec5_3)({b: "B"});
            zodValidationFailed(Codec5_3)({c: "C"});
        });
    });

});

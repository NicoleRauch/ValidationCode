import * as t from "io-ts";
import {validationFailed, validationSuccessful} from "../helpers";


describe.skip("Step 5 - Putting it all together", () => {
    describe("Step 5.1", () => {
        const Codec5_1 = t.void;

        it("allows and disallows various elements", () => {
            validationSuccessful(Codec5_1)({a: "ABC"});
            validationSuccessful(Codec5_1)({a: "DEF"});
            validationSuccessful(Codec5_1)({a: 123});

            validationFailed(Codec5_1)({a: 456});
        });
    });

    describe("Step 5.2", () => {
        const Codec5_2 = t.void;

        it("allows and disallows various elements", () => {
            validationSuccessful(Codec5_2)({a: "abc"});
            validationSuccessful(Codec5_2)({a: "def", b: "nnn"});

            validationFailed(Codec5_2)({b: "hhh"});
        });
    });

    describe("Step 5.3", () => {
        const Codec5_3 = t.void;

        it("allows and disallows various elements", () => {
            validationSuccessful(Codec5_3)({a: "A", b: "B"});
            validationSuccessful(Codec5_3)({a: "AA", c: "C"});

            validationFailed(Codec5_3)({a: "A"});
            validationFailed(Codec5_3)({b: "B"});
            validationFailed(Codec5_3)({c: "C"});
        });
    });

});

import * as z from "zod";
import {zodValidationFailed, zodValidationSuccessful} from "../helpers-zod";


it("has dummy test to avoid test failure", () => {
    expect(1).toEqual(1);
});

describe.skip("Step 5 - Additional Functions", () => {
    describe("Step 5.1 - String Length", () => {
        const Codec5_1 = z.void();

        it("accepts strings up to the max length", () => {
            zodValidationSuccessful(Codec5_1)("A");
            zodValidationSuccessful(Codec5_1)("AB");
            zodValidationSuccessful(Codec5_1)("ABC");
        });

        it("rejects other lengths", () => {
            zodValidationFailed(Codec5_1)("ABCD");
            zodValidationFailed(Codec5_1)("ABCDE");
        });
    });

    describe("Step 5.2 - Number Range", () => {
        const Codec5_2 = z.void();

        it("accepts numbers >= 0", () => {
            zodValidationSuccessful(Codec5_2)(0);
            zodValidationSuccessful(Codec5_2)(1);
            zodValidationSuccessful(Codec5_2)(777);
        });

        it("rejects negative numbers", () => {
            zodValidationFailed(Codec5_2)(-0.0001);
            zodValidationFailed(Codec5_2)(-1);
            zodValidationFailed(Codec5_2)(-333);
        });
    });

    describe("Step 5.3 - String Contents", () => {
        const Codec5_3 = z.void();

        it("accepts strings matching the expected prefix", () => {
            zodValidationSuccessful(Codec5_3)("Name: Peter");
            zodValidationSuccessful(Codec5_3)("Name: Sebastian");
        });

        it("rejects negative numbers", () => {
            zodValidationFailed(Codec5_3)("My Name: Fritz");
        });
    });

    describe("Step 5.4 - EMail", () => {
        const Codec5_4 = z.void();

        it("accepts strings matching the expected prefix", () => {
            zodValidationSuccessful(Codec5_4)("info@example.com");
            zodValidationSuccessful(Codec5_4)("conference@my-domain.de");
        });

        it("rejects negative numbers", () => {
            zodValidationFailed(Codec5_4)("Ein Text");
        });
    });

});

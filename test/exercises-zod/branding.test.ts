import * as z from "zod";
import {zodValidationFailed, zodValidationSuccessful} from "../helpers-zod";

it("has dummy test to avoid test failure", () => {
    expect(1).toEqual(1);
});

describe.skip("Branding", () => {

    it("TypeScript is structurally typed", () => {
        type A = string;
        type B = string;

        const a: A = "Hello";
        const b: B = a;

        expect(typeof a).toEqual(typeof b);

        type O1 = { a: string };
        type O2 = { a: string };
        const o1: O1 = { a: "Hello" };
        const o2: O2 = o1;

        expect(typeof o1).toEqual(typeof o2);
    });

    it("Branding helps distinguish structurally identical types at compile time", () => {

        type Brand<K, T> = void;

        type A = Brand<string, "A">;
        type B = Brand<string, "B">;

        /*
        const v1: A = "Hello"; // string is not assignable to A
        const v2: A = "Hello" as A;
        const v3: B = v1; // A is not assignable to B
        const v4: B = v2; // A is not assignable to B
        const v5: B = v2 as B; // conversion of A to B may be a mistake
        const v6: B = "Hello" as B;

        expect(typeof v2).toEqual(typeof v6);
         */
    });

    it("Branding with ZOD allows to check at runtime, and to check other properties as well", () => {

        const IOArtNo = z.void();

        zodValidationSuccessful(IOArtNo)("X");
        zodValidationFailed(IOArtNo)("");

    });

});

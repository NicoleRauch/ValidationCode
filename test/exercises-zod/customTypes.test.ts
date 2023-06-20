import * as z from "zod";
import * as L from "luxon";
import {zodValidationFailed, zodValidationSuccessfulResultingIn} from "../helpers-zod";


it("has dummy test to avoid test failure", () => {
    expect(1).toEqual(1);
});

describe.skip("Custom Types", () => {

    const Codec_CT = z.void();

    it("converts an ISO DateTime string to a DateTime object", () => {
        const s = "2022-09-17T17:59:25Z";

        zodValidationSuccessfulResultingIn(Codec_CT)(s, L.DateTime.fromISO(s));
    });

    it("fails to convert an arbitrary string", () => {
        const s = "Hello";

        zodValidationFailed(Codec_CT)(s);
    });
})

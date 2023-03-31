import * as t from "io-ts";
import * as L from "luxon";
import {validationFailed, validationSuccessfulResultingIn} from "../helpers";


describe.skip("Custom Types", () => {

    const Codec_CT = t.void;

    it("converts an ISO DateTime string to a DateTime object", () => {
        const s = "2022-09-17T17:59:25Z";

        // !!! validationSuccessfulResultingIn(Codec_CT)(s, L.DateTime.fromISO(s));
    });

    it("fails to convert an arbitrary string", () => {
        const s = "Hello";

        validationFailed(Codec_CT)(s);
    });
})

import {isRight} from "fp-ts/Either";
import {Context, Decoder, Validation} from "io-ts";
import * as t from "io-ts";
import {isNone, isSome, none, Option, some} from "fp-ts/Option";
import {PathReporter} from "io-ts/PathReporter";
import * as R from "ramda";
import {expectStructure} from "./helpers";

// ==========================================================================
// Validation:

export const logErroneousData = (context: Context): void => {
    if (context.length === 0) {
        return;
    }
    const erroneousField = R.takeLast(1, context)[0].key;
    const surroundingData = R.takeLast(2, context)[0].actual;
    console.log("Erroneous data:", erroneousField, surroundingData);
};

export const validate = <T>(
    toValidate: unknown,
    iotsType: Decoder<unknown, T>): Option<T> => {
    const result: Validation<T> = iotsType.decode(toValidate);
    console.log("Import:", PathReporter.report(result));
    if (isRight(result)) {
        return some(result.right);
    } else {
        result.left.map(x => logErroneousData(x.context));
        return none; // for error treatment
    }
};

// ==========================================================================
// for Jest:

export const validationSuccessful = <T>(codec: t.Type<T>) => (data: unknown): void => {
    const result = validate<T>(data, codec);
    if (isNone(result)) {
        throw new Error("Validation unexpectedly failed");
    } else {
        expectStructure(result.value, data);
    }
};

export const validationSuccessfulResultingIn = <T>(codec: t.Type<T>) => (data: unknown, expectedResult: T): void => {
    const result = validate<T>(data, codec);
    if (isNone(result)) {
        throw new Error("Validation unexpectedly failed");
    } else {
        expectStructure(result.value, expectedResult);
    }
};

export const validationFailed = <T>(codec: t.Type<T>) => (data: unknown): void => {
    const result = validate<T>(data, codec);
    if (isSome(result)) {
        throw new Error("Validation unexpectedly succeeded");
    }
};

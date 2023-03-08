import {isRight} from "fp-ts/Either";
import {Context, Decoder, Validation} from "io-ts";
import * as t from "io-ts";
import {isNone, isSome, none, Option, some} from "fp-ts/Option";
import {PathReporter} from "io-ts/PathReporter";
import * as R from "ramda";

// ==========================================================================
// Deep object comparison:

export const expectCall = (real: any, expected: any, info: string): void => { // eslint-disable-line @typescript-eslint/no-explicit-any,@typescript-eslint/explicit-module-boundary-types
    expect(real).toEqualWithInfo(expected, info);
};

export const compareStructure = (real: any, expected: any, path: string[], compareLeaf: (real: any, expected: any, info: string) => void, excludedPathEndpoints: string[]): void => { // eslint-disable-line @typescript-eslint/no-explicit-any,@typescript-eslint/explicit-module-boundary-types

    const realType = typeof real;
    const expectedType = typeof expected;

    /*
    // special treatment for immutable.js' Map (if required)
    const realIsAMap = I.Map.isMap(real);
    const expectedIsAMap = I.Map.isMap(expected);
    if (realIsAMap || expectedIsAMap) {
        compareLeaf(realIsAMap ? "Map" : realType, expectedIsAMap ? "Map" : expectedType, path.join(" - "))
        // expect(realIsAMap ? "Map" : realType).toEqualWithInfo(expectedIsAMap ? "Map" : expectedType, path.join(" - "));
    }

    if (realIsAMap) {
        real = real.toObject(); // flache Konvertierung; tiefe Konvertierung mit .toJS() falls erforderlich
    }
    if (expectedIsAMap) {
        expected = expected.toObject(); // flache Konvertierung; tiefe Konvertierung mit .toJS() falls erforderlich
    }
    */

    // der Typ von null ist object ... darum Doppelprüfung:
    if (real !== null && expected !== null && realType === "object" && expectedType === "object") {
        R.union(Object.keys(real), Object.keys(expected)).forEach(key => {
            compareStructure(real[key], expected[key], path.concat(key), compareLeaf, excludedPathEndpoints);
        });
    } else {
        const lastInPath = R.last(path);
        if (lastInPath === undefined || !excludedPathEndpoints.includes(lastInPath)) { // Spezialbehandlung für Protokolleinträge
            compareLeaf(real, expected, path.join(" - "));
            // expect(real).toEqualWithInfo(expected, path.join(" - "));
        }
    }
};

export const expectStructure = (real: any, expected: any, excludedPathEndpoints: string[] = ["timestampInMillis", "eventId"]): void => { // eslint-disable-line @typescript-eslint/no-explicit-any,@typescript-eslint/explicit-module-boundary-types
    compareStructure(real, expected, [], expectCall, excludedPathEndpoints);
};

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

export const validationFailed = <T>(codec: t.Type<T>) => (data: unknown): void => {
    const result = validate<T>(data, codec);
    if (isSome(result)) {
        throw new Error("Validation unexpectedly succeeded");
    }
};

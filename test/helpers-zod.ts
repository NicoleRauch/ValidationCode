import {ZodError} from "zod";
import * as Z from "zod";
import {expectStructure} from "./helpers";

// ==========================================================================
// for Jest:

export const zodValidationSuccessful = <T>(codec: Z.ZodType<T>) => (data: unknown): void => {
  const result = codec.parse(data);
  expectStructure(result, data);
};

export const zodValidationSuccessfulResultingIn = <T>(codec: Z.ZodType<T>) => (data: unknown, expectedResult: T): void => {
  const result = codec.parse(data);
  expectStructure(result, expectedResult);
};

export const zodValidationFailed = <T>(codec: Z.ZodType<T>) => (data: unknown): void => {
  try {
    codec.parse(data);
  } catch (e) {
    if (e instanceof ZodError) {
      return;
    }
  }
  throw new Error("Validation unexpectedly succeeded");
};

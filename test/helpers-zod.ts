import {ZodError} from "zod";
import * as z from "zod";
import {expectStructure} from "./helpers";

// ==========================================================================
// for Jest:

export const zodValidationSuccessful = <T>(codec: z.ZodType<T>) => (data: unknown): void => {
  const result = codec.parse(data);
  expectStructure(result, data);
};

export const zodValidationSuccessfulResultingIn = <T>(codec: z.ZodType<T>) => (data: unknown, expectedResult: unknown): void => {
  const result = codec.parse(data);
  expectStructure(result, expectedResult);
};

export const zodValidationFailed = <T>(codec: z.ZodType<T>) => (data: unknown): void => {
  try {
    codec.parse(data);
  } catch (e) {
    if (e instanceof ZodError) {
      return;
    }
  }
  throw new Error("Validation unexpectedly succeeded");
};

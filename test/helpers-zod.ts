import * as z from "zod";
import {expectStructure} from "./helpers";

// ==========================================================================
// for Jest:

export const zodValidationSuccessful = <T>(codec: z.ZodType<T>) => (data: unknown): void => {
  const result = codec.safeParse(data);
  if(!result.success){
    throw new Error("Validation unexpectedly failed: " + result.error);
  }
  expectStructure(result.data, data);
};

export const zodValidationSuccessfulResultingIn = <T>(codec: z.ZodType<T>) => (data: unknown, expectedResult: unknown): void => {
  const result = codec.safeParse(data);
  if(!result.success){
    throw new Error("Validation unexpectedly failed: " + result.error);
  }
  expectStructure(result.data, expectedResult);
};

export const zodValidationFailed = <T>(codec: z.ZodType<T>) => (data: unknown): void => {
    const result = codec.safeParse(data);
  if(result.success){
    throw new Error("Validation unexpectedly succeeded");
  }
};

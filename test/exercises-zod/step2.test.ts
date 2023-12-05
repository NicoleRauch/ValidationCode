import * as z from "zod";
import {zodValidationFailed, zodValidationSuccessful} from "../helpers-zod";

it("has dummy test to avoid test failure", () => {
  expect(1).toEqual(1);
});

describe.skip("Step 2 - Array and Tuple", () => {
   describe("Step 2.1 - Unknown Array", () => {
       const Codec2_1 = z.void();
        it("accepts various arrays", () => {
            zodValidationSuccessful(Codec2_1)([]);
            zodValidationSuccessful(Codec2_1)([1, 2, 3]);
            zodValidationSuccessful(Codec2_1)(["a", "b"]);
            zodValidationSuccessful(Codec2_1)([{x: 1}, {y: "yay"}]);
        });

        it("does not accept strings", () => {
            zodValidationFailed(Codec2_1)("ABC");
        });
        it("even accepts arrays with mixed contents (i.e. tuples)", () => {
            zodValidationSuccessful(Codec2_1)(["ABC", 123]);
        });
   });

   describe("Step 2.2 - Array of numbers", () => {
      const Codec2_2 = z.void();

      it("accepts various number arrays", () => {
          zodValidationSuccessful(Codec2_2)([]);
          zodValidationSuccessful(Codec2_2)([1, 2, 3]);
          zodValidationSuccessful(Codec2_2)([1, 2, 3.5]);
      });
      it("does not accept array of strings", () => {
          zodValidationFailed(Codec2_2)(["abc"]);
      });
      it("does not accept mixed array (i.e. tuple)", () => {
          zodValidationFailed(Codec2_2)([123, "abc"]);
      });
   });

   describe("Step 2.3 - Tuple of string and number", () => {
       const Codec2_3 = z.void();

       it("accepts various tuples", () => {
          zodValidationSuccessful(Codec2_3)(["ABC", 123]);
          zodValidationSuccessful(Codec2_3)(["", 2.75]);
       });

       it("rejects empty tuple if string and number are expected", () => {
          zodValidationFailed(Codec2_3)([]);
       });

       it("rejects tuple with missing entries", () => {
           zodValidationFailed(Codec2_3)(["ABC"]);
       });

       it("rejects tuple with superfluous entries", () => {
           zodValidationFailed(Codec2_3)(["ABC", 123, 456]);
           zodValidationFailed(Codec2_3)(["ABC", 123, "456"]);
       });
   })
});

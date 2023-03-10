import * as t from "io-ts";
import {validationFailed, validationSuccessful, validationSuccessfulResultingIn} from "../helpers";


describe("Step 2 - Array and Tuple", () => {
   describe("Step 2.1 - Unknown Array", () => {
       const Codec2_1 = t.void;
        it("accepts various arrays", () => {
            validationSuccessful(Codec2_1)([]);
            validationSuccessful(Codec2_1)([1, 2, 3]);
            validationSuccessful(Codec2_1)(["a", "b"]);
            validationSuccessful(Codec2_1)([{x: 1}, {y: "yay"}]);
        });

        it("does not accept strings", () => {
            validationFailed(Codec2_1)("ABC");
        });
        it("even accepts arrays with mixed contents (i.e. tuples)", () => {
            validationSuccessful(Codec2_1)(["ABC", 123]);
        });
   });

   describe("Step 2.2 - Array of numbers", () => {
      const Codec2_2 = t.void;

      it("accepts various number arrays", () => {
          validationSuccessful(Codec2_2)([]);
          validationSuccessful(Codec2_2)([1, 2, 3]);
          validationSuccessful(Codec2_2)([1, 2, 3.5]);
      });
      it("does not accept array of strings", () => {
          validationFailed(Codec2_2)(["abc"]);
      });
      it("does not accept mixed array (i.e. tuple)", () => {
          validationFailed(Codec2_2)([123, "abc"]);
      });
   });

   describe("Step 2.3 - Tuple of string and number", () => {
       const Codec2_3 = t.void;

       it("accepts various tuples", () => {
          validationSuccessful(Codec2_3)(["ABC", 123]);
          validationSuccessful(Codec2_3)(["", 2.75]);
       });

       it("rejects empty tuple if string and number are expected", () => {
          validationFailed(Codec2_3)([]);
       });

       it("rejects tuple with missing entries", () => {
           validationFailed(Codec2_3)(["ABC"]);
       });

       it("drops superfluous data in tuple", () => {
           validationSuccessfulResultingIn(Codec2_3)(["ABC", 123, 456], ["ABC", 123]);
           validationSuccessfulResultingIn(Codec2_3)(["ABC", 123, "456"], ["ABC", 123]);
       });
   })
});

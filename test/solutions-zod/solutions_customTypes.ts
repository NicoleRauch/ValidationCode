import * as z from "zod";
import * as L from "luxon";

export const LuxonDateTimeFromString: z.ZodEffects<z.ZodString, L.DateTime, unknown> =
  z.string().transform((value, context) => {
    const d: L.DateTime = L.DateTime.fromISO(value);
    if(!d.isValid){
      context.addIssue({
        code: z.ZodIssueCode.custom,
        message: `not a valid ISO-Date string: ${d.invalidExplanation}`
      });
      return z.NEVER;
    }
    return d;
});

// see https://zod.dev/?id=transform

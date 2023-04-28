import * as Z from "zod";
import * as L from "luxon";

export const LuxonDateTimeFromString: Z.ZodEffects<Z.ZodString, L.DateTime, unknown> = 
  Z.string().transform((value, context) => {
    const d: L.DateTime = L.DateTime.fromISO(value);
    if(!d.isValid){
      context.addIssue({
        code: Z.ZodIssueCode.custom,
        message: "not a valid ISO-Date string"
      });
      return Z.NEVER;
    }
    return d;
});

// see https://zod.dev/?id=transform

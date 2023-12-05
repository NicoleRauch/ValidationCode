import * as z from "zod";

export const Codec3_1 = z.record(z.string(), z.unknown());
export const Codec3_2 = z.record(z.string(), z.number());
export const Codec3_3 = z.object({
    a: z.number(),
    b: z.string(),
});
export const Codec3_4 = z.object({
    a: z.number(),
    b: z.string(),
}).partial();
export const Codec3_5 = z.object({
    a: z.number(),
    b: z.string(),
}).strict();

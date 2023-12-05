import * as z from "zod";

export const Codec6_1 = z.object({
    a: z.union([z.string(), z.literal(123)])
}).strict();
export const Codec6_2 = z.intersection(
    z.object({a: z.string()}),
    z.object({b: z.string()}).partial()
);
export const Codec6_3 = z.intersection(
    z.object({a: z.string()}),
    z.union([z.object({version: z.literal("1.0"), b: z.string()}), z.object({version: z.literal("2.0"), c: z.string()})])
);

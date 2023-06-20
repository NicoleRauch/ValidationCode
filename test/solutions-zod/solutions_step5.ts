import * as z from "zod";

const Codec5_1 = z.object({
    a: z.union([z.string(), z.literal(123)])
}).strict();
const Codec5_2 = z.intersection(
    z.object({a: z.string()}),
    z.object({b: z.string()}).partial()
);
const Codec5_3 = z.intersection(
    z.object({a: z.string()}),
    z.union([z.object({b: z.string()}), z.object({c: z.string()})])
);

import * as z from "zod";

const Codec3_1 = z.record(z.string(), z.unknown());
const Codec3_2 = z.record(z.string(), z.number());
const Codec3_3 = z.object({
    a: z.number(),
    b: z.string(),
});
const Codec3_4 = z.object({
    a: z.number(),
    b: z.string(),
}).partial();
const Codec3_5 = z.object({
    a: z.number(),
    b: z.string(),
}).strict();

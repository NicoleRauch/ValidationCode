import * as z from "zod";

const Codec4_2A = z.object({a: z.number()});
const Codec4_2B = z.object({b: z.string()});

export const Codec4_1 = z.union([z.number(), z.string()]);
export const Codec4_2 = z.intersection(Codec4_2A, Codec4_2B);

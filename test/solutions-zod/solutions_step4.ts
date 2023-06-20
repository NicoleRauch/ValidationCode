import * as z from "zod";

const Codec4_1 = z.union([z.number(), z.string()]);
const Codec4_2 = z.intersection(z.object({a: z.number()}), z.object({b: z.string()}));

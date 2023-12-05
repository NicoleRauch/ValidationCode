import * as z from "zod";


export const Codec5_1 = z.string().max(3);
export const Codec5_2 = z.number().nonnegative();
export const Codec5_3 = z.string().startsWith("Name: ");
export const Codec5_4 = z.string().email();

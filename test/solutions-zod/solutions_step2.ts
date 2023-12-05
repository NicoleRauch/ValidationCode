import * as z from "zod";

export const Codec2_1 = z.unknown().array();
export const Codec2_2 = z.array(z.number());
export const Codec2_3 = z.tuple([z.string(), z.number()]);

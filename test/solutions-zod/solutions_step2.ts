import * as z from "zod";

const Codec2_1 = z.unknown().array();
const Codec2_2 = z.array(z.number());
const Codec2_3 = z.tuple([z.string(), z.number()]);

import * as Z from "zod";

const Codec4_1 = Z.union([Z.number(), Z.string()]);
const Codec4_2 = Z.intersection(Z.object({a: Z.number()}), Z.object({b: Z.string()}));

import * as Z from "zod";

const Codec5_1 = Z.object({
    a: Z.union([Z.string(), Z.literal(123)])
}).strict();
const Codec5_2 = Z.intersection(
    Z.object({a: Z.string()}),
    Z.object({b: Z.string()}).partial()
);
const Codec5_3 = Z.intersection(
    Z.object({a: Z.string()}),
    Z.union([Z.object({b: Z.string()}), Z.object({c: Z.string()})])
);

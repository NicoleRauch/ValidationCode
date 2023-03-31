import * as Z from "zod";

const Codec3_1 = Z.record(Z.string(), Z.unknown());
const Codec3_2 = Z.record(Z.string(), Z.number());
const Codec3_3 = Z.object({
    a: Z.number(),
    b: Z.string(),
});
const Codec3_4 = Z.object({
    a: Z.number(),
    b: Z.string(),
}).partial();
const Codec3_5 = Z.object({
    a: Z.number(),
    b: Z.string(),
}).strict();

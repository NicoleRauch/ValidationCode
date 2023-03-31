import * as Z from "zod";

const Codec2_1 = Z.unknown().array();
const Codec2_2 = Z.array(Z.number());
const Codec2_3 = Z.tuple([Z.string(), Z.number()]);

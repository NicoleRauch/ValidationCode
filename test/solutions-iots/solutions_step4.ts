import * as t from "io-ts";


const Codec4_1 = t.union([t.number, t.string]);
const Codec4_2 = t.intersection([t.type({a: t.number}), t.type({b: t.string})]);

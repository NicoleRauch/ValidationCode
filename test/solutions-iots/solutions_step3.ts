import * as t from "io-ts";


const Codec3_1 = t.UnknownRecord;
const Codec3_2 = t.record(t.string, t.number);
const Codec3_3 = t.type({
    a: t.number,
    b: t.string,
});
const Codec3_4 = t.partial({
    a: t.number,
    b: t.string,
});
const Codec3_5 = t.strict({
    a: t.number,
    b: t.string,
});

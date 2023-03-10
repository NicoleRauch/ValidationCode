import * as t from "io-ts";


const Codec5_1 = t.strict({
    a: t.union([t.string, t.literal(123)])
});
const Codec5_2 = t.intersection([
    t.type({a: t.string}),
    t.partial({b: t.string})
]);
const Codec5_3 = t.intersection([
    t.type({a: t.string}),
    t.union([t.type({b: t.string}), t.type({c: t.string})])
]);

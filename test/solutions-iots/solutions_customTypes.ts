import {Context} from "io-ts";
import * as t from "io-ts";
import * as L from "luxon";
import {ChainRec} from "fp-ts/Either";

export const LuxonDateTimeFromString = new t.Type<L.DateTime, string, unknown>(
    'LuxonDateTimeFromString',
    (u: unknown): u is L.DateTime => u instanceof L.DateTime,
    (u: unknown, c: Context) =>
        ChainRec.chain(t.string.validate(u, c), (s: string) => {
            const d: L.DateTime = L.DateTime.fromISO(s);
            return d.isValid ? t.success(d) : t.failure(u, c);
        }),
    (a: L.DateTime) => a.toString()
);

import * as t from "io-ts";

type Brand<K, T> = K & { __brand: T };

interface IArtNoBrand { readonly IArtNo: unique symbol }
const IOArtNo = t.brand(t.string, (s): s is t.Branded<string, IArtNoBrand> => s.length > 0, 'IArtNo');
type IArtNo = t.TypeOf<typeof IOArtNo>;
const artNoFor = (x: string): IArtNo => x as IArtNo;

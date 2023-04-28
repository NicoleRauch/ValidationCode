import * as Z from "zod";

const IOArtNo = Z.string().min(1).brand<"ArtNo">();
type IArtNo = Z.TypeOf<typeof IOArtNo>;
const artNoFor = (x: string): IArtNo => x as IArtNo;

// see https://github.com/colinhacks/zod#brand

import * as z from "zod";

const IOArtNo = z.string().min(1).brand<"ArtNo">();
type IArtNo = z.infer<typeof IOArtNo>;
const artNoFor = (x: string): IArtNo => x as IArtNo;

// see https://github.com/colinhacks/zod#brand

import * as z from "zod";

export type Data = { a: { b: { c: string } } };

const f = (d: any): void => {
    if (d.a === undefined || d.a.b === undefined || typeof d.a.b.c !== "string") {
        throw new Error();
    }
    // do something
};


const ZUser = z.object({
    userId: z.number(),
    name: z.string()
});

const myData: unknown = {};

type IUser = z.infer<typeof ZUser>;

const myUserValidation: IUser = ZUser.parse(myData);

try {
    const myUserValidation: IUser = ZUser.parse(myData);
} catch (e) {
    if(e instanceof z.ZodError) {
        console.log(e);
    }
}

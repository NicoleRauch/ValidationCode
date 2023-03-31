import * as Z from "zod";

export type Data = { a: { b: { c: string } } };

const f = (d: any): void => {
    if (d.a === undefined || d.a.b === undefined || typeof d.a.b.c !== "string") {
        throw new Error();
    }
    // do something
};


const ZUser = Z.object({
    userId: Z.number(),
    name: Z.string()
});

const myData: unknown = {};

type IUser = Z.infer<typeof ZUser>;

const myUserValidation: IUser = ZUser.parse(myData);

try {
    const myUserValidation: IUser = ZUser.parse(myData);
} catch (e) {
    if(e instanceof Z.ZodError) {
        console.log(e);
    }
}

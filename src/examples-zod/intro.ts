import {ZodError} from "zod";
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

type User = z.infer<typeof ZUser>;

const validate = (): User | void => {
    const myUserValidation: { success: true; data: User; } | { success: false; error: ZodError; } = ZUser.safeParse(myData);
    if(myUserValidation.success) {
        return myUserValidation.data;
    } else {
        console.log(myUserValidation.error);
    }
}

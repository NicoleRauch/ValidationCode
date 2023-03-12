import {isRight} from "fp-ts/Either";
import {Validation} from "io-ts";
import * as t from "io-ts";
import {PathReporter} from "io-ts/PathReporter";

export type Data = { a: { b: { c: string } } };

const f = (d: any): void => {
    if (d.a === undefined || d.a.b === undefined || typeof d.a.b.c !== "string") {
        throw new Error();
    }
    // do something
};


const IOUser = t.type({
    userId: t.number,
    name: t.string
});

const myData = {};

type IUser = t.TypeOf<typeof IOUser>;

const myUserValidation: Validation<IUser> = IOUser.decode(myData);

if(isRight(myUserValidation)) {
    const myUser: IUser = myUserValidation.right;
} else {
    console.log(PathReporter.report(myUserValidation));
}

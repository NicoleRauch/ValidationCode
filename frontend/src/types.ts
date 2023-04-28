import * as z from "zod";

const ZUser = z.object({
    firstName: z.string().min(1),
    lastName: z.string()
}).strict();
export type IUser = z.infer<typeof ZUser>;

export const ZUsers = ZUser.array();
export type IUsers = z.infer<typeof ZUsers>;


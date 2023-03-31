import * as z from "zod";


const ZState = z.union([z.literal("on"), z.literal("off")]);

const ZTemperature = z.object({
    temperature: z.number()
}).required().strict();

const ZHeatSwitch = z.object({
    heat: ZState
}).required().strict();

const ZTargetSet = z.object({
    target: ZTemperature
}).required().strict();

const ZCommand = z.union([ZHeatSwitch, ZTargetSet]);

export const ZCommands = z.array(ZCommand);

export type ICommands = z.infer<typeof ZCommands>;

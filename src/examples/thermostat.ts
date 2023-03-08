import * as t from "io-ts";


const IOState = t.union([t.literal("on"), t.literal("off")]);

const IOTemperature = t.strict({
    temperature: t.number
});

const IOHeatSwitch = t.strict({
    heat: IOState
});

const IOTargetSet = t.strict({
    target: IOTemperature
});

const IOCommand = t.union([IOHeatSwitch, IOTargetSet]);

export const IOCommands = t.array(IOCommand);

export type ICommands = t.TypeOf<typeof IOCommands>;

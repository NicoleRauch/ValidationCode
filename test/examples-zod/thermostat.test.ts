import {ZodError} from "zod";
import {ICommands, ZCommands} from "../../src/examples-zod/thermostat";


describe("Thermostat tests", () => {

  it("accepts 'heat on'", () => {
    let input: any = [{heat: "on"}];
    const result: ICommands = ZCommands.parse(input);

    expect(result).toEqual(input);
  });

  it("accepts 'heat off'", () => {
    let input: any = [{heat: "off"}];
    const result: ICommands = ZCommands.parse(input);

    expect(result).toEqual(input);
  });

  it("does not accept 'heat lower'", () => {
    expect(() => {
      let input: any = [{heat: "lower"}];
      const result: ICommands = ZCommands.parse(input);
    }).toThrow(ZodError);
  });

  it("accepts 'target temperature 20'", () => {
    let input: any = [{target: {temperature: 20}}];
    const result: ICommands = ZCommands.parse(input);

    expect(result).toEqual(input);
  });

  it("does not accept 'target temperature '20'' (with value as string)", () => {
    expect(() => {
      let input: any = [{target: {temperature: "20"}}];
      const result: ICommands = ZCommands.parse(input);
    }).toThrow(ZodError);
  });
});

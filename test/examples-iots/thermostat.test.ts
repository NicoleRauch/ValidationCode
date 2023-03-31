import {isRight} from "fp-ts/Either";
import {Validation} from "io-ts";

import {ICommands, IOCommands} from "../../src/examples-iots/thermostat";


describe("Thermostat tests", () => {

    it("accepts 'heat on'", () => {
        let input: any = [{heat: "on"}];
        const result: Validation<ICommands> = IOCommands.decode(input);

        expect(isRight(result)).toBeTruthy();
    });

    it("accepts 'heat off'", () => {
        let input: any = [{heat: "off"}];
        const result: Validation<ICommands> = IOCommands.decode(input);

        expect(isRight(result)).toBeTruthy();
    });

    it("does not accept 'heat lower'", () => {
        let input: any = [{heat: "lower"}];
        const result: Validation<ICommands> = IOCommands.decode(input);

        expect(isRight(result)).toBeFalsy();
    });

    it("accepts 'target temperature 20'", () => {
        let input: any = [{target: {temperature: 20}}];
        const result: Validation<ICommands> = IOCommands.decode(input);

        expect(isRight(result)).toBeTruthy();
    });

    it("does not accept 'target temperature '20''", () => {
        let input: any = [{target: {temperature: "20"}}];
        const result: Validation<ICommands> = IOCommands.decode(input);

        expect(isRight(result)).toBeFalsy();
    });


});

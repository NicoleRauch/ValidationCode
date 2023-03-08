
expect.extend({
    toEqualWithInfo(received, expected, info: string) {
        return {
            pass: this.equals(received, expected),

            // wir müssen mit einem .not. Präfix umgehen können und müssen in dem Fall
            // die Fehlermeldung umdrehen:
            message: (): string => info +
                '\n\n' +
                `Expected: ${this.isNot ? "not " : ""}${this.utils.printExpected(expected)}\n` +
                `Received: ${this.utils.printReceived(received)}`,
        };
    },
});

export {};
declare global {
    namespace jest {
        interface Matchers<R> {
            toEqualWithInfo(expected: unknown, info: string): R;
        }
    }
}

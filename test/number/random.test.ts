
import { random } from "../emnorst.import";

declare global {
    namespace jest {
        interface Matchers<R> {
            toBeWithinRange(a: number, b: number): R;
        }
    }
}

expect.extend({
    toBeWithinRange(received: number, floor: number, ceiling: number) {
        const pass = floor <= received && received <= ceiling;
        return pass ? {
            message: () => `expected ${received} not to be within range ${floor} - ${ceiling}`,
            pass: true,
        } : {
            message: () => `expected ${received} to be within range ${floor} - ${ceiling}`,
            pass: false,
        };
    },
});

describe("random", () => {
    /** @test {random} */
    test("random", () => {
        let prev = random();
        for(let i = 0;i < 100;i++) {
            const randNum = random();

            expect(randNum).not.toBe(prev);

            prev = randNum;
        }
    });
    test("in range", () => {
        const min = 10, max = 20;

        for(let i = 0;i < 100;i++) {
            expect(random(min, max)).toBeWithinRange(min, max);
            expect(random(max, min)).toBeWithinRange(min, max);
        }

        expect(random(1, 1)).toBe(1);
    });
});

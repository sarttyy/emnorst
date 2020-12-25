
import { xorshift, random } from "../emnorst.import";

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
    /** @test {xorshift} */
    test.skip("xorshift", () => {
        xorshift(0, Infinity, 0xf0f0f0f0);
        const _ = [];
        for(let i = 10;i--;)
            _.push(xorshift());
        expect(_).toEqual([
            23689578, 111038900, 1465436192, 969043763, 1900776159,
            897313495, 549278009, 1331655798, 1402936162, 243335963,
        ]);
        expect(xorshift(10, 1)).toBe(2);
        expect(xorshift(1, 1)).toBe(1);
    });
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

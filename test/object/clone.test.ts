
import { clone } from "../emnorst.import";

describe.skip("clone", () => {
    test("primitives", () => {
        const target = {
            fn() { /* noop */ },
            undefined: void 0,
            null: null,
            number: 0xff,
            string: "hello clone!",
            boolean: true,
            bigint: BigInt("9007199254740993"),
        };
        const cloned = clone(target);
        expect(cloned).not.toBe(target);
        expect(cloned).toEqual(target);
    });
    describe("object", () => {
        const target = {
            object: {},
            array: [],
            myClass: new class Myclass {},
            Number: new Number(0xff),
            String: new String("hello deepCopy!"),
            Boolean: new Boolean(true),
            regexp: /./,
            date: new Date(),
            Bigint: Object(BigInt("9007199254740993")),
            arguments: (function() { return arguments; })(),
        };
        const cloned = clone(target);
        const entries = Object.keys(cloned).map((key) => [cloned[key], target[key]]);
        test.each(entries)("%o", (cloned, origin) => {
            expect(cloned).not.toBe(origin);
            expect(cloned).toEqual(origin);
        });
    });
    test("getter/setter", () => {
        const target = {
            value: 0,
            get getter() { return this.value; },
            set setter(value: number) { this.value = value; },
        };
        const cloned = clone(target);
        expect(cloned).toEqual(target);
    });
    test("recursive reference", () => {
        const target: { value?: object } = {};
        target.value = target;
        const cloned = clone(target);
        expect(cloned).toBe(cloned.value);
    });
    test("depth", () => {
        const target = {
            structure: {
                structure: { value: 0 }
            },
        };
        const cloned = clone(target, { depth: 1 });
        expect(cloned).not.toBe(target);
        expect(cloned.structure).not.toBe(target.structure);
        expect(cloned.structure.structure).toBe(target.structure.structure);
    });
    test.skip("error", () => {
        const target = { error: new Error("418 I'm a teapot") };
        const cloned = clone(target);
        expect(target.error).not.toBe(cloned.error);
        expect(cloned.error).toBeDefined();
    });
});

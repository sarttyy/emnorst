/* eslint-disable */

import { clone } from "./index.js";

/** @test {object} */
describe("object/clone", () => {
    /** @test {clone} */
    it("As it is.", () => {
        const target = {
            fn() {},
            undefined: void 0,
            null: null,
            number: 0xff,
            string: "hello machilia!",
            boolean: true,
            bigint: BigInt("9007199254740993"),
        };
        const cloned = clone(target);
        expect(target).toEqual(cloned);
    });
    it("getter/setter", () => {
        const target = {
            value: 0,
            get getter() { return this.value; },
            set setter(value) { this.value = value; },
        };
        const cloned = clone(target);
        expect(target).toEqual(cloned);
    });
    it("recursive", () => {
        const target = {};
        target.value = target;
        const cloned = clone(target);
        expect(cloned).toBe(cloned.value);
    });
    it("depth", () => {
        const target = {
            structure: {
                structure: { value: 0 }
            },
        };
        const cloned = clone(target, 1);
        expect(target).not.toBe(cloned);
        expect(target.structure).not.toBe(cloned.structure);
        expect(target.structure.structure).toBe(cloned.structure.structure);
    });
    describe("newObject()", () => {
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
        Object.keys(cloned).forEach((type) => {
            it(type, () => {
                expect(target[type]).not.toBe(cloned[type]);
                expect(target[type]).toEqual(cloned[type]);
            });
        });
    });
    it("error", () => {
        const target = { error: new Error("418 I'm a teapot") };
        const cloned = clone(target);
        expect(target.error).not.toBe(cloned.error);
        expect(cloned.error).toBeDefined();
    });
});

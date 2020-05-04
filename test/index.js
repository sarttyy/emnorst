/* eslint-disable */
// test code.

const utility = rei.utility;
describe("util/is", function(){
    it("isUndefined", function(){
        expect(utility.isUndefined(void 0)).toBe(true);
        expect(utility.isUndefined(null)).toBe(false);
    });
    it("isNull", function(){
        expect(utility.isNull(void 0)).toBe(true);
        expect(utility.isNull(null)).toBe(true);
        expect(utility.isNull([])).toBe(false);
    });
    it("isBoolean", function(){
        expect(utility.isBoolean(new Boolean)).toBe(true);
        expect(utility.isBoolean(true)).toBe(true);
        expect(utility.isBoolean(false)).toBe(true);
        expect(utility.isBoolean(0)).toBe(false);
    });
    it("isString", function(){
        expect(utility.isString("hogehoge")).toBe(true);
        expect(utility.isString(new String)).toBe(true);
        expect(utility.isString(1)).toBe(false);
    });
    it("isNumber", function(){
        expect(utility.isNumber(1)).toBe(true);
        expect(utility.isNumber(128.128)).toBe(true);
        expect(utility.isNumber(new Number())).toBe(true);
        expect(utility.isNumber("1")).toBe(false);
    });
    it("isSymbol", function(){
        expect(utility.isSymbol(Symbol("hogehoge"))).toBe(true);
        expect(utility.isSymbol("1")).toBe(false);
    });
    it("isFunction", function(){});
    it("isObject", function(){
        expect(utility.isObject(new Object)).toBe(true);
        expect(utility.isObject(new Array)).toBe(true);
        expect(utility.isObject(new Boolean)).toBe(true);
        expect(utility.isObject(Object(""))).toBe(true);
        expect(utility.isObject(null)).toBe(false);
    });
    it("", function(){});
    // expect().toBe();
    // expect().not.toBe();
    // toEqual({})
    // toMatch
    // toBeDefined
    // toBeUndefined
    // toBeNull
    // toBeTruthy
    // toBeFalsy
    // expect([1, 2, 3]).toContain(3);
});

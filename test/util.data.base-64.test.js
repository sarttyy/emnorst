
const { BASE64 } = require("../dist/emnorst.cjs.js");

const toBin = (str) => [...str].map($ => $.charCodeAt());
const toStr = (bin) => bin.reduce((acc, cur) => acc + String.fromCharCode(cur), "");

describe("BASE-64", () => {
    test("encode-uint8", () => {
        const string = "hello Base64!";
        const base64 = BASE64.encode(toBin(string));
        expect(base64).toBe(btoa(string));
    });
    test("decode-uint8", () => {
        const base64 = "aGVsbG8gQmFzZTY0IQ==";
        const string = toStr(BASE64.decode(base64));
        expect(string).toEqual(atob(base64));
    });
    test("encode-uint16", () => {
        const data = toBin("あ");
        const uint16 = new Uint16Array(data);
        const base64 = BASE64.encode(uint16.buffer);
        expect(base64).toBe("QjA=");
    });
    test("decode-uint16", () => {
        const data = BASE64.decode("QjA=");
        const uint16 = new Uint16Array(data.buffer);
        const string = toStr(uint16);
        expect(string).toBe("あ");
    });
});

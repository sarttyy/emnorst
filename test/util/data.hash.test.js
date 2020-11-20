
const { md5, sha1, sha224, sha256 } = require("../../dist/emnorst.cjs.js");

/** @test {object} */
describe("util/string/hash", () => {
    /** @test {hashCore} */
    test("hashCore", () => {
        const text = "くぁｗせｄｒｆｔｇｙふじこｌｐ；＠：「」";
        const bin = md5(text, { format: "bin" });
        expect(bin).toBe("f¥OqãÔL2(FÿG");

        const arr = [111, 112, 113, 114, 115, 116];
        const dec = md5(arr, { format: "dec" });
        expect(dec).toEqual([69, 134, 12, 236, 164, 57, 44, 38, 75, 127, 51, 117, 13, 106, 9, 11]);
    });
    /** @test {md5} */
    test("md5", () => {
        const hash = md5();
        expect(hash).toBe("d41d8cd98f00b204e9800998ecf8427e");
        const hash2 = md5(hash);
        expect(hash2).toBe("74be16979710d4c4e7c6647856088456");
    });
    /** @test {sha1} */
    test("sha1", () => {
        const hash = sha1();
        expect(hash).toBe("da39a3ee5e6b4b0d3255bfef95601890afd80709");
        const hash2 = sha1(hash);
        expect(hash2).toBe("10a34637ad661d98ba3344717656fcc76209c2f8");
    });
    /** @test {sha224} */
    test("sha224", () => {
        const hash = sha224();
        expect(hash).toBe("d14a028c2a3a2bc9476102bb288234c415a2b01f828ea62ac5b3e42f");
        const hash2 = sha224(hash);
        expect(hash2).toBe("5afd7d287de9b7609833b52ce4a171c0136d4228c3adc9d8bf929ee8");
    });
    /** @test {sha256} */
    test("sha256", () => {
        const hash = sha256();
        expect(hash).toBe("e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855");
        const hash2 = sha256(hash);
        expect(hash2).toBe("71abfc64395c9f90c2e3d9a8874b6b087c9dedd82412a71085e0e0302f275168");
    });
});

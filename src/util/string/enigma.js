
// @ts-check

import { isOdd } from "../is/number";

const Gears = [
    [16,14,6,3,4,20,9,24,7,2,23,1,25,8,19,0,5,12,15,18,21,11,13,10,17,22],
    [9,7,3,24,17,10,1,13,15,22,2,25,5,14,19,4,0,20,18,23,11,16,8,12,21,6],
    [11,12,25,3,0,10,21,19,8,24,2,15,9,22,18,17,23,14,1,4,13,16,7,6,20,5],
];
const reverse = (n) => isOdd(n) ? n + 1 : n - 1;
// const reverse = (n, l) => (isOdd(n) ? l - n : isOdd(n / 2) ? n - 2 : n + 2) % l;
const table = "abcdefghijklmnopqrstuvwxyz";
// ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789

/**
 * @example
 * const hoge = new rei.Enigma();
 * hoge.exchange("hello world");
 * // => "fbuuqrpedw"
 * hoge.exchange("hello world");
 * // => "llxrrdwecp"
 *
 * hoge.rotate(0); // reset rotation
 * hoge.exchange("fbuuqrpedw");
 * // => "helloworld"
 * hoge.exchange("llxrrdwecp");
 * // => "helloworld"
 */
export class Enigma {
    /**
     * @param {string} charTable
     * @param {number[][]} gears
     * @param {number[] | function(number): number} reverseGear
     */
    constructor(charTable=table, gears=Gears, reverseGear=reverse) {
        this.charTable = charTable;
        this.gears = gears;
        this.reverse = typeof reverseGear === "function"
            ? reverseGear : (i) => reverseGear[i];
        this.rotation = new Array(this.gears.length);
        this.rotate(0);
    }
    /**
     * @param {number} [count]
     */
    rotate(count=1) {
        if(count === 0) this.rotation.fill(0);
        else for(;count--;)for(let i = 0, flag = true;flag && i < this.gears.length;) {
            flag = ++this.rotation[i] === this.gears[i].length;
            flag && (this.rotation[i++] = 0);
        }
        return this;
    }
    /**
     * @param {number} n
     */
    convert(n) {
        let i = 0;
        if(!~n) return null;
        for(;i < this.gears.length;i++) {
            const { length } = this.gears[i];
            const location = (length + n - this.rotation[i]) % length;
            n = (this.rotation[i] + this.gears[i][location]) % length;
        }
        // 反転
        n = this.reverse(n);
        for(;i--;) {
            const { length } = this.gears[i];
            const location = (length + n - this.rotation[i]) % length;
            n = (this.rotation[i] + this.gears[i].indexOf(location)) % length;
        }
        // ギアの回転
        this.rotate();
        return n;
    }
    /**
     * @param {string} string
     */
    exchange(string) {
        let cryptedStr = "";
        for(let i = 0;i < string.length;i++) {
            let n = this.charTable.indexOf(string[i]);
            // const code = string.charCodeAt(i);
            // let n = [code & 0xff, code >>> 8];
            if(!~n) continue;
            if(!Array.isArray(n))
                n = this.convert(n);
            else for(let j = 0;j < n.length;j++)
                n[j] = this.convert(n[j]);
            cryptedStr += this.charTable[n];
            // cryptedStr += String.fromCharCode(n[0] | (n[1] << 8));
        }
        return cryptedStr;
    }
}

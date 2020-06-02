
// @ts-check

const difaultGears = [
    [16,14,6,3,4,20,9,24,7,2,23,1,25,8,19,0,5,12,15,18,21,11,13,10,17,22],
    [9,7,3,24,17,10,1,13,15,22,2,25,5,14,19,4,0,20,18,23,11,16,8,12,21,6],
    [11,12,25,3,0,10,21,19,8,24,2,15,9,22,18,17,23,14,1,4,13,16,7,6,20,5],
];
const difaultR = [1,0,3,2,5,4,7,6,9,8,11,10,13,12,15,14,17,16,19,18,21,20,23,22,25,24];
const alphabet = "abcdefghijklmnopqrstuvwxyz";

export class Enigma {
    constructor(charTable=alphabet, gears=difaultGears, reverseGear=difaultR) {
        this.charTable = charTable;
        this.gears = gears;
        this.reverseGear = reverseGear;
        this.rotation = new Array(this.gears.length).fill(0);
    }
    _place(i, n) {
        const { length } = this.gears[i];
        return (length + n - this.rotation[i]) % length;
    }
    _shift(i, n) {
        return (this.rotation[i] + n) % this.gears[i].length;
    }
    charExchange(char) {
        const l = this.gears.length;
        let i = 0, n = this.charTable.indexOf(char);
        if(!~n)return null;
        for(;i < l;i++) {
            const location = this._place(i, n);
            n = this._shift(i, this.gears[i][location]);
        }
        // 反転
        n = this.reverseGear[n];
        for(;i--;) {
            const location = this._place(i, n);
            n = this._shift(i, this.gears[i].indexOf(location));
        }
        // ギアの回転
        for(let i = 0, flag = true;flag && i < l;) {
            flag = ++this.rotation[i] === this.gears[i].length;
            flag && (this.rotation[i++] = 0);
        }
        return this.charTable[n] || null;
    }
    /**
     * @param {string} string
     */
    exchange(string) {
        let cryptedStr = "";
        for(let i = 0;i < string.length;i++)
            cryptedStr += this.charExchange(string[i]);
        return cryptedStr;
    }
}

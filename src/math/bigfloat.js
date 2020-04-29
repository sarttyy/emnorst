
// @ts-check

export {Num2FracStr as NumToStr} from "../lib/Num2DecStr";

import {Num2FracStr as NumToStr} from "../lib/Num2DecStr";
import {first, last, splice} from "../utility/getIndex";
import {zip} from "../utility/index";

/*
4e6
4000000

4^6
444444
*/

const digits = (num, digits, baseNum=10)=>(
    baseNum ** digits * num
);

/**
 * @typedef {Number|String|BigFloat} BigNumber
 */

/**
 * Alpha: In development.
 *
 * @export
 * @class BigFloat
 */
export class BigFloat {
    /**
     * Creates an instance of BigFloat.
     * @param {BigNumber} number
     * @memberof BigFloat
     */
    constructor(number){
        number = BigFloat.parse(number);
        this.setNumber(number);
        // 少数点以下有効桁数
        this.digits = {valid: 16};
    }
    // eslint-disable-next-line class-methods-use-this
    get [Symbol.toStringTag](){
        return "BigFloat";
    }
    /**
     *
     *
     * @param {BigNumber} number
     * @memberof BigFloat
     */
    setNumber(number){
        number = String(number);
        const [first] = number;
        // 正負符号
        this.sign = first !== "-";
        number = first === "-" || first === "+"
            ? number.slice(1) : number;
        const point = number.indexOf(".");
        const decimalPoint = point !== -1 ? point : Infinity;
        this.integer = number.slice(0, decimalPoint);
        this.decimal = number.slice(decimalPoint + 1);
    }
    getNumber(int=1, dec=0){
        return this.integer.padStart(int, "0") + this.decimal.padEnd(dec, "0");
    }
    setDecimalPoint(decimalPoint){
        const number = this.getNumber();
        const decimal = number.length - decimalPoint;
        this.integer = number.slice(0, decimal);
        this.decimal = number.slice(decimal);
    }
    toString(){
        return (this.sign ? "+" : "-").concat(
            this.integer,
            this.decimal
                ? `.${this.decimal}`
                : ""
        );
    }
    /**
     * メソッド版add
     *
     * @param {number} number
     * @returns
     * @memberof BigFloat
     */
    increment(number=1){
        this.setNumber(BigFloat.addition(this, number));
        return this;
    }
    /**
     * メソッド版sub
     *
     * @param {number} number
     * @returns
     * @memberof BigFloat
     */
    decrement(number=1){
        this.setNumber(BigFloat.subtraction(this, number));
        return this;
    }
    /**
     * Beta:
     * Convert argument to BigFloat perform addition
     * FIXME: 小数点以下に0があると省略される
     * @static
     * @param {BigNumber} target
     * @param {BigNumber} addNum
     * @returns {BigFloat} result
     * @memberof BigFloat
     */
    static addition(target, addNum){
        target = new BigFloat(target);
        addNum = new BigFloat(addNum);
        const integerDigits = Math.max(target.integer.length, addNum.integer.length);
        const decimalDigits = Math.max(target.decimal.length, addNum.decimal.length);
        const sumValue = zip([
            [...target.getNumber(integerDigits, decimalDigits)],
            [...addNum.getNumber(integerDigits, decimalDigits)]
        ]).reduceRight((total, [targetNumber, addNumber])=>{
            targetNumber = Number(targetNumber);
            addNumber = Number(addNumber);
            const fst = Number(first(total));
            const subtotal = String(fst + targetNumber + addNumber);
            return splice(total, 0, 1, subtotal.padStart(2, "0"));
        }, "0");
        const result = new BigFloat(sumValue);
        result.setDecimalPoint(decimalDigits);
        return result;
    }
    /**
     * Alpha:
     * Convert argument to BigFloat and perform subtraction
     * @static
     * @param {BigNumber} target
     * @param {BigNumber} subNum
     * @returns {BigFloat} result
     * @memberof BigFloat
     */
    static subtraction(target, subNum){
        subNum = new BigFloat(subNum);
        subNum.sign = !subNum.sign;
        return BigFloat.addition(target, subNum);
    }
    /**
     * Beta:
     * FIXME: 桁がずれる
     * @static
     * @param {BigNumber} target
     * @param {BigNumber} mulNum
     * @returns {BigFloat} result
     * @memberof BigFloat
     */
    static multiplication(target, mulNum){
        target = new BigFloat(target);
        mulNum = new BigFloat(mulNum);
        const targetNumbers = [...target.getNumber()].map(Number);
        const sumValue = [
            ...mulNum.getNumber()
        ].reduceRight((total, mulNumber)=>{
            mulNumber = Number(mulNumber);
            const subtotal = targetNumbers.reduceRight((total2, targetNumber)=>{
                const fst = Number(first(total2));
                const subtotal2 = String(fst + mulNumber * targetNumber);
                return splice(total2, 0, 1, subtotal2.padStart(2, "0"));
            }, "0");
            return BigFloat.addition(total, subtotal);
        }, "0");
        const result = new BigFloat(sumValue);
        result.setDecimalPoint(target.decimal.length + mulNum.decimal.length);
        return result;
    }
    /**
     * TODO:
     * @static
     * @param {*} number
     * @returns
     * @memberof BigFloat
     */
    static division(number){
        const bigfloat = new BigFloat(number);
        return this;
    }
    static parse(number){
        number = String(number);
        return NumToStr(number);
    }
    static equals(...numbers){
        numbers = numbers.map(number=>(
            new BigFloat(number).toString()
        ));
        let prev = numbers.shift();
        return numbers.every(number=>(
            prev === (prev = number)
        ));
    }

    // sur(number){
    //     return this;
    // }
    // static eval(formula){
    //     for(const character of formula){
    //         if(character === "\s")
    //             continue;
    //     }
    // }
}

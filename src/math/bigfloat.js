
// @ts-check

import {Num2FracStr as num2FracStr} from "../lib/Num2DecStr";
import {first, last, index, splice} from "../utility/getIndex";
import {zip, forOf, isNegative, forIndex} from "../utility/index";
import {isString, isNumber} from "../utility/is/index";

/**
 * @typedef {Number|String|BigFloat} NumberTypes
 */

/**
 * WIP: In development.
 *
 * Alpha: 正負符号非対応、四則演算対応できてない、バグあり。
 * @export
 * @class BigFloat
 */
export class BigFloat {
    /**
     * Creates an instance of BigFloat.
     * @param {NumberTypes} number
     * @memberof BigFloat
     */
    constructor(number=0){
        this.setNumber(number);
        this.format();
        /**
         * 少数点以下有効桁数
         * @type {Object}
         */
        this.digits = {
            integer: 100,
            decimal: 16,
            valid: 16
        };
    }
    /**
     * @readonly
     * @memberof BigFloat
     */
    // eslint-disable-next-line class-methods-use-this
    get [Symbol.toStringTag](){
        return "BigFloat";
    }
    /**
     * @readonly
     * @memberof BigFloat
     */
    get sign(){
        return this.isPositive ? "+" : "-";
    }
    /**
     * 引数の数字をthisのBigfloatに代入
     *
     * @param {NumberTypes} number
     * @memberof BigFloat
     */
    setNumber(number){
        number = String(number);
        const [fst] = number;
        // 正負符号
        this.isPositive = fst !== "-";
        number = fst === "-" || fst === "+"
            ? number.slice(1) : number;
        const point = number.indexOf(".");
        const decimalPoint = point !== -1 ? point : Infinity;
        this.integer = number.slice(0, decimalPoint);
        this.decimal = number.slice(decimalPoint + 1);
    }
    /**
     * integer, decimalのpaddingを指定して数字を取得
     *
     * @param {Number} int integerのpadding
     * @param {Number} dec decimalのpadding
     * @return {Number[]} full number
     * @memberof BigFloat
     */
    getNumber(int=1, dec=0){
        const _ = this.integer.padStart(int, "0") + this.decimal.padEnd(dec, "0");
        const result = [];
        forIndex(_.length, index=>{
            result.push(Number(_[index]));
        });
        return result;
    }
    setDecimalPoint(decimalPoint){
        const number = this.getNumber().join("");
        const decimal = number.length - decimalPoint;
        this.integer = number.slice(0, decimal);
        this.decimal = number.slice(decimal);
    }
    format(){
        this.integer = this.integer.replace(/^0+/, "");
        this.decimal = this.decimal.replace(/0+$/, "");
        return this;
    }
    toString(){
        return this.sign.concat(
            this.integer || "0",
            this.decimal
                ? `.${this.decimal}`
                : ""
        );
    }
    /**
     * メソッド版add
     *
     * @param {number} number
     * @return
     * @memberof BigFloat
     */
    increment(number=1){
        this.setNumber(BigFloat.addition(this, number));
        return this;
    }
    /**
     * メソッド版sub
     *
     * WARNING: 内部的にsubtractionを使用しているため、使用不可
     * @param {number} number
     * @return
     * @memberof BigFloat
     */
    decrement(number=1){
        this.setNumber(BigFloat.subtraction(this, number));
        return this;
    }
    /**
     * @static
     * @param {BigFloat} n1
     * @param {BigFloat} n2
     * @returns
     * @memberof BigFloat
     */
    static max2(n1, n2){
        if(n1.integer.length !== n2.integer.length)
            return n1.integer.length > n2.integer.length
                ? n1 : n2;
        const digits = {
            integer: Math.max(n1.integer.length, n2.integer.length),
            decimal: Math.max(n1.decimal.length, n2.decimal.length),
        };
        const sumValue = zip([
            n1.getNumber(digits.integer, digits.decimal),
            n2.getNumber(digits.integer, digits.decimal)
        ]);
        return forOf(sumValue, ([num1, num2])=>(
            num1 !== num2 ? (num1 > num2 ? num1 : num2) : void 0
        ));
    }
    /**
     * Convert argument to BigFloat perform addition
     *
     * FIXME: 符号が正しくない。
     * @static
     * @param {NumberTypes} target
     * @param {NumberTypes} addNum
     * @return {BigFloat} result
     * @memberof BigFloat
     */
    static addition(target, addNum){
        target = new BigFloat(target);
        addNum = new BigFloat(addNum);
        if(target.isPositive !== addNum.isPositive){
            addNum.isPositive = !addNum.isPositive;
            return BigFloat.subtraction(target, addNum);
        }
        const digits = {
            integer: Math.max(target.integer.length, addNum.integer.length),
            decimal: Math.max(target.decimal.length, addNum.decimal.length),
        };
        const sumValue = zip([
            target.getNumber(digits.integer, digits.decimal),
            addNum.getNumber(digits.integer, digits.decimal)
        ]).reduceRight((total, [targetNumber, addNumber])=>{
            const carry = Number(first(total));
            const subtotal = String(carry + targetNumber + addNumber);
            return splice(total, 0, 1, subtotal.padStart(2, "0"));
        }, "0");
        const result = new BigFloat();
        result.setNumber(sumValue);
        result.setDecimalPoint(digits.decimal);
        result.isPositive = target.isPositive;
        return result.format();
    }
    /**
     * Alpha:
     * Convert argument to BigFloat and perform subtraction
     *
     * HACK: let多すぎ問題。もっとスコープを絞りたい。
     *
     * WARNING: 途中の桁消えてる可能性あり。splice流用してfirst消して大丈夫か？
     *
     * FIXME: 符号が正しくない。
     * @static
     * @param {NumberTypes} target
     * @param {NumberTypes} subNum
     * @return {BigFloat} result
     * @memberof BigFloat
     */
    static subtraction(target, subNum){
        target = new BigFloat(target);
        subNum = new BigFloat(subNum);
        if(target.isPositive !== subNum.isPositive){
            subNum.isPositive = !subNum.isPositive;
            return BigFloat.addition(target, subNum);
            /*
            NOTE:
            (+9 - +1) = (+9 + -1) = +8 : -
            (+1 - +9) = (+1 + -9) = -8 : -

            (-9 - -1) = (-9 + +1) = -8 : -
            (-1 - -9) = (-1 + +9) = +8 : -

            (+9 - -1) = (+9 + +1) = +10 : +
            (+1 - -9) = (+1 + +9) = -10 : +

            (-9 - +1) = (-9 + -1) = -10 : +
            (-1 - +9) = (-1 + -9) = +10 : +
            */
        }
        const digits = {
            integer: Math.max(target.integer.length, subNum.integer.length),
            decimal: Math.max(target.decimal.length, subNum.decimal.length),
        };
        let borrow = false;
        let sumValue = zip([
            target.getNumber(digits.integer, digits.decimal),
            subNum.getNumber(digits.integer, digits.decimal)
        ]).reduceRight((total, [targetNumber, addNumber])=>{
            // IDEA: const borrow = Number(last(total));
            let subtotal = targetNumber - addNumber - Number(borrow);
            borrow = isNegative(subtotal);
            if(borrow)subtotal += 10;
            return splice(total, 0, 1, String(Math.abs(subtotal)).padStart(2, "0"));
        }, "0");
        if(borrow){
            const big = `1${"0".repeat(sumValue.length - 1)}`;
            sumValue = BigFloat.subtraction(big, sumValue);
            // IDEA:
            // sumValue = [...sumValue].map(char=>(
            //     10 - Number(char)
            // )).join("");
        }
        const result = new BigFloat();
        result.setNumber(sumValue);
        result.setDecimalPoint(digits.decimal);
        // FIXME: 正しくない。大小によって判断すべき
        const max2 = BigFloat.max2(target, subNum);
        result.isPositive = max2 === subNum
            ? !subNum.isPositive
            : target.isPositive;
        return result.format();
    }
    /**
     * Beta:
     *
     * FIXME: 桁がずれるため使い物にならない
     * @static
     * @param {NumberTypes} target
     * @param {NumberTypes} mulNum
     * @return {BigFloat} result
     * @memberof BigFloat
     */
    static multiplication(target, mulNum){
        target = new BigFloat(target);
        mulNum = new BigFloat(mulNum);
        const targetNumbers = target.getNumber();
        const mulNumbers = mulNum.getNumber();
        const sumValue = mulNumbers.reduceRight((total, mulNumber)=>{
            const subtotal = targetNumbers.reduceRight((total2, targetNumber)=>{
                const fst = Number(first(total2));
                const subtotal2 = String(fst + mulNumber * targetNumber);
                return splice(total2, 0, 1, subtotal2.padStart(2, "0"));
            }, "0");
            return BigFloat.addition(total, subtotal).toString();
        }, "0");
        const result = new BigFloat();
        result.setNumber(sumValue);
        result.setDecimalPoint(target.decimal.length + mulNum.decimal.length);
        result.isPositive = target.isPositive === mulNum.isPositive;
        return result.format();
    }
    /**
     * TODO:
     * @static
     * @param {NumberTypes} target
     * @param {NumberTypes} divNum
     * @param {Number} validDigit
     * @return
     * @memberof BigFloat
     */
    static division(target, divNum, validDigit=32){
        target = new BigFloat(target);
        divNum = new BigFloat(divNum);
        const sumValue = null;
        const result = new BigFloat();
        result.setNumber(sumValue);
        result.setDecimalPoint();
        return result.format();
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
}

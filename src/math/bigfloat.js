
// @ts-check

import { first, splice } from "../utility/getIndex";
import { doWhile, equals, forIndex, forOf, previous, substitute, zip } from "../utility/index";
import { isInfinity, isNegative, isNull, isNumber, isPositive, isString, isBoolean } from "../utility/is/index";

/**
 * @typedef {Number | String | BigFloat} NumberTypes
 */

const isSafe = (target)=>(
    target.integer.length < 16 && !target.decimal
);

/**
 * WIP: In development.
 *
 * Alpha: 符号一部バグあり、除算対応できてない、おそらく他にもバグあり。
 *
 * OPTIMIZE: 桁が増えたときのパフォーマンスがひどい。
 *
 * IDEA: Stringによって1桁ずつ保存ではなく、
 * 乗算でNumber.MAX_SAFE_INTEGERを超えない7桁ずつArrayに保存
 *
 * IDEA: getNumberで数値リテラルのカット桁数を指定
 * "12345671234567", 7 => [1234567, 1234567]
 * 加算/減産は15桁、乗算は7桁でカット
 *
 * IDEA: 数値ごとに有効桁数を保存して除算時に計算・使用する
 * @export
 * @class BigFloat
 */
export class BigFloat {
    /**
     * Creates an instance of BigFloat.
     * @memberof BigFloat
     * @param {NumberTypes} number
     */
    constructor(number=0){
        this.setNumber(number);
        this.format();
        /**
         * 少数点以下有効桁数
         * @type {Object}
         */
        this.digits = {
            integer: 1000,
            decimal: 100,
            valid: 16
        };
    }
    /**
     * @readonly
     * @memberof BigFloat
     */
    // eslint-disable-next-line class-methods-use-this
    // get [Symbol.toStringTag](){
    //     return "BigFloat";
    // }
    /**
     * @memberof BigFloat
     */
    sign(){
        return this.isPositive ? "+" : "-";
    }
    setSign(sign){
        this.isPositive
            = isString(sign) ? first(sign) !== "-"
            : isNumber(sign) ? isPositive(sign)
            : isBoolean(sign) ? sign
            : sign instanceof BigFloat ? sign.isPositive
            : null;
    }
    /**
     * 引数の数字をthisのBigfloatに代入
     *
     * @memberof BigFloat
     * @param {NumberTypes} number
     */
    setNumber(number){
        // @ts-ignore
        if(Number.isNaN(number) || isInfinity(number)){
            this.exception = number;
            // @ts-ignore
            number = (Math.sign(number) || "").toString().slice(0, 1);
        }else // IDEA: 無限、循環小数等
            this.exception = null;
        number = String(number);
        const [fst] = number;
        // 正負符号
        this.setSign(fst);
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
     * @memberof BigFloat
     * @param {Number} int integerのpadding
     * @param {Number} dec decimalのpadding
     * @return {Number[]} full number
     */
    getNumber(int=1, dec=0){
        const _ = this.integer.padStart(int, "0") + this.decimal.padEnd(dec, "0");
        const result = [];
        forIndex(_.length, (index)=>{
            result.push(Number(_[index]));
        });
        return result;
    }
    setDecimalPoint(decimalPoint=0){
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
        return (!isNull(this.exception)
            ? String(this.exception)
            : this.sign().concat(
                this.integer || "0",
                this.decimal
                    ? `.${this.decimal}`
                    : ""
            ));
    }
    valueOf(){
        return substitute([this.exception, this.toString()]);
    }
    /**
     * メソッド版add
     * @memberof BigFloat
     * @param {number} number
     * @return
     */
    increment(number=1){
        this.setNumber(BigFloat.addition(this, number));
        return this;
    }
    /**
     * メソッド版sub
     * @memberof BigFloat
     * @param {number} number
     * @return
     */
    decrement(number=1){
        this.setNumber(BigFloat.subtraction(this, number));
        return this;
    }
    trunc(cutCount=0){
        this.decimal = this.decimal.slice(0, cutCount);
        return this;
    }
    floor(cutCount=0){
        return this.trunc(cutCount);
    }
    ceil(cutCount=0){
        const fst = first(this.decimal, cutCount);
        if(fst)this.increment();
        return this.trunc(cutCount);
    }
    /**
     * 四捨五入
     * 正の無限大の方向ではなく0から遠ざかる次の整数に丸められます。
     *
     * @memberof BigFloat
     * @param {number} [cutCount=0]
     * @returns
     */
    round(cutCount=0){
        const fst = Number(first(this.decimal, cutCount));
        if(fst >= 5)this.increment();
        return this.trunc(cutCount);
    }
    /**
     * @memberof BigFloat
     * @static
     * @param {BigFloat} n1
     * @param {BigFloat} n2
     * @returns
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
     * Beta: 加算
     * Convert argument to BigFloat perform addition
     *
     * FIXME: 符号が正しくない。
     * @memberof BigFloat
     * @static
     * @param {NumberTypes} target
     * @param {NumberTypes} addNum
     * @return {BigFloat} result
     */
    static addition(target, addNum){
        target = new BigFloat(target);
        addNum = new BigFloat(addNum);
        // Numberで計算可能ならNumberで計算
        if(isSafe(target) && isSafe(addNum))
            return new BigFloat(Number(target) + Number(addNum));
        // 符号が異なる場合、符号を反転して減算
        if(target.isPositive !== addNum.isPositive){
            addNum.setSign(!addNum.isPositive);
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
        result.setSign(target);
        return result.format();
    }
    /**
     * Beta: 減算
     * Convert argument to BigFloat and perform subtraction
     *
     * HACK: let多すぎ問題。もっとスコープを絞りたい。
     *
     * WARNING: 途中の桁消えてる可能性あり。splice流用してfirst消して大丈夫か？
     *
     * FIXME: 符号が正しくない。
     * @memberof BigFloat
     * @static
     * @param {NumberTypes} target
     * @param {NumberTypes} subNum
     * @return {BigFloat} result
     */
    static subtraction(target, subNum){
        target = new BigFloat(target);
        subNum = new BigFloat(subNum);
        // Numberで計算可能ならNumberで計算
        if(isSafe(target) && isSafe(subNum))
            return new BigFloat(Number(target) - Number(subNum));
        // 符号が異なる場合、符号を反転して加算
        if(target.isPositive !== subNum.isPositive){
            subNum.setSign(!subNum.isPositive);
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
     * Beta: 乗算
     *
     * FIXME: 桁がずれるため使い物にならない
     * @memberof BigFloat
     * @static
     * @param {NumberTypes} target
     * @param {NumberTypes} mulNum
     * @return {BigFloat} result
     */
    static multiplication(target, mulNum){
        target = new BigFloat(target);
        mulNum = new BigFloat(mulNum);
        // 項のどちらかが0なら0を返す。
        if(BigFloat.equals(target, 0) || BigFloat.equals(mulNum, 0))
            return new BigFloat();
        // Numberで計算可能ならNumberで計算
        const sumLength = target.integer.length + mulNum.integer.length;
        if(sumLength < 16 && !target.decimal && !mulNum.decimal)
            return new BigFloat(Number(target) * Number(mulNum));
        // 計算
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
        result.setSign(target.isPositive === mulNum.isPositive);
        return result.format();
    }
    power(){}
    /**
     * Alpha: 除算
     *
     * FIXME: 符号によっては無限ループ
     * @memberof BigFloat
     * @static
     * @param {NumberTypes} target
     * @param {NumberTypes} divNum
     * @param {Number} validDigit
     * @return
     */
    static division(target, divNum, validDigit=32){
        target = new BigFloat(target);
        divNum = new BigFloat(divNum);
        if(BigFloat.equals(divNum, Infinity))
            return new BigFloat();
        if(BigFloat.equals(divNum, -Infinity))
            return new BigFloat(-0);
        if(BigFloat.equals(divNum, 0))
            return new BigFloat(NaN);
        if(BigFloat.equals(target, 0))
            return new BigFloat();
        const sumValue = forIndex(Infinity, /** @param {Number} i*/ (i)=>{
            target = BigFloat.subtraction(target, divNum);
            return target.isPositive ? void 0 : i;
        });
        const result = new BigFloat();
        result.setNumber(sumValue);
        result.setDecimalPoint();
        return result.format();
    }
    /**
     * Alpha: 余剰
     *
     * @memberof BigFloat
     * @static
     * @param {NumberTypes} dividend 被除数(割られる数)
     * @param {NumberTypes} divisor 除数(割る数)
     * @returns
     */
    static surplus(dividend, divisor){
        let terget = new BigFloat(dividend);
        const divisor_ = new BigFloat(divisor);
        divisor_.setSign(terget);
        const result = new BigFloat(doWhile((Continue)=>{
            const subQuotient = BigFloat.subtraction(terget, divisor_);
            if(BigFloat.equals(subQuotient, 0))
                return 0;
            if(terget.isPositive === subQuotient.isPositive){
                terget = subQuotient;
                return Continue;
            }
            return terget;
        }));
        result.setSign(terget);
        return result;
    }
    /**
     * WIP: In development
     *
     * @memberof BigFloat
     * @static
     * @param {NumberTypes} dividend
     * @param {NumberTypes} divisor
     * @param {Number} [maxDigit=100]
     * @returns
     */
    static div_WIP(dividend, divisor, maxDigit=100){
        const quotientList_商 = [];
        let isComplete = false;
        const remainders = [];
        // 小数部の桁数が maxFractionPartLength に到達するまでループで処理する。
        // 割り切れたり、循環節を検出できた等の理由で、除算が完了した場合はtrue。
        // 桁数の不足等で除算が完了していない場合はfalse。
        const recurringStartIndex = forIndex(maxDigit, ()=>{
            const remainder = Number(BigFloat.surplus(dividend, divisor));
            // 除算の商を求める。被除数から剰余を減算しておくことで、割り切れる除算を実行する。
            quotientList_商.push((dividend - remainder) / divisor);
            if(remainder === 0){
                // 割り切れた
                isComplete = true;
                return -1;
            }
            const recurringStartIndex = remainders.indexOf(remainder);
            if(recurringStartIndex !== -1){
                // 循環節を検出
                isComplete = true;
                return recurringStartIndex;
            }
            dividend = remainder * 10;
            remainders.push(remainder);
            return void 0;
        });
        const loopPoint = recurringStartIndex === -1 ? Infinity : recurringStartIndex;
        const integer = quotientList_商.shift();
        const decimal = quotientList_商.slice(0, loopPoint);
        const 循環小数 = quotientList_商.slice(loopPoint);
        return { integer, decimal, 循環小数, isComplete };
    }
    /**
     *
     *
     * @memberof BigFloat
     * @static
     * @param {NumberTypes[]} numbers
     * @returns
     */
    static equals(...numbers){
        numbers = numbers.map((number)=>(
            new BigFloat(number).toString()
        ));
        return equals(...numbers);
    }
}

(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (global = global || self, factory(global.rei = {}));
}(this, (function (exports) { 'use strict';

    const isUndefined = value=>(
        value === void 0
    );
    const isNull = value=>(
        value === null || isUndefined(value)
    );
    const isRegExp = obj=>(
        modules.typeof(obj) === "regexp"
    );
    const isObject = obj=>{
        const type = typeof obj;
        return type === "function" || type === "object" && obj !== null;
    };
    const isEmpty = value=>{
        if(typeof value === "string" || Array.isArray(value))
            return value.length === 0;
        if(typeof value === "object")
            return modules.allKeys(value).length === 0;
        return false;
    };
    const isNegative = value=>{
        if(typeof value === "number")
            return value < 0;
        if(typeof value === "boolean")
            return !value;
        return false;
    };

    const gurop = (array, func)=>{
        result = new Map();
        for(const value of array){
            const key = func(value);
            const values = result.get(key) || [];
            values.push(value);
            result.set(key, values);
        }
        return result;
    };
    // export const partition = (array, func)=>{};
    // INFO: findのマッチした数版
    const count = (array, func)=>{
        let number = 0;
        for(const value of array)
            number += Boolean(func(value));
        return number;
    };
    const previous = (level, func, arg)=>{
        for(;level--;)
            arg = func(arg);
        return arg;
    };
    const inorder = (arg, ...funcs)=>{
        for(const func of funcs)
            arg = func(arg);
        return arg;
    };
    // TODO: iterate - 何でもループ"できるようにする"やつ
    const iterate = function* (value){
        if(value[Symbol.iterator])
            yield* value;
    };

    const equals = (...values)=>{
        // SameValueZero
        let prev = values.shift();
        return values.every(value=>(
            Number.isNaN(prev)
                ? Number.isNaN(prev=value)
                : prev===(prev=value)
        ));
    };

    const last = (array, index=1)=>(
        array[array.length - index]
    );
    const zip = function* (...arrays){
        if(typeof last(arrays) === "function"){
            const func = arrays.pop();
            arrays = arrays.map(func);
        }
        const max = arrays.reduce((length, array)=>(
            Math.max(length, array.length)
        ), 0);
        for(let i=0;max>i;i++){
            yield arrays.reduce((iarrays, array)=>{
                iarrays.push(array[i]);
                return iarrays;
            }, []);
        }
    };
    const through = function* (start, end, increment){
        increment = Math.abs(increment || 1);
        if(start > end)increment = -increment;
        while(Math.abs(start - end) >= Math.abs(increment)){
            yield start;
            start += increment;
        }
        yield start;
    };

    // TEMP:
    // export class ArrayLike extends Array {
    //     constructor(){
    //         super();
    //         console.log(this);
    //     }
    // }
    // export class Temp {
    //     constructor(){
    //         this.gen = this.gen.bind(this);
    //         return this.gen;
    //     }
    //     gen(){
    //         console.log(this);
    //         return this.gen;
    //     }
    // }
    // export class Memo {
    //     constructor(func){
    //         this.function = func;
    //         this.existing = new Map();
    //     }
    //     execute(args){
    //         if(this.existing.has(args))
    //             return this.existing.get(args);
    //         const result = execute(this.function, args);
    //         this.existing.set(args, result);
    //         return result;
    //     }
    // }
    // String instruction
    const execute = (func, args)=>func.apply(null, args);
    const typeOf = object=>(
        Object.prototype.toString.call(object).slice(8, -1)
    );
    // TODO: require
    const substitute = (value, substitute)=>(
        isNull(value)
            ? substitute
            : value
    );
    const tryCall = (value, args, that=null)=>(
        typeof value === "function"
            ? value.apply(that, args)
            : value
    );
    // export const and = (...arrays)=>{}
    // export const xor = (...arrays)=>{}
    const debounce = (func, wait)=>{
        let id;
        return function(){
            clearTimeout(id);
            id = setTimeout(func.apply, wait, this, arguments);
        }
    };
    const uniq = array=>{
        const existings = [];
        return array.filter(value=>{
            const existing = existings.includes(value);
            if(!existing)existings.push(value);
            return !existing;
        });
    };

    var index = /*#__PURE__*/Object.freeze({
        __proto__: null,
        execute: execute,
        typeOf: typeOf,
        substitute: substitute,
        tryCall: tryCall,
        debounce: debounce,
        uniq: uniq,
        isUndefined: isUndefined,
        isNull: isNull,
        isRegExp: isRegExp,
        isObject: isObject,
        isEmpty: isEmpty,
        isNegative: isNegative,
        gurop: gurop,
        count: count,
        previous: previous,
        inorder: inorder,
        iterate: iterate,
        equals: equals,
        zip: zip,
        through: through
    });

    const has = (object, propName)=>(
        Object.hasOwnProperty.call(object, propName)
    );
    const allKeys = object=>{
        const propNames = Object.getOwnPropertyNames(object);
        const symbols = Object.getOwnPropertySymbols(object);
        return [...propNames, ...symbols];
    };
    const watchMap = new WeakMap();
    const watch = (obj, propName, func)=>{
        const descriptors = watchMap.has(obj)
            ? watchMap.get(obj) : {};
        const descriptor = Object.getOwnPropertyDescriptor(obj, propName);
        if(!descriptor.hasOwnProperty("value"))
            return;
        descriptors[propName] = descriptor;
        watchMap.set(obj, descriptors);
        let value = obj[propName];
        Object.defineProperty(obj, propName, {
            get: ()=>value,
            set: newValue=>{
                func(value, value = newValue);
            },
            enumerable: true,
            configurable: true
        });
    };
    const watchStop = (obj, propName)=>{
        const descriptor = watchMap.get(obj)[propName];
        Object.defineProperty(obj, propName, {
            ...descriptor,
            value: obj[propName]
        });
    };
    /*
    reiyayakkoPackage.addModule({
        name: "object.structure",
        variable(variable){
            variable.apply = (base, apply, name, nameTo=name)=>{
                if(typeof apply[name] === "object")
                    variable.modules.structure(base[nameTo], apply[name]);
                else
                    base[nameTo] = apply[name];
            };
        }
    }, ({modules, apply})=>(baseObj={}, applyObj={})=>{
        for(const propName of modules.object.allKeys(applyObj)){
            if(typeof propName === "string"){
                const propNames = propName.split(".");
                const deepestPropName = propNames.pop();
                let obj = baseObj;
                for(const name of propNames)
                    obj = (obj[name] = {});
                apply(obj, applyObj, propName, deepestPropName);
            }else{
                apply(baseObj, applyObj, propName);
            }
        }
        return baseObj;
    });
    reiyayakkoPackage.addModule("object.Map", ({modules})=>class ObjectMap {
        constructor(map){
            this.map = [];
        }
        static _find(key){
            return ([entryKey])=>modules.equals(entryKey, key);
        }
        get size(){
            return this.map.length;
        }
        get(key){
            return this.map.find(modules.object.Map._find(key));
        }
        set(key, value){
            const index = this.map.findIndex(modules.object.Map._find(key));
            if(index === -1)
                this.map.push([key, value]);
            else
                this.map[index] = [key, value];
        }
        has(key){
            const index = this.map.findIndex(modules.object.Map._find(key));
            return index !== -1;
        }
        delete(key){
            const index = this.map.findIndex(modules.object.Map._find(key));
            if(index === -1)
                return false;
            this.map.splice(index, 1);
            return true;
        }
        clear(){
            this.map = [];
        }
        entries(){
            return this.map.map(entry=>entry);
        }
        forEach(){
            this.map.forEach(...arguments);
        }
        keys(){
            return this.map.map(([key])=>key);
        }
        values(){
            return this.map.map(([,value])=>value);
        }
        [Symbol.iterator](){
            const that = this;
            return (function* (){
                for(const entry of that.map)
                    yield entry;
            })();
        }
    });
    reiyayakkoPackage.addModule({
        name: ["object.Map.prototype", Symbol.toStringTag],
        enumerable: false,
    }, ()=>"ObjectMap");
    //*/

    var index$1 = /*#__PURE__*/Object.freeze({
        __proto__: null,
        has: has,
        allKeys: allKeys,
        watch: watch,
        watchStop: watchStop
    });

    /**
     * 数値を整数・少数表記に変換する。
     * 内部的には、指数表記の文字列をパースし、小数表記に変換している。
     *
     * @param {number|string} number 変換したい数値、または数値形式の文字列。
     *     数値型であればNaNやInfinityも指定できるが、そのまま文字列化して返される。
     * @return {string} 小数表記の数値文字列
     * @throws 適切な形式の数値、または文字列が与えられなかった場合に発生する。
     *
     * Note: この関数は、JavaScriptで正確な数値演算を行うために使う**べきではない**。
     *       この関数でなければ変換できない数値は、JavaScriptの内部データの時点で誤差が発生しており、正確な演算は期待できない。
     *       また、この関数によって変換された数値が厳密に正しい事も保証しない。
     *       この関数は、JavaScriptで生成した数値を「見やすく表示する」ためにのみ使用するべきである。
     * Note: この関数の設計が正しければ（つまり、バグが無ければ）、エラーが発生するのは誤った形式の文字列を与えられた場合のみとなる。
     *       逆に言えば、数値のプリミティブ型が与えられた場合は、いかなる場合でもエラーは発生しないはずである。
     *       もし、数値が与えられた場合にもエラーが発生してしまった場合は、この関数のバグを修正する必要がある。
     */
    const Num2FracStr$1 = number => {
      /*
       * 引数の値を文字列化
       */
      const numStr = String(number);

      /*
       * 正規表現でマッチング
       */
      const match = numStr.match(/^([+-]?)0*([1-9][0-9]*|)(?:\.([0-9]*[1-9]|)0*)?(?:[eE]([+-]?[0-9]+))?$/);

      /*
       * 引数の型が適切な形式ではない場合…
       */
      if (!match) {
        if (typeof number == "number") {
          /*
           * 引数の型が数値であれば、文字列化した値をそのまま返す
           */
          return numStr;
        } else {
          /*
           * 引数の型が数値でなければ、エラーにする
           */
          throw new Error(`Invalid Number: "${numStr}"`);
        }
      }

      /** @type {string} 数の符号 */
      const sign = (match[1] === "-" ? "-" : "");
      /** @type {string} 仮数部の整数部 */
      const mantissa_int = match[2];
      /** @type {string} 仮数部の少数部 */
      const mantissa_frac = (match[3] ? match[3] : "");
      /** @type {number} 指数部 */
      const exponent = Number(match[4]);

      let returnValue = "";

      if (exponent) {
        /*
         * exponentがundefinedではなく（正規表現で指数部がマッチしていて）、
         * かつ、0ではない場合、指数表記として処理を開始する
         *
         * Note: 指数部が0の場合、ここで処理する意味は無いので少数表記として処理する。
         *       よって、指数部が0以外の場合にここで処理する。
         * Note: undefinedは数値化されるとNaNになり、false相当となる。
         *       一方、0の場合もfalse相当となる。
         *       ので、↑の条件文はコレで合っている。
         */

        /** @type {string} */
        const mantissa_str = mantissa_int + mantissa_frac;
        /** @type {number} */
        const mantissa_len = mantissa_str.length;

        if (0 < mantissa_len) {
          /** @type {number} */
          const mantissa_int_len = mantissa_int.length + exponent;
      
          /*
          12.145e+7  121450000             ;  mantissa_str: "12145"  mantissa_int_len: 9   ;  小数部が存在しない数値
          12.145e+6   12145000             ;  mantissa_str: "12145"  mantissa_int_len: 8   ;  小数部が存在しない数値
          12.145e+5    1214500             ;  mantissa_str: "12145"  mantissa_int_len: 7   ;  小数部が存在しない数値
          12.145e+4     121450             ;  mantissa_str: "12145"  mantissa_int_len: 6   ;  小数部が存在しない数値
          12.145e+3      12145             ;  mantissa_str: "12145"  mantissa_int_len: 5   ;  小数部が存在しない数値
          12.145e+2       1214.5           ;  mantissa_str: "12145"  mantissa_int_len: 4   ;  小数部が存在し、かつ、1より大きい数値
          12.145e+1        121.45          ;  mantissa_str: "12145"  mantissa_int_len: 3   ;  小数部が存在し、かつ、1より大きい数値
          12.145e0          12.145         ;  mantissa_str: "12145"  mantissa_int_len: 2   ;  小数部が存在し、かつ、1より大きい数値
          12.145e-1          1.2145        ;  mantissa_str: "12145"  mantissa_int_len: 1   ;  小数部が存在し、かつ、1より大きい数値
          12.145e-2          0.12145       ;  mantissa_str: "12145"  mantissa_int_len: 0   ;  小数部が存在し、かつ、1未満の数値
          12.145e-3          0.012145      ;  mantissa_str: "12145"  mantissa_int_len: -1  ;  小数部が存在し、かつ、1未満の数値
          12.145e-4          0.0012145     ;  mantissa_str: "12145"  mantissa_int_len: -2  ;  小数部が存在し、かつ、1未満の数値
          12.145e-5          0.00012145    ;  mantissa_str: "12145"  mantissa_int_len: -3  ;  小数部が存在し、かつ、1未満の数値
          12.145e-6          0.000012145   ;  mantissa_str: "12145"  mantissa_int_len: -4  ;  小数部が存在し、かつ、1未満の数値
          12.145e-7          0.0000012145  ;  mantissa_str: "12145"  mantissa_int_len: -5  ;  小数部が存在し、かつ、1未満の数値
          */

          if (mantissa_len <= mantissa_int_len) {
            /*
             * 小数部が存在しない数値（ex: 0, 12, 176, 1214500）の場合の処理
             */
            returnValue = mantissa_str.padEnd(mantissa_int_len, "0");

          } else if (0 < mantissa_int_len) {
            /*
             * 小数部が存在し、かつ、1より大きい数値（ex: 1.26, 1.0009, 121.45）の場合の処理
             */
            returnValue = mantissa_str.slice(0, mantissa_int_len) + "." + mantissa_str.slice(mantissa_int_len);

          } else {
            /*
             * 小数部が存在し、かつ、1未満の数値（ex: 0.26, 0.20098, 0.0012145）の場合の処理
             */
            returnValue = "0." + "0".repeat(-mantissa_int_len) + mantissa_str;
          }
        }

      } else if (mantissa_frac) {
        /*
         * 少数表記の場合
         */
        returnValue = (mantissa_int || "0") + "." + mantissa_frac;

      } else if (mantissa_int) {
        /*
         * 整数表記の場合
         */
        returnValue = mantissa_int;
      }

      return (returnValue) ? sign + (
        returnValue
          /* 先頭の余計なゼロを削除 */
          .replace(/^(?:0(?!\.|$))+/, "")
          /* 末尾の余計なゼロを削除 */
          .replace(/(?:\.0+|(\.[0-9]*[1-9])0+)$/, "$1")
      ) : "0";
    };

    const Num = number=>{
        const [integer, decimal] = String(number).split(".");
        return {integer, decimal, negative};
    };
    class BigFloat {
        constructor(number){
            const [integer, decimal] = Num2FracStr(number).split(".");
            this.integer = integer || "";
            this.decimal = decimal || "";
            this.negative = false;
        }
        toString(){
            const number = this.integer + (this.decimal && "." + this.decimal);
            return (this.negative ? "-" : "+").concat(number);
        }
        _typeCheck(valuue){
            return Number.isNaN(valuue)
                || (
                    typeof valuue !== "string"
                    && !Number.isFinite(valuue)
                )
        }
        add(number){
            if(this._typeCheck(number))return this;
            const bigfloat = number instanceof BigFloat
                ? number : new BigFloat(number);
            let carry = false;
            const integerLength = Math.max(bigfloat.integer.length, this.integer.length);
            const decimalLength = Math.max(bigfloat.decimal.length, this.decimal.length);
            const number1 = [
                ...this.integer.padStart(integerLength, "0"),
                ...[...this.decimal.padEnd(decimalLength, "0")].reverse()
            ];
            const number2 = [
                ...bigfloat.integer.padStart(integerLength, "0"),
                ...[...bigfloat.decimal.padEnd(decimalLength, "0")].reverse()
            ];
            console.log({number1, number2, integerLength, decimalLength});
            const num = [...rei.utility.zip(number1, number2)].reduceRight((total, [dec1, dec2])=>{
                let subtotal = Number(dec1) + Number(dec2) + carry;
                carry = subtotal >= 10;
                if(carry)subtotal = Number(subtotal) - 10;
                return String(subtotal).concat(total);
            }, "");
            console.log(carry);
            this.integer = (carry ? "1" : "") + (decimalLength ? num.slice(0, -decimalLength) : num);
            this.decimal = decimalLength ? num.slice(-decimalLength) : "";
            return this;
        }
        sub(number){
            if(this._typeCheck(number))return this;
            const bigfloat = new BigFloat(number);
            return this;
        }
        mul(...numbers){
            for(const number of numbers){
                if(this._typeCheck(number))continue;
            }
            return this;
        }
        div(...numbers){
            for(const number of numbers){
                if(this._typeCheck(number))continue;
            }
            return this;
        }
        sur(number){
            return this;
        }
        static eval(formula){
            for(const character of formula){
                if(character === "\s")
                    continue;
            }
        }
    }

    const abs = x=>(
        x < 0 ? -x : number.toNumber(x)
    );
    const min = (...args)=>(
        args.reduce((min, value)=>(
            min < value ? min : value
        ), Infinity)
    );
    const max = (...args)=>(
        args.reduce((max, value)=>(
            max < value ? max : value
        ), -Infinity)
    );
    // TODO: sin
    // TODO: cos
    // TODO: tan
    const diff = (n1, n2)=>abs(n1-n2);
    const factorial = num=>{
        if(Number.isNaN(num) || (!Number.isFinite(num) && typeof num !== "bigint") || typeof num !== "number" && typeof num !== "bigint")
            return num;
        for(let i = num;i > 2;num *= --i);
        return num ? num : ++num;
    };
    const sqrt5 = Math.sqrt(5);
    const fibonacci$ = frequency=>{
        const x = Math.pow((1 + sqrt5) / 2, frequency);
        const y = Math.pow((1 - sqrt5) / 2, frequency);
        return Math.round((x - y) / sqrt5);
    };
    const fibonacci = function* (frequency=Infinity){
        for(let prev = 1n, fib = 0n;frequency--;)
            yield fib = prev + (prev = fib);
    };
    const isPrime = number=>{
        if(number === 2)
            return true;
        if(Number.isNaN(number) || !Number.isFinite(number) || number < 2 || number % 2 === 0)
            return false;
        for(let i = 3, sqrt = Math.sqrt(number);i <= sqrt;i += 2)
            if(number % i === 0)return false;
        return true;
    };
    const prime = function* (frequency=Infinity){
        yield 2;
        for(let i = 3;frequency--;i += 2)
            if(isPrime(i))yield i;
            else frequency++;
    };
    const primeFactorization = number=>new Promise((resolve, reject)=>{
        if(Number.isNaN(number) || !Number.isFinite(number) || typeof number !== "number"){
            reject(new Error("Only the numerical value can be factorized"));
            return;
        }
        const result = [];
        while(number % 2 === 0){
            result.push(2);
            number /= 2;
        }
        for(let i = 3, sqrt = Math.sqrt(number);i <= sqrt;i += 2)
            while(number % i === 0){
                result.push(i);
                number /= i;
            }
        if(number > 1)result.push(number);
        resolve(result);
    });
    // export class Complex {}
    /*
    import package_rei from "../package";
    package_rei.addModule("number", ()=>class Number {
        static toNumber(number){
            return -(-number);
        }
    });
    package_rei.addModule("math._hyper", ({modules})=>(a, n, b=a)=>{
        switch(n){
        case 0: return ++b;
        case 1: return a + b;
        case 2: return a * b;
        case 3: return a ** b;
        default: {
            if(b === 0)return 1;
            let prev = a;
            for(;--b;)
                prev = modules.math.hyper(a, --n, prev);
            return prev;
        }
        }
    });
    package_rei.addModule("math.hyper", ({modules})=>(a, n, b=a)=>{
        const stack = new modules.Stack();
        while(1){
            stack.push(modules.math._hyper);
            stack.execute();
        }
    });
    // TODO: 公倍数, 公約数
    package_rei.addModule("math.ack", ({modules: {math}})=>(x, y, z)=>{
        if(math.min(x, y, z) < 0)
            throw new Error("Negative argument cannot be specified for Ackermann function");
        if(x === 0)return ++y;
        if(y === 0)return math.ack(--x, 1);
        return math.ack(--x, math.ack(x, --y));
    }).addModule("math.Chain", ()=>class Chain {
        constructor() {
            this.chain = [];
        }
        chain(num){
            this.chain.push(num);
        }
        sum(){}
    });
    */

    var index$2 = /*#__PURE__*/Object.freeze({
        __proto__: null,
        abs: abs,
        min: min,
        max: max,
        diff: diff,
        factorial: factorial,
        fibonacci$: fibonacci$,
        fibonacci: fibonacci,
        isPrime: isPrime,
        prime: prime,
        primeFactorization: primeFactorization,
        NumToStr: Num2FracStr$1,
        Num: Num,
        BigFloat: BigFloat
    });

    exports.math = index$2;
    exports.object = index$1;
    exports.utility = index;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=reiyayakko.umd.js.map

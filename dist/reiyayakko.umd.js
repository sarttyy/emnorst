(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (global = global || self, factory(global.rei = {}));
}(this, (function (exports) { 'use strict';

    const isNull = value=>value === null;
    const isUndefined = value=>value === void 0;
    const isNullorUndefined = value=>(
        isNull(value) || isUndefined(value)
    );
    const isRegExp = obj=>(
        modules.typeof(obj) === "regexp"
    );
    const isObject = value=>{
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
    const equals = (...values)=>{
        // SameValueZero
        let prev = values.shift();
        return values.every(value=>(
            Number.isNaN(prev)?Number.isNaN(prev=value):prev===(prev=value)
        ));
    };
    const typeOf = object=>(
        Object.prototype.toString.call(object).slice(8, -1)
    );
    /*
    FIXME: typeof
    export const typeof = object=>(
        modules.typeOf(object).toLowerCase()
    );
    TODO: require
    */
    const substitute = (value, substitute)=>(
        modules.isNullorUndefined(value)
            ? substitute
            : value
    );
    const loop = (func, level, arg)=>{
        for(;level--;)arg = func(arg);
        return arg;
    };
    const zip = function* (...arrays){
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

    var index = /*#__PURE__*/Object.freeze({
        __proto__: null,
        gurop: gurop,
        equals: equals,
        typeOf: typeOf,
        substitute: substitute,
        loop: loop,
        zip: zip,
        isNull: isNull,
        isUndefined: isUndefined,
        isNullorUndefined: isNullorUndefined,
        isRegExp: isRegExp,
        isObject: isObject,
        isEmpty: isEmpty
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
    const diff = (n1, n2)=>abs(n1-n2);
    const factorial = num=>{
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
    // TODO: 素数ジェネレーター
    const prime = number=>new Promise((resolve, reject)=>{
        // INFO: 素因数分解
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
    // 最小勾配公約
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
        prime: prime
    });

    /*!
     * reiyayakko-core
     * Copyright 2020 reiyayakko
     */

    /*
    export const Reiyayakko = function Reiyayakko(){
        "use strict";
        if(this === void 0){
            // function
            return modules.execute.reiyayakko(arguments);
        }
        // constructor
        modules.init.execute.apply(this, arguments);
    };
    export const R = Reiyayakko;
    */
    const env = {
        version: "1.0.0",
    };

    exports.env = env;
    exports.math = index$2;
    exports.object = index$1;
    exports.utility = index;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=reiyayakko.umd.js.map

'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

/**
 * デフォルトで`Object.prototype.toString.call`の返り値として考えられるすべてのパターンです。
 * たぶん。
 *
 * @typedef {"Null"|
 * "Undefined"|
 * "Number"|
 * "String"|
 * "Boolean"|
 * "Symbol"|
 * "Function"|
 * "Object"|
 * "Array"|
 * "Arguments"|
 * "RegExp"|
 * "Date"|
 * "Math"|
 * "JSON"|
 * "Error"|
 * "Promise"|
 * "Map"|
 * "Set"|
 * "WeakMap"|
 * "WeakSet"|
 * "GeneratorFunction"|
 * "Generator"|
 * "Int8Array"|
 * "Uint8Array"|
 * "Uint8ClampedArray"|
 * "Int16Array"|
 * "Uint16Array"|
 * "Int32Array"|
 * "Uint32Array"|
 * "Float32Array"|
 * "Float64Array"|
 * "ArrayBuffer"|
 * "DataView"}
 * ObjectToStringTypes
 */

/**
 * You can add the type by changing the "Symbol.toStringTag" property of the object.
 * オブジェクトの"Symbol.toStringTag"プロパティーを変更することで、型を追加できます。
 * @param {*} value An object that determines the type
 * @return {ObjectToStringTypes & String} object type
 */
const typeOf$1 = value=>(
    Object.prototype.toString.call(value).slice(8, -1)
);

/**
 * @param {*} value The value to be compared
 * @return Whether {@link typeOf} is Undefined
 */
const isUndefined$1 = value=>(
    value === void 0
);

/**
 * @param {*} value The value to be compared
 * @return Whether {@link typeOf} is Null or Undefined
 */
const isNull = value=>(
    value === null || isUndefined$1(value)
);

/**
 * @param {*} value The value to be compared
 * @return Whether {@link typeOf} is Boolean
 */
const isBoolean = value=>(
    typeOf$1(value) === "Boolean"
);

/**
 * @param {*} value The value to be compared
 * @return Whether {@link typeOf} is String
 */
const isString = value=>(
    typeOf$1(value) === "String"
);

/**
 * @param {*} value The value to be compared
 * @return Whether {@link typeOf} is Number
 */
const isNumber = value=>(
    typeOf$1(value) === "Number"
);

/**
 * @param {*} value The value to be compared
 * @return Whether {@link typeOf} is Symbol
 */
const isSymbol = value=>(
    typeOf$1(value) === "Symbol"
);

/**
 * @param {*} value The value to be compared
 * @return Whether {@link typeOf} is Function
 */
const isFunction = value=>(
    typeOf$1(value) === "Function"
);

/**
 * @param {*} value The value to be compared
 * @return Whether typeof is an object and is not Null
 */
const isObject = value=>(
    typeof value === "object" && value !== null
);

/**
 * @param {*} value The value to be compared
 * @return Whether properties can be edited
 */
const isObjectLike = value=>(
    isFunction(value) || isObject(value)
);

/**
 * @param {*} value The value to be compared
 * @return Whether {@link typeOf} is Arguments
 */
const isArguments = value=>(
    typeOf$1(value) === "Arguments"
);

/**
 * @param {*} value The value to be compared
 * @return Whether {@link typeOf} is RegExp
 */
const isRegExp = value=>(
    typeOf$1(value) === "RegExp"
);

/**
 * @param {*} value The value to be compared
 * @return Whether {@link typeOf} is Error
 */
const isError = value=>(
    typeOf$1(value) === "Error"
);

/**
 * @param {*} value The value to be compared
 * @return Whether {@link typeOf} is Map
 */
const isMap = value=>(
    typeOf$1(value) === "Map"
);

/**
 * @param {*} value The value to be compared
 * @return Whether {@link typeOf} is WeakMap
 */
const isWeakMap = value=>(
    typeOf$1(value) === "WeakMap"
);

/**
 * @param {*} value The value to be compared
 * @return Whether {@link typeOf} is Set
 */
const isSet = value=>(
    typeOf$1(value) === "Set"
);

/**
 * @param {*} value The value to be compared
 * @return Whether {@link typeOf} is WeakSet
 */
const isWeakSet = value=>(
    typeOf$1(value) === "WeakSet"
);

/**
 * @param {Number} number The value to be compared
 * @return Whether it is a negative number
 */
const isNegative = number=>(
    isNumber(number) && number < 0
);

/**
 * @param {Number} number The value to be compared
 * @return Whether it is a prime number
 */
const isPrime = number=>{
    if(number === 2)
        return true;
    if(isNaN(number) || !Number.isFinite(number) || number < 2 || number % 2 === 0)
        return false;
    for(let i = 3, sqrt = Math.sqrt(number);i <= sqrt;i += 2)
        if(number % i === 0)return false;
    return true;
};

const has = Object.prototype.hasOwnProperty.call;

const last = (array, index=1)=>(
    array[array.length - index]
);

const first = (array, index=1)=>(
    array[index - 1]
);

const spread = (target, ...sources)=>{
    switch(typeof target){
    case "object":
        if(Array.isArray(target))
            return target.concat(...sources);
        return Object.assign(target, ...sources);
    case "function":
        return target.apply({}, sources.flat());
    default:
        return target;
    }
};

// TODO: キーがかぶらないように合成
const attach = (object, name)=>{};

const allKeys = (...objects)=>{
    const keys = [];
    for(const object of objects){
        keys.push(Object.getOwnPropertyNames(object));
        keys.push(Object.getOwnPropertySymbols(object));
    }
    return keys.flat();
};

const property = (obj, propKey)=>{
    if(typeof propKey === "string")
        propKey = propKey.split(".");
    else if(typeof propKey === "symbol")
        propKey = [propKey];
    else if(Array.isArray(propKey))
        propKey = propKey.flatMap(key=>(
            typeof key==="string" ? key.split(".") : key
        ));
    return propKey.reduce((object, key)=>{
        if(!has(object, key))object[key] = {};
        return object[key];
    }, obj);
};

const structure = (baseObj={}, applyObj={})=>{
    for(const propName of allKeys(applyObj)){
        const applyProp = applyObj[propName];
        if(typeof applyProp === "object")
            structure(baseObj[propName], applyProp);
        else baseObj[propName] = applyProp;
    }
    return baseObj;
};

const and = (...object)=>{
    deep([object]);
    object.reduce();
};
const xor = (...arrays)=>{};

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

/**
 * Array.isArrayかisArgumentsがtrueかどうか
 * Alpha: 値がArrayLikeかどうか
 * @param {*} value The value to be compared
 * @return Whether the value is ArrayLike
 */
const isArrayLike = value=>{
    if(!isObject(value))return false;
    if(Array.isArray(value) || isArguments(value) || value.length === 0)
        return true;
    return false;
};

/**
 * Alpha:
 * @param {*} value The value to be compared
 * @return Whether the property does not exist
 */
const isEmpty = value=>{
    if(typeOf$1(value) === "String" || isArrayLike(value))
        return value.length === 0;
    if(typeOf$1(value) === "Object")
        return allKeys(value).length === 0;
    return false;
};

/**
 * Verify whether an error occurs when you execute it by passing the argument "args" to "func".
 * "func"に引数として"args"を渡して実行した場合にエラーが発生するか検証します。
 * @param {Function} func Function that verifies if an error occurs
 * @param  {...any} [args] Argument that verifies whether an error has occurred
 * @return Whether an error has occurred
 */
const isThrowError = (func, ...args)=>{
    try{
        func.apply(void 0, args);
        return false;
    }catch(err){ return true; }
};

/**
 * startからendまでのincrementごとの数のジェネレーター。
 * for-of文で使う場合代替として{@link forIndex}が使用できます。
 *
 * @param {Number} start
 * 初期値。`end`が指定されていなかった場合は0からこの数までの連版となる。
 * つまり、`range(end)`は`range(0, end)`と等価。
 * @param {Number} [end]
 * 出力する数字の上限/下限。
 * @param {Number} [step=1]
 * 一度に増やす/減らす数。
 * start > end の場合でも負の値を指定する必要はない。
 * @example
 * console.log([...range(-4)]);
 * // [0, -1, -2, -3, -4]
 *
 * console.log([...range(1, 10, 2)]);
 * // [1, 3, 5, 7, 9]
 */
const range = function* (start, end, step=1){
    if(isUndefined$1(end)){
        yield* range(0, start);
        return;
    }
    step = Math.abs(step);
    if(start > end)step = -step;
    while(Math.abs(end - start) >= Math.abs(step)){
        yield start;
        start += step;
    }
    yield start;
};

/**
 * Receives an Iterable object and calls a callback function for each value.
 * Iterableなオブジェクトを受け取って値ごとにコールバック関数を呼び出します。
 * @param {Iterable} iterator An Iterable object used for the loop
 * @param {Function} func
 * A callback function that is executed for each value of the Iterable object
 * When a value other than undefined is returned,
 * the loop is terminated and the value is returned.
 * @param {*} [that] Specify this of the callback function
 */
const forOf$1 = (iterator, func, that)=>{
    for(const value of iterator){
        const flag = func.call(that, value);
        if(!isUndefined$1(flag))return flag;
    }
    return void 0;
};

/**
 * Call the callback function for each number from 0 to maxIndex.
 * 0からmaxIndexまでの数値ごとにコールバック関数を呼び出します。
 * @param {Number} maxIndex Repeats this number of times
 * @param {Function} func
 * Callback function that is executed maxIndex times
 * When a value other than undefined is returned,
 * the loop is terminated and the value is returned.
 * @param {*} [that] Specify this of the callback function
 */
const forIndex = (maxIndex, func, that)=>(
    forOf$1(range(--maxIndex), index=>{
        const flag = func.call(that, index);
        if(!isUndefined$1(flag))return flag;
        return void 0;
    })
);

/**
 * @deprecated
 * @param {*} object
 * @param {*} func
 * @param {*} [that]
 */
const forIn = (object, func, that)=>{
    if(typeof object === "object")
        object = Object.entries(object);
    return forIndex(object.length, index=>(
        func.call(that, object[index])
    ));
};

/**
 * MEMO: ループ条件とreturnをどうにかして引き剥がしたい。
 * MEMO: do取りたい。flag初期値追加。
 * @param {Function} func Callback function that continues to run as long as it returns undefined
 * @param {*} [that] Specify this of the callback function
 */
const doWhile = (func, that)=>{
    let flag;
    do flag = func.call(that);
    while(isUndefined$1(flag));
    return flag;
};

/**
 * Executes the function specified by func level times.<br>
 * funcで指定された関数をlevel回実行します。
 *
 * @param {Number} level Number of loops
 * @param {Function} func Repeated callback function<br>
 *     The return value of the previous callback function is passed as an argument
 * @param {*} [arg] Arguments passed to the first callback function
 * @return Return value of the last callback function
 */
const previous = (level, func, arg)=>{
    for(;level--;)arg = func(arg);
    return arg;
};

/**
 * Execute the functions specified in the order from left to right.<br>
 * オーダーで指定された関数を左から順番に実行します。
 *
 * @param {*} arg Arguments passed to the first callback function
 * @param {...Function} orders Repeated callback function.<br>
 *     The return value of the previous callback function is passed as an argument
 * @return Return value of the last callback function
 */
const inOrder = (arg, ...orders)=>{
    for(const func of orders)
        arg = func(arg);
    return arg;
};

// TODO: iterate - 何でもループ"できるようにする"やつ
const iterate = function* (value){
    if(value[Symbol.iterator])
        yield* value;
    (function(){
        return {
            next(){
                return {
                    value: void 0,
                    done: false
                };
            }
        };
    }).call(value);
};

// TODO: コールバック関数のthisを指定できる高階関数のthatの指定の仕方を変更。
// 高階関数自体のthisを継承する。
// f(that) => f.call(that)

// NOTE: tryCall
/**
 * Executes the function if the value is a function, otherwise returns the value
 *
 * @param {*} value The value to be executed if it was a function
 * @param {*[]} [args] Argument when the value is a function
 * @param {*} [that] this when the value is a function
 * @return {*} The return value of the function if the value is a function, otherwise the value
 */
const callorElse = (value, args, that)=>(
    isFunction(value)
        ? value.apply(that, args)
        : value
);

/**
 * Returns the first found value. If not found, it returns the last value.
 * \n値の中で最初に見つかった値を返します。見つからない場合、最後の値を返します。
 *
 * @param {*[]} values Value and alternate value. Higher priority to the left
 * @param {Function} evalFunc
 * A function that evaluates a value. Returning a true value is considered an invalid value.
 * 値を評価する関数。trulyな値を返すと無効な値とみなされる
 */
const substitute$1 = (values, evalFunc=isNull)=>(
    values.reduce((value, subValue)=>(
        evalFunc(value) ? subValue : value
    ), values.shift())
);

/**
 * Beta:
 * @param {*} value
 * @param {*} types
 * @param {*} sub
 * @param {*} typeGetter
 */
const typeCheck = (value, types, sub, typeGetter=typeOf$1)=>{
    const type = typeGetter(value);
    if(types.includes(type))
        return value;
    return callorElse(sub, [type]);
};

/**
 * Beta:
 * @param {*} props
 * @param {*} defaultProps
 * @param {*} subFunc
 */
const prop = (props, defaultProps, subFunc)=>(
    Object.entries(props).reduce((props_, [prop, key])=>{
        props_[key] = substitute$1([prop, defaultProps[key]], subFunc);
        return props_;
    })
);

const equals = (...values)=>{
    // SameValueZero
    let prev = values.shift();
    return values.every(value=>(
        Number.isNaN(prev)
            ? Number.isNaN(prev=value)
            : prev===(prev=value)
    ));
};

const toPrimitive = value=>{
    if(!isObject(value))
        return value;
    if("valueOf" in value)
        return value.valueOf();
    if("toString" in value)
        return value.toString();
    if(Symbol && Symbol.toPrimitive in value)
        return value[Symbol.toPrimitive]("default");
    return value;
};

const debounce = (func, wait)=>{
    let id;
    return function(){
        clearTimeout(id);
        // eslint-disable-next-line
        id = setTimeout(func.apply, wait, this, arguments);
    };
};

const uniq = array=>{
    const existings = [];
    return array.filter(value=>{
        const existing = existings.includes(value);
        if(!existing)existings.push(value);
        return !existing;
    });
};

/**
 * Flip objects at depth 0 and 1.<br>
 * オブジェクトを深さ0と1で反転します。
 *
 * @param {*} objects
 * The target object. The child properties of this object must also be objects.<br>
 * ターゲットオブジェクト。 このオブジェクトの子プロパティもオブジェクトである必要があります。
 * @param {*} [getKeys=Object.keys]
 * A function that returns the keys of the object as an array.<br>
 * オブジェクトのキーを配列として返す関数。<br>
 * Example:
 * - rei.object.allKeys
 * @returns
 * An object whose depth is inverted by 0 and 1.<br>
 * 深度が0と1で反転したオブジェクト。
 */
const zip = (objects, getKeys=Object.keys)=>{
    const keys = getKeys(objects);
    const rootIsArray = isArrayLike(objects);
    const isArray = keys.every(key=>(
        isArrayLike(objects[key])
        && getKeys(objects[key]).every(isNumber)
    ));
    return keys.reduce((ziped, key)=>{
        getKeys(objects[key]).forEach(name=>{
            if(!ziped[name])ziped[name] = rootIsArray ? [] : {};
            ziped[name][key] = objects[key][name];
        });
        return ziped;
    }, isArray ? [] : {});
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


// eslint-disable-next-line
const argument = function(){ return arguments; };

/**
 * 拡張版分割代入
 *
 * @param {object} array
 * @param {*} classifying
 * @returns
 */
const restSplit = (array, beforeItem, afterItem=0)=>{
    const restEndIndex = array.length - afterItem;
    const rest = array.slice(beforeItem, restEndIndex);
    array.splice(beforeItem, restEndIndex - beforeItem, rest);
    return array;
};
// const [key, name="the name", ...rest, param{3}] = ArrayLike();
// [difault, ...]
// const {key, key: name, ...rest} = ObjectLike();
// {key: null || name || [name, difault], ...}

const memoize = (func, effective=Infinity)=>{
    const newFunc = function(){
        const prevResult = forOf(newFunc.memo, (fragment, result)=>{
            if(deepEquals(fragment))
                return result;
            return void 0;
        });
        if(isUndefined(prevResult))
            return prevResult;
        // eslint-disable-next-line prefer-rest-params
        const result = func.apply(this, arguments);
        newFunc.memo.set(arguments, result);
        return result;
    };
    if(Array.isArray(effective)){
        newFunc.memo = new Array(effective.length);
        forIndex(effective.length, i=>{
            newFunc.memo[i] = new Map(effective[i]);
        });
    }else {
        const length = substitute([effective,1], v=>!Number.isFinite(v));
        newFunc.memo = new Array(length);
        forIndex(length, i=>{
            newFunc.memo[i] = new Map();
        });
    }
    return newFunc;
};

class MemoMap {
    constructor(initValue){
        this.map = new Map(initValue);
    }
}

// MEMO: ifs スタック

var index = /*#__PURE__*/Object.freeze({
    __proto__: null,
    argument: argument,
    restSplit: restSplit,
    memoize: memoize,
    MemoMap: MemoMap,
    isUndefined: isUndefined$1,
    isNull: isNull,
    isBoolean: isBoolean,
    isString: isString,
    isNumber: isNumber,
    isSymbol: isSymbol,
    isFunction: isFunction,
    isObject: isObject,
    isObjectLike: isObjectLike,
    isArguments: isArguments,
    isRegExp: isRegExp,
    isError: isError,
    isMap: isMap,
    isWeakMap: isWeakMap,
    isSet: isSet,
    isWeakSet: isWeakSet,
    isNegative: isNegative,
    isPrime: isPrime,
    isArrayLike: isArrayLike,
    isEmpty: isEmpty,
    isThrowError: isThrowError,
    forOf: forOf$1,
    forIndex: forIndex,
    forIn: forIn,
    doWhile: doWhile,
    previous: previous,
    inOrder: inOrder,
    iterate: iterate,
    typeOf: typeOf$1,
    callorElse: callorElse,
    substitute: substitute$1,
    typeCheck: typeCheck,
    prop: prop,
    equals: equals,
    toPrimitive: toPrimitive,
    debounce: debounce,
    uniq: uniq,
    range: range,
    zip: zip
});

const copyObject = (modules, object, cloneObject)=>{
    const propKeys = modules.getAllKeys(object);
    const prototype = Object.getPrototypeOf(object);
    object = propKeys.reduce((propertiesObject, propKey) => {
        const prop = Object.getOwnPropertyDescriptor(object, propKey);
        if (prop.hasOwnProperty("value"))
            prop.value = modules.cloneMod(prop.value, cloneObject);
        Object.defineProperty(propertiesObject, propKey, prop);
        return propertiesObject;
    }, Object.create(prototype));
    return object;
};
const copy = cloneObject=>{
    console.log(`type: '${cloneObject.type}'`, [cloneObject.value]);
    let object = cloneObject.value;
    // primitive type, function
    if(typeof object !== "object")
        return cloneObject;
    switch(cloneObject.type){
    case "object": { // {}, new Object, new Foo etc...
        object = copyObject(modules, object, cloneObject);
        break;
    }
    case "array": // [], new Array
        object = object.map(value=>modules.cloneMod(value, cloneObject));
        break;
    case "number": // new Number
        return new Number(object);
    case "string": // new String
        return new String(object);
    case "boolean": // new Boolean
        return new Boolean(object);
    case "bigint": // Object(BigInt())
        return object.valueOf();
    case "regexp": // /regexp/, new RegExp
        return new RegExp(object);
    case "null": // null
        object = null;
        break;
    case "date": return new Date(object);
    case "map": {
        const map = new Map();
        for(const [key, value] of object)
            map.set(key, modules.clone(value));
        return map;
    }
    case "weakmap": {
        const map = new WeakMap();
        for(const [key, value] of object)
            map.set(key, modules.clone(value));
        return map;
    }
    case "set": return new Set(object);
    case "weakset": return new WeakSet(object);
    default:
        return null;
    }
    cloneObject.object = object;
    return cloneObject;
};

class CloneObject {
    constructor(cloneObject, props = {}){
        this.value = cloneObject;
        this.existingObjects = props.existingObjects || new WeakSet();
        this.isDone = false;
    }
    done(){
        this.isDone = true;
        return this.value;
    }
    get isExisting(){
        return this.existingObjects.has(this.value);
    }
    get type(){
        return typeOf(this.value);
    }
}

const undertake = (object, props)=>{
    object = new CloneObject(object, props);
    if(object.isExisting)
        return object.done();
    console.groupCollapsed(`type: '${object.type}'`, object.value);
    object.existingObjects.push(object.value);
    const cloneObject = copy(object);
    cloneObject.existingObjects.push(cloneObject.value);
    console.log(cloneObject.existingObjects);
    console.groupEnd();
    return cloneObject.done();
};

const clone = (object, depth=0)=>(
    undertake(object, depth)
);

// INFO: 汎用Deep関数
const deepBase = (object, props={})=>{
    const {
        keys=allKeys,
        depth=0,
        maxDepth=Infinity,
        existing=new WeakSet()
    } = props;
    callorElse(props.structureFunc, [object]);
    for(const propName of keys(object)){
        if(isObjectLike(object[propName])){
            callorElse(props.propStructure, [object, propName]);
            deepBase(object[propName], {
                ...props,
                depth: depth+1,
                maxDepth,
                existing,
            });
        }else
            callorElse(props.propFunc, [object, propName]);
    }
};

const _ = (object, depth)=>{
    const result = {};
    let temp = result;
    deepBase(object, {
        propFunc(o, propName){
            temp[propName] = o[propName];
        },
        propStructure(o, propName){
            temp[propName] = temp[propName] || {};
            temp = temp[propName];
        },
        structureFunc(...r){
            console.log(r);
        },
        depth: substitute$1([depth, Infinity])
    });
    return result;
};

var index$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    clone: clone,
    deepBase: deepBase,
    _: _,
    has: has,
    last: last,
    first: first,
    spread: spread,
    attach: attach,
    allKeys: allKeys,
    property: property,
    structure: structure,
    and: and,
    xor: xor,
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

// NOTE: 有効桁数
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

// export const add = (number1, number2)=>(
//     number1 + number2
// );
// export const sub = (...numbers)=>{};
// export const mul = (...numbers)=>{};
// export const div = (...numbers)=>{};

/**
 * 引数の絶対値を返す。
 * @param {Number} number
 */
const abs = number=>(
    number < 0 ||
    Object.is(-0, number) ||
    Object.is(BigInt(-0), number)
        ? -number : Number(number)
);

/**
 * 引数の中で一番小さい値を返す。
 * @param  {...Number} args
 */
const min = (...args)=>(
    args.reduce((minValue, value)=>(
        minValue < value ? minValue : value
    ), Infinity)
);

/**
 * 引数の中で一番大きい値を返す。
 * @param  {...Number} args
 */
const max = (...args)=>(
    args.reduce((maxValue, value)=>(
        maxValue > value ? maxValue : value
    ), -Infinity)
);

/**
 * 階上。
 * @param {Number} num
 */
const factorial = num=>{
    if(Number.isNaN(num) || (!Number.isFinite(num) && typeof num !== "bigint") || typeof num !== "number" && typeof num !== "bigint")
        return num;
    for(let i = num;i > 2;num *= --i);
    return num ? num : ++num;
};

// TODO: sin

// TODO: cos

// TODO: tan

// export const diff = (n1, n2)=>abs(n1-n2);

// TODO: 複素数
// export class Complex {}

// TODO: ハイパー演算
/*
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
*/

// TODO: 公倍数, 公約数
/*
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

const sqrt5 = Math.sqrt(5);
/**
 * N番目のフィボナッチ数を取得する。
 * @param {Number} frequency N番目の指定
 */
const fibonacci$ = frequency=>{
    const x = Math.pow((1 + sqrt5) / 2, frequency);
    const y = Math.pow((1 - sqrt5) / 2, frequency);
    return Math.round((x - y) / sqrt5);
};

/**
 * フィボナッチ数列のジェネレーター。
 *
 * @param {Number} frequency Maximum number of times fibonacci number is generated
 */
const fibonacci = function* (frequency=Infinity){
    for(let prev = 1n, fib = 0n;frequency--;)
        yield fib = prev + (prev = fib);
};

/**
 * 素数のジェネレーター。
 *
 * @param {Number} frequency Maximum number of times prime number is generated
 */
const prime = function* (frequency=Infinity){
    yield 2;
    for(let i = 3;frequency--;i += 2)
        if(isPrime(i))yield i;
        else frequency++;
};

/**
 * 素因数分解。
 *
 * @param {Number} number Numbers to factor
 * @return Array of prime factor of `number`
 */
const primeFactorization = number=>{
    if(Number.isNaN(number) || !Number.isFinite(number) || typeof number !== "number")
        return [];
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
    return result;
};

var index$2 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    NumToStr: Num2FracStr$1,
    Num: Num,
    BigFloat: BigFloat,
    abs: abs,
    min: min,
    max: max,
    factorial: factorial,
    fibonacci$: fibonacci$,
    fibonacci: fibonacci,
    prime: prime,
    primeFactorization: primeFactorization
});

// eslint-disable-next-line spaced-comment
/*!
 * reiyayakko-core
 * Copyright 2020 reiyayakko
 */

const env = {
    version: "1.0.0",
};

exports.env = env;
exports.math = index$2;
exports.object = index$1;
exports.utility = index;
//# sourceMappingURL=reiyayakko.cjs.js.map

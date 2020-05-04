'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

/**
 * 
 * @typedef {"Int8Array"|
 * "Uint8Array"|
 * "Uint8ClampedArray"|
 * "Int16Array"|
 * "Uint16Array"|
 * "Int32Array"|
 * "Uint32Array"|
 * "Float32Array"|
 * "Float64Array"} TypedArray
 */

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
 * TypedArray|
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
var typeOf = function (value){ return (
    Object.prototype.toString.call(value).slice(8, -1)
); };

/**
 * @param {*} value The value to be compared
 * @return {Boolean} Whether {@link typeOf} is Undefined
 */
var isUndefined$1 = function (value){ return (
    value === void 0
); };

/**
 * MEMO: nully的な単語があった希ガス。
 * @param {*} value The value to be compared
 * @return {Boolean} Whether {@link typeOf} is Null or Undefined
 */
var isNull = function (value){ return (
    value === null || isUndefined$1(value)
); };

/**
 * @param {*} value The value to be compared
 * @return {Boolean} Whether {@link typeOf} is Boolean
 */
var isBoolean = function (value){ return (
    typeOf(value) === "Boolean"
); };

/**
 * @param {*} value The value to be compared
 * @return {Boolean} Whether {@link typeOf} is String
 */
var isString = function (value){ return (
    typeOf(value) === "String"
); };

/**
 * @param {*} value The value to be compared
 * @return {Boolean} Whether {@link typeOf} is Number
 */
var isNumber = function (value){ return (
    typeOf(value) === "Number"
); };

/**
 * @param {*} value The value to be compared
 * @return {Boolean} Whether {@link typeOf} is Symbol
 */
var isSymbol = function (value){ return (
    typeOf(value) === "Symbol"
); };

/**
 * @param {*} value The value to be compared
 * @return {Boolean} Whether {@link typeOf} is Function
 */
var isFunction = function (value){ return (
    typeOf(value) === "Function"
); };

/**
 * @param {*} value The value to be compared
 * @return {Boolean} Whether typeof is an object and is not Null
 */
var isObject = function (value){ return (
    typeof value === "object" && value !== null
); };

/**
 * @param {*} value The value to be compared
 * @return {Boolean} Whether properties can be edited
 */
var isObjectLike = function (value){ return (
    isFunction(value) || isObject(value)
); };

/**
 * @param {*} value The value to be compared
 * @return {Boolean} Whether {@link typeOf} is Arguments
 */
var isArguments = function (value){ return (
    typeOf(value) === "Arguments"
); };

/**
 * @param {*} value The value to be compared
 * @return {Boolean} Whether {@link typeOf} is RegExp
 */
var isRegExp = function (value){ return (
    typeOf(value) === "RegExp"
); };

/**
 * @param {*} value The value to be compared
 * @return {Boolean} Whether {@link typeOf} is Error
 */
var isError = function (value){ return (
    typeOf(value) === "Error"
); };

/**
 * @param {*} value The value to be compared
 * @return {Boolean} Whether {@link typeOf} is Map
 */
var isMap = function (value){ return (
    typeOf(value) === "Map"
); };

/**
 * @param {*} value The value to be compared
 * @return {Boolean} Whether {@link typeOf} is WeakMap
 */
var isWeakMap = function (value){ return (
    typeOf(value) === "WeakMap"
); };

/**
 * @param {*} value The value to be compared
 * @return {Boolean} Whether {@link typeOf} is Set
 */
var isSet = function (value){ return (
    typeOf(value) === "Set"
); };

/**
 * @param {*} value The value to be compared
 * @return {Boolean} Whether {@link typeOf} is WeakSet
 */
var isWeakSet = function (value){ return (
    typeOf(value) === "WeakSet"
); };

/**
 * @param {*} value The value to be compared
 * @return {Boolean} Whether {@link typeOf} is TypedArray
 */
var isTypedArray = function (value){ return (
    /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/
        .test(typeOf(value))
); };

/**
 * Determines if it is a negative number.
 *
 * 負の数かどうかを判定します。
 * @param {*} number
 * @return {Boolean}
 */
var isNegative = function (number){ return (
    isNumber(number) && number < 0
    || Object.is(-0, number)
); };

/**
 * Determines if it is a positive number.
 *
 * 正の数かどうかを判定します。
 * @param {*} number
 * @return {Boolean}
 */
var isPositive = function (number){ return (
    isNumber(number) && number > 0
    || Object.is(0, number)
); };

/**
 * Determines if infinity.
 *
 * 無限かどうかを判定します。
 * @param {*} number
 * @return {Boolean}
 */
var isInfinity = function (number){ return (
    number === Infinity || number === -Infinity
); };

/**
 * Determines if it is a prime number.
 *
 * 素数かどうかを判定します。
 * @param {*} number
 * @return {Boolean}
 */
var isPrime = function (number){
    if(number === 2)
        { return true; }
    if(
        isNaN(number)
        || isInfinity(number)
        || !Number.isInteger(number)
        || number < 2
        || number % 2 === 0
    ){ return false; }
    for(var i = 3, sqrt = Math.sqrt(number);i <= sqrt;i += 2)
        { if(number % i === 0){ return false; } }
    return true;
};

/**
 * Determine if it is odd (whether the remainder divided by 2 is 1).
 * Even numbers can use {@link isEven}.
 *
 * 奇数かどうか(2で割った余りが1かどうか)を判定します。
 * 偶数には{@link isEven}を使用できます。
 * @param {*} number
 * @return {Boolean}
 */
var isOdd = function (number){ return (
    isNumber(number) && number % 2 === 1
); };

/**
 * Determine if it is even (whether the remainder divided by 2 is 0).
 * Odd numbers can use {@link isOdd}.
 *
 * 偶数かどうか(2で割った余りが0かどうか)を判定します。
 * 奇数には{@link isOdd}を使用できます。
 * @param {*} number
 * @return {Boolean}
 */
var isEven = function (number){ return (
    isNumber(number) && number % 2 === 0
); };

/**
 * @param {*} value The value to be compared
 * @return {Boolean} Whether the value is iterable
 */
var isIterable = function (value){ return (
    isObject(value)
    && isFunction(value[Symbol.iterator])
    && isObject(value[Symbol.iterator]())
); };

/**
 * Array.isArrayかisArgumentsがtrueかどうか
 * 値がArrayLikeかどうか
 * @param {*} value The value to be compared
 * @return {Boolean} Whether the value is ArrayLike
 */
var isArrayLike = function (value){
    if(!isObject(value)){ return false; }
    if(Array.isArray(value) || isArguments(value) || isNumber(value.length))
        { return true; }
    return false;
};

/**
 * Alpha:
 * @param {*} value The value to be compared
 * @return {Boolean} Whether the property does not exist
 */
var isEmpty = function (value){
    if(isString(value) || isArrayLike(value))
        { return value.length === 0; }
    if(typeOf(value) === "Object")
        { return Object.keys(value).length === 0; }
    return false;
};

/**
 * Verify whether an error occurs when you execute it by passing the argument "args" to "func".
 * "func"に引数として"args"を渡して実行した場合にエラーが発生するか検証します。
 * @param {Function} func Function that verifies if an error occurs
 * @param  {...any} [args] Argument that verifies whether an error has occurred
 * @return {Boolean} Whether an error has occurred
 */
var isThrowError = function (func){
    var args = [], len = arguments.length - 1;
    while ( len-- > 0 ) args[ len ] = arguments[ len + 1 ];

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
var range = null; /* function* (start, end, step=1){
    if(isUndefined(end)){
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
// */

/**
 * Receives an Iterable object and calls a callback function for each value.
 * Iterableなオブジェクトを受け取って値ごとにコールバック関数を呼び出します。
 * @param {Iterable} iterator An Iterable object used for the loop
 * @param {Function} func
 * A callback function that is executed for each value of the Iterable object
 * When a value other than undefined is returned,
 * the loop is terminated and the value is returned.
 */
var forOf$1 = function(iterator, func){
    var variable = [];
    for(var value /* of iterator */ = null;;){
        var flag = func.call.apply(func, [ this, value ].concat( variable ));
        if(!isUndefined$1(flag)){ return flag; }
    }
    return void 0;
};

/**
 * OPTIMIZE: 関数のlength0なら素のfor --i:
 * Call the callback function for each number from 0 to maxIndex.
 * 0からmaxIndexまでの数値ごとにコールバック関数を呼び出します。
 * @param {Number} maxIndex Repeats this number of times
 * @param {Function} func
 * Callback function that is executed maxIndex times
 * When a value other than undefined is returned,
 * the loop is terminated and the value is returned.
 */
var forIndex = function(maxIndex, func){
    return forOf$1.call(this, range(--maxIndex), function(){
        var flag = func.apply(this, arguments);
        if(!isUndefined$1(flag)){ return flag; }
        return void 0;
    });
};

/**
 * @deprecated
 * @param {*} object
 * @param {*} func
 * @param {*} [that]
 */
var forIn = function (object, func, that){
    if(typeof object === "object")
        { object = Object.entries(object); }
    return forIndex(object.length, function (index){ return (
        func.call(that, object[index])
    ); });
};

/**
 * MEMO: ループ条件とreturnをどうにかして引き剥がしたい。
 * MEMO: do取りたい。flag初期値追加。
 * @param {Function} func Callback function that continues to run as long as it returns undefined
 * @param {*} [that] Specify this of the callback function
 */
var doWhile = function (func, that){
    var flag;
    do { flag = func.call(that); }
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
var previous = function (level, func, arg){
    for(;level--;){ arg = func(arg); }
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
var inOrder = function (arg){
    var orders = [], len = arguments.length - 1;
    while ( len-- > 0 ) orders[ len ] = arguments[ len + 1 ];

    forOf$1(orders, function (func){
        arg = func(arg);
    });
    return arg;
};

var own = function (value){ return value; };

var gurop = function (array, func){
    if ( func === void 0 ) func=own;

    var gurops = {};
    forOf$1(array, function (value){
        /*
        IDEA: fの返り値: {gurupName1:{value}}
        */
        var entry = func(value);
        var entries = isObject(entry)
            ? Object.entries(entry)
            : [[entry, value]];
        forOf$1(entries, function (ref){
            var key = ref[0];
            var value = ref[1];

            if(!gurops[key]){ gurops[key] = []; }
            gurops[key].push(value);
        });
    });
    return gurops;
};
// export const partition = (array, func)=>{};
// INFO: findのマッチした数版
var count = function (array, func){
    var match = 0;
    forOf$1(array, function (value){
        match += Boolean(func(value));
    });
    return match;
};

var generate = function (generator, func, that){
    var assign;

    var done;
    do{
        var result = generator.next();
        ((assign = result, done = assign.done));
        func.call(that, result.value);
    }while(!done);
};
var generator = function (){};

var reduce = function (array, func, defaultValue, that){
    // {value: undefined, done: false}
};

// export const map = (array, func)=>{
//     array.flatMap(value=>func([value]));
// };

// TODO: コールバック関数のthisを指定できる高階関数のthatの指定の仕方を変更。
// 高階関数自体のthisを継承する。
// f(that) => f.call(that)

/**
 * Executes the function if the value is a function, otherwise returns the value
 *
 * NOTE: tryCall
 * @param {*} value The value to be executed if it was a function
 * @param {*[]} [args] Argument when the value is a function
 * @return {*} The return value of the function if the value is a function, otherwise the value
 */
var callorElse = function(value){
    var args = [], len = arguments.length - 1;
    while ( len-- > 0 ) args[ len ] = arguments[ len + 1 ];

    return isFunction(value)
        ? value.apply(this, args)
        : value;
};

/**
 * Returns the first found value. If not found, it returns the last value.
 * \n値の中で最初に見つかった値を返します。見つからない場合、最後の値を返します。
 *
 * @param {*[]} values Value and alternate value. Higher priority to the left
 * @param {Function} evalFunc
 * A function that evaluates a value. Returning a true value is considered an invalid value.
 * 値を評価する関数。trulyな値を返すと無効な値とみなされる
 */
var substitute$1 = function (values, evalFunc){
    if ( evalFunc === void 0 ) evalFunc=isNull;

    return (
    values.reduce(function (value, subValue){ return (
        evalFunc(value) ? subValue : value
    ); }, values.shift())
);
};

/**
 * Beta:
 * @param {*} value
 * @param {*} types
 * @param {*} sub
 * @param {*} typeGetter
 */
var typeCheck = function (value, types, sub, typeGetter){
    if ( typeGetter === void 0 ) typeGetter=typeOf;

    var type = typeGetter(value);
    if(types.includes(type))
        { return value; }
    return callorElse(sub, [type]);
};

/**
 * Beta:
 * @param {*} props
 * @param {*} defaultProps
 * @param {*} subFunc
 */
var prop = function (props, defaultProps, subFunc){ return (
    Object.entries(props).reduce(function (props_, ref){
        var prop = ref[0];
        var key = ref[1];

        props_[key] = substitute$1([prop, defaultProps[key]], subFunc);
        return props_;
    })
); };

/**
 * 引数が全て同じかどうかをSameValueZeroによって検証します。
 * @param  {...any} values
 * @return {Boolean}
 */
var equals = function (){
    var values = [], len = arguments.length;
    while ( len-- ) values[ len ] = arguments[ len ];

    var first = values.shift();
    var equal = Number.isNaN(first)
        ? Number.isNaN
        : function (value) { return (first === value); };
    return values.every(equal);
};

/**
 * 引数の型({@link typeOf})が全て同じかどうかを検証します。
 * @param  {...any} values
 * @return {Boolean}
 */
var equalsType = function (){
    var values = [], len = arguments.length;
    while ( len-- ) values[ len ] = arguments[ len ];

    return (
    equals(values.map(typeOf))
);
};

// IDEA: deepEqualをここにつれてくる

/**
 * 最後から数えて`index`番目の要素を取得します。
 *
 * @param {String|Array} orign 元の要素
 * @param {Number} index
 */
var last = function (orign, index){
    if ( index === void 0 ) index=1;

    return (
    orign[orign.length - index]
);
};

/**
 * 最初から数えて`index`番目の要素を取得します。
 *
 * @param {String|Array} orign 元の要素
 * @param {Number} index
 */
var first = function (orign, index){
    if ( index === void 0 ) index=1;

    return (
    orign[index - 1]
);
};

/**
 * @private
 * @param {ArrayLike} orign
 * @param {Number} index
 */
var getIndex = function (orign, index){
    if ( index === void 0 ) index=0;

    return (
    isNegative(index)
        ? orign.length + index - 1
        : index
);
};

/**
 *
 * @param {String|Array} orign 元の要素
 * @param {Number} start 切り取り開始位置
 * @param {Number} cutCount 切り取る長さ
 * @param {Array} insertItems 挿入する要素
 */
var splice = function (orign, start, cutCount){
    if ( cutCount === void 0 ) cutCount=0;
    var insertItems = [], len = arguments.length - 3;
    while ( len-- > 0 ) insertItems[ len ] = arguments[ len + 3 ];

    start = getIndex(orign, start);
    var before = orign.slice(0, start);
    var after = orign.slice(cutCount + start);
    return before.concat.apply(before, insertItems.concat( [after] ));
};

/**
 * indexが正の数なら最初から、負の数なら最後から数えて`index`番目の要素を取得します。
 *
 * @param {String|Array} orign 元の要素
 * @param {Number} index
 * @param {*} insert
 */
var index = function (orign, index, insert){
    if ( index === void 0 ) index=0;
    if ( insert === void 0 ) insert=null;

    if(isNull(insert))
        { return orign[getIndex(orign, index)]; }
    return splice(orign, index, 1, insert);
};

/**
 *
 * @param {Iterable} iterable
 * @param {Number} index
 */
var iterableIndex = function (iterable, index){
    var iterator = iterable[Symbol.iterator]();
    // if(isNegative(index))index += orign.length;
    for(;--index;){ iterator.next(); }
    return iterator.next().value;
};

/**
 * Beta:
 * 分割代入拡張
 *
 * @param {Array} array 元の配列
 * @param {Number} beforeItem restの前のパラメータの数
 * @param {Number} afterItem restの後のパラメータの数
 * @returns
 */
var restSplit = function (array, beforeItem, afterItem){
    if ( afterItem === void 0 ) afterItem=0;

    var restEndIndex = array.length - afterItem;
    var rest = array.slice(beforeItem, restEndIndex);
    array.splice(beforeItem, restEndIndex - beforeItem, rest);
    return array;
};

// classifying
// const [key, name="the name", ...rest, param{3}] = ArrayLike();
// [difault, ...]
// const {key, key: name, ...rest} = ObjectLike();
// {key: null || name || [name, difault], ...}

/**
 * 高階関数。一度実行してから一定時間内に発生した処理を無視、
 * 一定期間呼び出されなかった場合も実行する。
 * @param {Function} func
 * @param {Number} wait 待機時間
 * @return {(...args: any[]) => void}
 */
var throttle = function (func, wait){
    if ( wait === void 0 ) wait=1000;

    var id, waiting, context, args;
    return function(){
        if(!isNumber(id)){
            func.apply(this, arguments);
            id = setTimeout(function (){
                waiting && func.apply(context, args);
                waiting = false;
                id = null;
            }, wait);
        }else {
            waiting = true;
            context = this;
            args = arguments;
        }
    };
};

/**
 * 高階関数。呼び出されてから一定期間呼び出されなかった場合に実行する。
 * @param {Function} func
 * @param {Number} wait 待機時間
 * @return {(...args: any[]) => void}
 */
var debounce = function (func, wait){
    if ( wait === void 0 ) wait=1000;

    var id;
    return function(){
        var arguments$1 = arguments;
        var this$1 = this;

        clearTimeout(id);
        id = setTimeout(function (){ return func.apply(this$1, arguments$1); }, wait);
    };
};

// TODO: format

// /**
//  * Alpha:
//  * @param {String[]} strings
//  * @param  {...any} rawStrings
//  */
// const r = (strings, ...rawStrings)=>{
//     console.log(strings);
//     const result = [];
//     for(const __ of rawStrings){
//         result.push(strings.pop());
//         result.push(__);
//     }
//     return result;
// };

var toPrimitive = function (value){
    if(!isObject(value))
        { return value; }
    if("valueOf" in value)
        { return value.valueOf(); }
    if("toString" in value)
        { return value.toString(); }
    if(Symbol && Symbol.toPrimitive in value)
        { return value[Symbol.toPrimitive]("default"); }
    return value;
};

var uniq = function (array){
    var existings = [];
    return array.filter(function (value){
        var existing = existings.includes(value);
        if(!existing){ existings.push(value); }
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
var zip = function (objects, getKeys){
    if ( getKeys === void 0 ) getKeys=Object.keys;

    var keys = getKeys(objects);
    var rootIsArray = isArrayLike(objects);
    var isArray = keys.every(function (key){ return (
        isArrayLike(objects[key])
        && getKeys(objects[key]).every(function (_){ return /\d/.test(_); })
    ); });
    return keys.reduce(function (ziped, key){
        getKeys(objects[key]).forEach(function (name){
            if(!ziped[name]){ ziped[name] = rootIsArray ? [] : {}; }
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
var argument = function(){ return arguments; };

var memoize = function (func, effective){
    if ( effective === void 0 ) effective=Infinity;

    var newFunc = function(){
        var prevResult = forOf(newFunc.memo, function (fragment, result){
            if(deepEquals(fragment))
                { return result; }
            return void 0;
        });
        if(isUndefined(prevResult))
            { return prevResult; }
        // eslint-disable-next-line prefer-rest-params
        var result = func.apply(this, arguments);
        newFunc.memo.set(arguments, result);
        return result;
    };
    if(Array.isArray(effective)){
        newFunc.memo = new Array(effective.length);
        forIndex(effective.length, function (i){
            newFunc.memo[i] = new Map(effective[i]);
        });
    }else {
        var length = substitute([effective,1], function (v){ return !Number.isFinite(v); });
        newFunc.memo = new Array(length);
        forIndex(length, function (i){
            newFunc.memo[i] = new Map();
        });
    }
    return newFunc;
};

var MemoMap = function MemoMap(initValue){
    this.map = new Map(initValue);
};

// MEMO: ifs スタック

var index$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    argument: argument,
    memoize: memoize,
    MemoMap: MemoMap,
    gurop: gurop,
    count: count,
    generate: generate,
    generator: generator,
    reduce: reduce,
    callorElse: callorElse,
    substitute: substitute$1,
    typeCheck: typeCheck,
    prop: prop,
    equals: equals,
    equalsType: equalsType,
    last: last,
    first: first,
    splice: splice,
    index: index,
    iterableIndex: iterableIndex,
    restSplit: restSplit,
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
    isTypedArray: isTypedArray,
    isNegative: isNegative,
    isPositive: isPositive,
    isInfinity: isInfinity,
    isPrime: isPrime,
    isOdd: isOdd,
    isEven: isEven,
    isIterable: isIterable,
    isArrayLike: isArrayLike,
    isEmpty: isEmpty,
    isThrowError: isThrowError,
    forOf: forOf$1,
    forIndex: forIndex,
    forIn: forIn,
    doWhile: doWhile,
    previous: previous,
    inOrder: inOrder,
    range: range,
    throttle: throttle,
    debounce: debounce,
    typeOf: typeOf,
    toPrimitive: toPrimitive,
    uniq: uniq,
    zip: zip
});

var has = function (thisObject, propName){ return (
    Object.prototype.hasOwnProperty.call(thisObject, propName)
); };

/**
 * 受け取ったオブジェクトの全てのプロパティー名とSymbolを取得します。
 * @param  {...Object} object キーを取得するオブジェクトです。
 * @return {Array<String | Symbol>} オブジェクトのプロパティー名とSymbolの配列です。
 */
var allKeys = function (object){ return (
    !isObject(object) ? null : []
        .concat(Object.getOwnPropertyNames(object))
        .concat(Object.getOwnPropertySymbols(object))
); };

/**
 * 
 * @param {Object} obj 
 * @param {String|Symbol|Array<String|Symbol>} propKey 
 * @param {Boolean} define 
 */
var property = function (obj, propKey, define){
    if ( define === void 0 ) define=false;

    if(typeof propKey === "string")
        { propKey = propKey.split("."); }
    else if(isSymbol(propKey))
        { propKey = [propKey]; }
    else if(Array.isArray(propKey))
        { propKey = propKey.flatMap(function (key){ return (
            typeof key==="string" ? key.split(".") : key
        ); }); }
    return propKey.reduce(function (object, key){
        if(!has(object, key)){
            if(define){ object[key] = {}; }
        }
        return object[key];
    }, obj);
};

var structure = function (baseObj, applyObj){
    if ( baseObj === void 0 ) baseObj={};
    if ( applyObj === void 0 ) applyObj={};

    forOf$1(allKeys(applyObj), function (propName){
        var applyProp = applyObj[propName];
        if(typeof applyProp === "object")
            { structure(baseObj[propName], applyProp); }
        else { baseObj[propName] = applyProp; }
    });
    return baseObj;
};

/**
 * deepBaseのプロパティー
 * @typedef {{
 * keys: Function;
 * depth: Number;
 * maxDepth: Number;
 * existing: Set | WeakSet;
 * structureCall: Function;
 * propFuncIfObject: Function;
 * propFunc: Function;
 * }} prop
 */

/**
 * @param {*} object
 * @param {String | Symbol} propName
 * @param {prop} props
 */
var allocate = function (object, propName, props){
    if ( props === void 0 ) props={};

    var target = Object.getOwnPropertyDescriptor(object, propName);
    if(isObject(target)){
        callorElse(props.propFuncIfObject, object, propName);
        if(!props.existing.has(target)){
            props.existing.add(target);
            deepBase(target, Object.assign({}, props, {
                depth: props.depth + 1,
            }));
        }
    }else {
        var prop = Object.getOwnPropertyDescriptor(object, propName);
        callorElse(props.propFunc, object, propName, prop);
    }
};

/**
 * deepBaseのプロパティー
 * @typedef {{
 * keys: Function;
 * depth: Number;
 * maxDepth: Number;
 * existing: Set | WeakSet;
 * structureCall: Function;
 * propFuncIfObject: Function;
 * propFunc: Function;
 * }} prop
 */

/**
 * WIP: 開発難航中。
 * WARNING: おそらくバグ多数あり。
 * 汎用Deep関数
 * @param {Object} targetObject
 * @param {prop} props
 */
var deepBase = function (targetObject, props){
    var assign, assign_keys, assign_depth, assign_maxDepth, assign_existing, assign_structureCall, assign_propFuncIfObject, assign_propFunc;

    if ( props === void 0 ) props={};
    ((assign = props, assign_keys = assign.keys, assign_keys = assign_keys === void 0 ? allKeys : assign_keys, props.keys = assign_keys, assign_depth = assign.depth, assign_depth = assign_depth === void 0 ? 0 : assign_depth, props.depth = assign_depth, assign_maxDepth = assign.maxDepth, assign_maxDepth = assign_maxDepth === void 0 ? Infinity : assign_maxDepth, props.maxDepth = assign_maxDepth, assign_existing = assign.existing, assign_existing = assign_existing === void 0 ? new WeakSet() : assign_existing, props.existing = assign_existing, assign_structureCall = assign.structureCall, assign_structureCall = assign_structureCall === void 0 ? console.log : assign_structureCall, props.structureCall = assign_structureCall, assign_propFuncIfObject = assign.propFuncIfObject, assign_propFuncIfObject = assign_propFuncIfObject === void 0 ? console.log : assign_propFuncIfObject, props.propFuncIfObject = assign_propFuncIfObject, assign_propFunc = assign.propFunc, assign_propFunc = assign_propFunc === void 0 ? console.log : assign_propFunc, props.propFunc = assign_propFunc));
    callorElse(props.structureCall, targetObject);
    forOf$1(props.keys(targetObject), function (propName){
        allocate(targetObject, propName, props);
    });
};

/**
 * WIP:
 * @param {Object} object
 * @param {Number} depth
 */
var clone_WIP = function (object, depth){
    var result = {};
    var temp = result;
    deepBase(object, {
        propFunc: function propFunc(o, propName){
            var prop = Object.getOwnPropertyDescriptor(o, propName);
            if(has(prop, "value")){ prop.value = null; }
            Object.defineProperty(temp, propName, prop);
        },
        propFuncIfObject: function propFuncIfObject(o, propName){
            var target = o[propName];
            var prototype = Object.getPrototypeOf(target);
            var __ = Object.create(prototype);
            temp[propName] = temp[propName] || __;
            temp = temp[propName];
        },
        structureCall: function structureCall(r){
            console.log(r);
        },
        depth: substitute$1([depth, Infinity])
    });
    console.log(object, "=>", result);
    return result;
};

var spread = function (target){
    var sources = [], len = arguments.length - 1;
    while ( len-- > 0 ) sources[ len ] = arguments[ len + 1 ];

    switch(typeof target){
    case "object":
        if(Array.isArray(target))
            { return target.concat.apply(target, sources); }
        return Object.assign.apply(Object, [ target ].concat( sources ));
    case "function":
        return target.apply({}, sources.flat());
    default:
        return target;
    }
};

// TODO: キーがかぶらないように合成
var attach = function (object, name){};

var and = function (){
    var object = [], len = arguments.length;
    while ( len-- ) object[ len ] = arguments[ len ];

    deep([object]);
};
var xor = function (){
    var arrays = [], len = arguments.length;
    while ( len-- ) arrays[ len ] = arguments[ len ];
};

var watchMap = new WeakMap();
var watch = function (obj, propName, func){
    var descriptors = watchMap.has(obj)
        ? watchMap.get(obj) : {};
    var descriptor = Object.getOwnPropertyDescriptor(obj, propName);
    if(!descriptor.hasOwnProperty("value"))
        { return; }
    descriptors[propName] = descriptor;
    watchMap.set(obj, descriptors);
    var value = obj[propName];
    Object.defineProperty(obj, propName, {
        get: function (){ return value; },
        set: function (newValue){
            func(value, value = newValue);
        },
        enumerable: true,
        configurable: true
    });
};

var watchStop = function (obj, propName){
    var descriptor = watchMap.get(obj)[propName];
    Object.defineProperty(obj, propName, Object.assign({}, descriptor,
        {value: obj[propName]}));
};

var index$2 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    deepBase: deepBase,
    clone_WIP: clone_WIP,
    has: has,
    allKeys: allKeys,
    property: property,
    structure: structure,
    spread: spread,
    attach: attach,
    and: and,
    xor: xor,
    watch: watch,
    watchStop: watchStop
});

/**
 * @typedef {Number | String | BigFloat} NumberTypes
 */

var isSafe = function (target){ return (
    target.integer.length < 16 && !target.decimal
); };

/**
 * WIP: In development.
 *
 * Alpha: 符号一部バグあり、除算対応できてない、おそらく他にもバグあり。
 *
 * OPTIMIZE: 桁が増えたときのパフォーマンスがひどい。
 *
 * IDEA: Stringによって1桁ずつ保存ではなく、
 * 乗算でNumber.MAX_SAFE_INTEGERを超えない7桁ずつArrayに保存
 * @export
 * @class BigFloat
 */
var BigFloat = function BigFloat(number){
    if ( number === void 0 ) number=0;

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
};
/**
 * @readonly
 * @memberof BigFloat
 */
// eslint-disable-next-line class-methods-use-this
// get [Symbol.toStringTag](){
// return "BigFloat";
// }
/**
 * @readonly
 * @memberof BigFloat
 */
// get sign(){
// return this.isPositive ? "+" : "-";
// }
BigFloat.prototype.setSign = function setSign (sign){
    this.isPositive
        = isString(sign) ? first(sign) !== "-"
        : isNumber(sign) ? isPositive(sign)
        : isBoolean(sign) ? sign
        : sign instanceof BigFloat ? sign.isPositive
        : null;
};
/**
 * 引数の数字をthisのBigfloatに代入
 *
 * @memberof BigFloat
 * @param {NumberTypes} number
 */
BigFloat.prototype.setNumber = function setNumber (number){
    // @ts-ignore
    if(Number.isNaN(number) || isInfinity(number)){
        this.exception = number;
        // @ts-ignore
        number = (Math.sign(number) || "").toString().slice(0, 1);
    }else // IDEA: 無限、循環小数等
        { this.exception = null; }
    number = String(number);
    var fst = number[0];
    // 正負符号
    this.setSign(fst);
    number = fst === "-" || fst === "+"
        ? number.slice(1) : number;
    var point = number.indexOf(".");
    var decimalPoint = point !== -1 ? point : Infinity;
    this.integer = number.slice(0, decimalPoint);
    this.decimal = number.slice(decimalPoint + 1);
};
/**
 * integer, decimalのpaddingを指定して数字を取得
 *
 * @memberof BigFloat
 * @param {Number} int integerのpadding
 * @param {Number} dec decimalのpadding
 * @return {Number[]} full number
 */
BigFloat.prototype.getNumber = function getNumber (int, dec){
        if ( int === void 0 ) int=1;
        if ( dec === void 0 ) dec=0;

    var _ = this.integer.padStart(int, "0") + this.decimal.padEnd(dec, "0");
    var result = [];
    forIndex(_.length, function (index){
        result.push(Number(_[index]));
    });
    return result;
};
BigFloat.prototype.setDecimalPoint = function setDecimalPoint (decimalPoint){
        if ( decimalPoint === void 0 ) decimalPoint=0;

    var number = this.getNumber().join("");
    var decimal = number.length - decimalPoint;
    this.integer = number.slice(0, decimal);
    this.decimal = number.slice(decimal);
};
BigFloat.prototype.format = function format (){
    this.integer = this.integer.replace(/^0+/, "");
    this.decimal = this.decimal.replace(/0+$/, "");
    return this;
};
BigFloat.prototype.toString = function toString (){
    return (!isNull(this.exception)
        ? String(this.exception)
        : this.sign.concat(
            this.integer || "0",
            this.decimal
                ? ("." + (this.decimal))
                : ""
        ));
};
BigFloat.prototype.valueOf = function valueOf (){
    return substitute$1([this.exception, this.toString()]);
};
/**
 * メソッド版add
 * @memberof BigFloat
 * @param {number} number
 * @return
 */
BigFloat.prototype.increment = function increment (number){
        if ( number === void 0 ) number=1;

    this.setNumber(BigFloat.addition(this, number));
    return this;
};
/**
 * メソッド版sub
 * @memberof BigFloat
 * @param {number} number
 * @return
 */
BigFloat.prototype.decrement = function decrement (number){
        if ( number === void 0 ) number=1;

    this.setNumber(BigFloat.subtraction(this, number));
    return this;
};
BigFloat.prototype.trunc = function trunc (cutCount){
        if ( cutCount === void 0 ) cutCount=0;

    this.decimal = this.decimal.slice(0, cutCount);
    return this;
};
BigFloat.prototype.floor = function floor (cutCount){
        if ( cutCount === void 0 ) cutCount=0;

    return this.trunc(cutCount);
};
BigFloat.prototype.ceil = function ceil (cutCount){
        if ( cutCount === void 0 ) cutCount=0;

    var fst = first(this.decimal, cutCount);
    if(fst){ this.increment(); }
    return this.trunc(cutCount);
};
/**
 * 四捨五入
 * 正の無限大の方向ではなく0から遠ざかる次の整数に丸められます。
 *
 * @memberof BigFloat
 * @param {number} [cutCount=0]
 * @returns
 */
BigFloat.prototype.round = function round (cutCount){
        if ( cutCount === void 0 ) cutCount=0;

    var fst = Number(first(this.decimal, cutCount));
    if(fst >= 5){ this.increment(); }
    return this.trunc(cutCount);
};
/**
 * @memberof BigFloat
 * @static
 * @param {BigFloat} n1
 * @param {BigFloat} n2
 * @returns
 */
BigFloat.max2 = function max2 (n1, n2){
    if(n1.integer.length !== n2.integer.length)
        { return n1.integer.length > n2.integer.length
            ? n1 : n2; }
    var digits = {
        integer: Math.max(n1.integer.length, n2.integer.length),
        decimal: Math.max(n1.decimal.length, n2.decimal.length),
    };
    var sumValue = zip([
        n1.getNumber(digits.integer, digits.decimal),
        n2.getNumber(digits.integer, digits.decimal)
    ]);
    return forOf$1(sumValue, function (ref){
            var num1 = ref[0];
            var num2 = ref[1];

            return (
        num1 !== num2 ? (num1 > num2 ? num1 : num2) : void 0
    );
        });
};
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
BigFloat.addition = function addition (target, addNum){
    target = new BigFloat(target);
    addNum = new BigFloat(addNum);
    // Numberで計算可能ならNumberで計算
    if(isSafe(target) && isSafe(addNum))
        { return new BigFloat(Number(target) + Number(addNum)); }
    // 符号が異なる場合、符号を反転して減算
    if(target.isPositive !== addNum.isPositive){
        addNum.setSign(!addNum.isPositive);
        return BigFloat.subtraction(target, addNum);
    }
    var digits = {
        integer: Math.max(target.integer.length, addNum.integer.length),
        decimal: Math.max(target.decimal.length, addNum.decimal.length),
    };
    var sumValue = zip([
        target.getNumber(digits.integer, digits.decimal),
        addNum.getNumber(digits.integer, digits.decimal)
    ]).reduceRight(function (total, ref){
            var targetNumber = ref[0];
            var addNumber = ref[1];

        var carry = Number(first(total));
        var subtotal = String(carry + targetNumber + addNumber);
        return splice(total, 0, 1, subtotal.padStart(2, "0"));
    }, "0");
    var result = new BigFloat();
    result.setNumber(sumValue);
    result.setDecimalPoint(digits.decimal);
    result.setSign(target);
    return result.format();
};
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
BigFloat.subtraction = function subtraction (target, subNum){
    target = new BigFloat(target);
    subNum = new BigFloat(subNum);
    // Numberで計算可能ならNumberで計算
    if(isSafe(target) && isSafe(subNum))
        { return new BigFloat(Number(target) - Number(subNum)); }
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
    var digits = {
        integer: Math.max(target.integer.length, subNum.integer.length),
        decimal: Math.max(target.decimal.length, subNum.decimal.length),
    };
    var borrow = false;
    var sumValue = zip([
        target.getNumber(digits.integer, digits.decimal),
        subNum.getNumber(digits.integer, digits.decimal)
    ]).reduceRight(function (total, ref){
            var targetNumber = ref[0];
            var addNumber = ref[1];

        // IDEA: const borrow = Number(last(total));
        var subtotal = targetNumber - addNumber - Number(borrow);
        borrow = isNegative(subtotal);
        if(borrow){ subtotal += 10; }
        return splice(total, 0, 1, String(Math.abs(subtotal)).padStart(2, "0"));
    }, "0");
    if(borrow){
        var big = "1" + ("0".repeat(sumValue.length - 1));
        sumValue = BigFloat.subtraction(big, sumValue);
        // IDEA:
        // sumValue = [...sumValue].map(char=>(
        // 10 - Number(char)
        // )).join("");
    }
    var result = new BigFloat();
    result.setNumber(sumValue);
    result.setDecimalPoint(digits.decimal);
    // FIXME: 正しくない。大小によって判断すべき
    var max2 = BigFloat.max2(target, subNum);
    result.isPositive = max2 === subNum
        ? !subNum.isPositive
        : target.isPositive;
    return result.format();
};
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
BigFloat.multiplication = function multiplication (target, mulNum){
    target = new BigFloat(target);
    mulNum = new BigFloat(mulNum);
    // 項のどちらかが0なら0を返す。
    if(BigFloat.equals(target, 0) || BigFloat.equals(mulNum, 0))
        { return new BigFloat(); }
    // Numberで計算可能ならNumberで計算
    var sumLength = target.integer.length + mulNum.integer.length;
    if(sumLength < 16 && !target.decimal && !mulNum.decimal)
        { return new BigFloat(Number(target) * Number(mulNum)); }
    // 計算
    var targetNumbers = target.getNumber();
    var mulNumbers = mulNum.getNumber();
    var sumValue = mulNumbers.reduceRight(function (total, mulNumber){
        var subtotal = targetNumbers.reduceRight(function (total2, targetNumber){
            var fst = Number(first(total2));
            var subtotal2 = String(fst + mulNumber * targetNumber);
            return splice(total2, 0, 1, subtotal2.padStart(2, "0"));
        }, "0");
        return BigFloat.addition(total, subtotal).toString();
    }, "0");
    var result = new BigFloat();
    result.setNumber(sumValue);
    result.setDecimalPoint(target.decimal.length + mulNum.decimal.length);
    result.setSign(target.isPositive === mulNum.isPositive);
    return result.format();
};
BigFloat.prototype.power = function power (){};
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
BigFloat.division = function division (target, divNum, validDigit){

    target = new BigFloat(target);
    divNum = new BigFloat(divNum);
    if(BigFloat.equals(divNum, Infinity))
        { return new BigFloat(); }
    if(BigFloat.equals(divNum, -Infinity))
        { return new BigFloat(-0); }
    if(BigFloat.equals(divNum, 0))
        { return new BigFloat(NaN); }
    if(BigFloat.equals(target, 0))
        { return new BigFloat(); }
    var sumValue = forIndex(Infinity, /** @param {Number} i*/ function (i){
        target = BigFloat.subtraction(target, divNum);
        return target.isPositive ? void 0 : i;
    });
    var result = new BigFloat();
    result.setNumber(sumValue);
    result.setDecimalPoint();
    return result.format();
};
/**
 * Alpha: 余剰
 *
 * @memberof BigFloat
 * @static
 * @param {NumberTypes} dividend 被除数(割られる数)
 * @param {NumberTypes} divisor 除数(割る数)
 * @returns
 */
BigFloat.surplus = function surplus (dividend, divisor){
    var terget = new BigFloat(dividend);
    var divisor_ = new BigFloat(divisor);
    divisor_.setSign(terget);
    var result = new BigFloat(doWhile(function (Continue){
        var subQuotient = BigFloat.subtraction(terget, divisor_);
        if(BigFloat.equals(subQuotient, 0))
            { return 0; }
        if(terget.isPositive === subQuotient.isPositive){
            terget = subQuotient;
            return Continue;
        }
        return terget;
    }));
    result.setSign(terget);
    return result;
};
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
BigFloat.div_WIP = function div_WIP (dividend, divisor, maxDigit){
        if ( maxDigit === void 0 ) maxDigit=100;

    var quotientList_商 = [];
    var isComplete = false;
    var remainders = [];
    // 小数部の桁数が maxFractionPartLength に到達するまでループで処理する。
    // 割り切れたり、循環節を検出できた等の理由で、除算が完了した場合はtrue。
    // 桁数の不足等で除算が完了していない場合はfalse。
    var recurringStartIndex = forIndex(maxDigit, function (){
        var remainder = Number(BigFloat.surplus(dividend, divisor));
        // 除算の商を求める。被除数から剰余を減算しておくことで、割り切れる除算を実行する。
        quotientList_商.push((dividend - remainder) / divisor);
        if(remainder === 0){
            // 割り切れた
            isComplete = true;
            return -1;
        }
        var recurringStartIndex = remainders.indexOf(remainder);
        if(recurringStartIndex !== -1){
            // 循環節を検出
            isComplete = true;
            return recurringStartIndex;
        }
        dividend = remainder * 10;
        remainders.push(remainder);
        return void 0;
    });
    var loopPoint = recurringStartIndex === -1 ? Infinity : recurringStartIndex;
    var integer = quotientList_商.shift();
    var decimal = quotientList_商.slice(0, loopPoint);
    var 循環小数 = quotientList_商.slice(loopPoint);
    return { integer: integer, decimal: decimal, 循環小数: 循環小数, isComplete: isComplete };
};
/**
 *
 *
 * @memberof BigFloat
 * @static
 * @param {NumberTypes[]} numbers
 * @returns
 */
BigFloat.equals = function equals$1 (){
        var numbers = [], len = arguments.length;
        while ( len-- ) numbers[ len ] = arguments[ len ];

    numbers = numbers.map(function (number){ return (
        new BigFloat(number).toString()
    ); });
    return equals.apply(void 0, numbers);
};

var hyperCall = function (a, lebel, b){
    if(lebel === 3)
        { return Math.pow( a, b ); }
    if(b === 0)
        { return 1; }
    console.log(a, lebel, b);
    lebel--;
    return previous(--b, function (prev){ return (
        console.log(prev)
        || hyperCall(a, lebel, prev)
    ); }, a);
};

var hyper = function (a, lebel, b){
    if ( b === void 0 ) b=a;

    switch(lebel){
    case 0:
        return ++b;
    case 1:
        return a + b;
    case 2:
        return a * b;
    default:
        return hyperCall(a, lebel, b);
    }
};

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
var abs = function (number){ return (
    number < 0 ||
    Object.is(-0, number) ||
    Object.is(BigInt(-0), number)
        ? -number : Number(number)
); };

/**
 * 引数の中で一番小さい値を返す。
 * @param  {...Number} args
 */
var min = function (){
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    return (
    args.reduce(function (minValue, value){ return (
        minValue < value ? minValue : value
    ); }, Infinity)
);
};

/**
 * 引数の中で一番大きい値を返す。
 * @param  {...Number} args
 */
var max = function (){
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    return (
    args.reduce(function (maxValue, value){ return (
        maxValue > value ? maxValue : value
    ); }, -Infinity)
);
};

/**
 * 階上。
 * @param {Number} num
 */
var factorial = function (num){
    if(Number.isNaN(num) || (!Number.isFinite(num) && typeof num !== "bigint") || typeof num !== "number" && typeof num !== "bigint")
        { return num; }
    for(var i = num;i > 2;num *= --i){ }
    return num ? num : ++num;
};

/**
 * 平均値
 * @param  {...Number} numbers
 */
var average = function (){
    var numbers = [], len = arguments.length;
    while ( len-- ) numbers[ len ] = arguments[ len ];

    var total = numbers.reduce(function (subTotal, number){ return (subTotal + number); }, 0);
    return total / numbers.length;
};

/**
 * 中央値
 * @param  {...Number} numbers
 */
var median = function (){
    var numbers = [], len = arguments.length;
    while ( len-- ) numbers[ len ] = arguments[ len ];

    numbers.sort();
    var center = (numbers.length + 1) / 2;
    if(Number.isInteger(center))
        { return numbers[center]; }
    return average(
        numbers[Math.floor(center)],
        numbers[Math.ceil(center)]
    );
};

// TODO: sin

// TODO: cos

// TODO: tan

// export const diff = (n1, n2)=>abs(n1-n2);

// TODO: 複素数
// export class Complex {}

// TODO: 公倍数, 公約数
/*
package_rei.addModule("math.ack", ({modules: {math}})=>).addModule("math.Chain", ()=>class Chain {
    constructor() {
        this.chain = [];
    }
    chain(num){
        this.chain.push(num);
    }
    sum(){}
});
*/

// TODO: xorshift
// const seedRandom = seed=>{
//     let x = seed * seed;
//     x ^= (x << 13);
//     x -= seed;
//     x ^= (x >> 17);
//     x += seed;
//     x ^= (x << 5);
//     return (x * x - seed) / seed;
// };

var sqrt5 = Math.sqrt(5);
/**
 * N番目のフィボナッチ数を取得する。
 * @param {Number} frequency N番目の指定
 */
var fibonacci$ = function (frequency){
    var x = Math.pow((1 + sqrt5) / 2, frequency);
    var y = Math.pow((1 - sqrt5) / 2, frequency);
    return Math.round((x - y) / sqrt5);
};

// /**
//  * フィボナッチ数列のジェネレーター。
//  *
//  * @param {Number} frequency Maximum number of times fibonacci number is generated
//  * @param {Number} seed
//  */
// export const fibonacci = function* (frequency=Infinity, seed=1){
//     // eslint-disable-next-line no-undef
//     for(let prev = BigInt(seed), fib = BigInt(0);frequency--;)
//         yield fib = prev + (prev = fib);
// };

// /**
//  * 素数のジェネレーター。
//  *
//  * @param {Number} frequency Maximum number of times prime number is generated
//  */
// export const prime = function* (frequency=Infinity){
//     yield 2;
//     for(let i = 3;frequency--;i += 2)
//         if(isPrime(i))yield i;
//         else frequency++;
// };

/**
 * 素因数分解。
 *
 * @param {Number} number Numbers to factor
 * @return Array of prime factor of `number`
 * @example
 * primeFactorization(200560490130);
 * // => [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31]
 */
var primeFactorization = function (number){
    if(Number.isNaN(number) || !Number.isFinite(number) || typeof number !== "number")
        { return []; }
    var result = [];
    while(number % 2 === 0){
        result.push(2);
        number /= 2;
    }
    for(var i = 3, sqrt = Math.sqrt(number);i <= sqrt;i += 2)
        { while(number % i === 0){
            result.push(i);
            number /= i;
        } }
    if(number > 1){ result.push(number); }
    return result;
};

var index$3 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    BigFloat: BigFloat,
    hyper: hyper,
    abs: abs,
    min: min,
    max: max,
    factorial: factorial,
    average: average,
    median: median,
    fibonacci$: fibonacci$,
    primeFactorization: primeFactorization
});

// eslint-disable-next-line spaced-comment
/*!
 * reiyayakko-core
 * Copyright 2020 reiyayakko
 * License MIT
 */

var env = {
    version: "1.1.1",
};

exports.env = env;
exports.math = index$3;
exports.object = index$2;
exports.utility = index$1;
//# sourceMappingURL=reiyayakko.cjs.js.map

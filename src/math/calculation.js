
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
export const abs = number=>(
    number < 0 ||
    Object.is(-0, number) ||
    Object.is(BigInt(-0), number)
        ? -number : Number(number)
);

/**
 * 引数の中で一番小さい値を返す。
 * @param  {...Number} args
 */
export const min = (...args)=>(
    args.reduce((minValue, value)=>(
        minValue < value ? minValue : value
    ), Infinity)
);

/**
 * 引数の中で一番大きい値を返す。
 * @param  {...Number} args
 */
export const max = (...args)=>(
    args.reduce((maxValue, value)=>(
        maxValue > value ? maxValue : value
    ), -Infinity)
);

/**
 * 階上。
 * @param {Number} num
 */
export const factorial = num=>{
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

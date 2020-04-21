
export const abs = x=>(
    x < 0 ? -x : number.toNumber(x)
);
export const min = (...args)=>(
    args.reduce((min, value)=>(
        min < value ? min : value
    ), Infinity)
);
export const max = (...args)=>(
    args.reduce((max, value)=>(
        max < value ? max : value
    ), -Infinity)
);
// TODO: sin
// TODO: cos
// TODO: tan
export const diff = (n1, n2)=>abs(n1-n2);
export const factorial = num=>{
    if(Number.isNaN(num) || (!Number.isFinite(num) && typeof num !== "bigint") || typeof num !== "number" && typeof num !== "bigint")
        return num;
    for(let i = num;i > 2;num *= --i);
    return num ? num : ++num;
};
const sqrt5 = Math.sqrt(5)
export const fibonacci$ = frequency=>{
    const x = Math.pow((1 + sqrt5) / 2, frequency);
    const y = Math.pow((1 - sqrt5) / 2, frequency);
    return Math.round((x - y) / sqrt5);
};
export const fibonacci = function* (frequency=Infinity){
    for(let prev = 1n, fib = 0n;frequency--;)
        yield fib = prev + (prev = fib);
};
export const isPrime = number=>{
    if(number === 2)
        return true;
    if(Number.isNaN(number) || !Number.isFinite(number) || number < 2 || number % 2 === 0)
        return false;
    for(let i = 3, sqrt = Math.sqrt(number);i <= sqrt;i += 2)
        if(number % i === 0)return false;
    return true;
};
export const prime = function* (frequency=Infinity){
    yield 2;
    for(let i = 3;frequency--;i += 2)
        if(isPrime(i))yield i;
        else frequency++;
};
export const primeFactorization = number=>new Promise((resolve, reject)=>{
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
export * from "./bigfloat"
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

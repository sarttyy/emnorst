
// @ts-check

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
export const abs = (number)=>(
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
export const factorial = (num)=>{
    if(Number.isNaN(num) || (!Number.isFinite(num) && typeof num !== "bigint") || typeof num !== "number" && typeof num !== "bigint")
        return num;
    for(let i = num;i > 2;num *= --i);
    return num ? num : ++num;
};

/**
 * 平均値
 * @param  {...Number} numbers
 */
export const average = (...numbers)=>{
    const total = numbers.reduce((subTotal, number)=>(subTotal + number), 0);
    return total / numbers.length;
};

/**
 * 中央値
 * @param  {...Number} numbers
 */
export const median = (...numbers)=>{
    numbers.sort();
    const center = (numbers.length + 1) / 2;
    if(Number.isInteger(center))
        return numbers[center];
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

/**
 * Greatest common divisor / 最大公約数
 * @param {number} num1
 * @param {number} num2
 */
export const gcd = (num1, num2)=>{
    for(;num1 % num2 !== 0;num1 %= num2)
        if(num1 < num2)
            [num2, num1] = [num1, num2];
    return num2;
};

/**
 * Least common multiple / 最小公倍数
 * @param {number} num1
 * @param {number} num2
 */
export const lcm = (num1, num2)=>(
    num1 / gcd(num1, num2) * num2
);
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

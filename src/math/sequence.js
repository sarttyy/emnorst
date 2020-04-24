
const sqrt5 = Math.sqrt(5);
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

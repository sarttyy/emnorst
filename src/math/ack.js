
// @ts-check

/**
 * @param {number} num1
 * @param {number} num2
 * @return {number}
 */
export const ack = (num1, num2)=>{
    if(Math.min(num1, num2) < 0)
        throw new Error("Negative argument cannot be specified for Ackermann function");
    const stack = [num1, num2];
    while(stack.length > 1){
        const n = stack.pop();
        const m = stack.pop();
        if(m === 0){
            stack.push(n + 1);
        }else if(n === 0){
            stack.push(m - 1);
            stack.push(1);
        }else if(m === 1){
            stack.push(n + 2);
        }else if(m === 2){
            stack.push(n * 2 + 3);
        }else{
            stack.push(m - 1);
            stack.push(m);
            stack.push(n - 1);
        }
    }
    return stack.pop();
};

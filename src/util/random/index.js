
// @ts-check

export * from "./xorshift";
export * from "./random";
export * from "./randomstr";
export * from "./probability";

// const temp = [123456789, 362436069, 521288629, 88675123];
// const shift = (a, b)=>a ^ (a >> b);
// const xorshift = ()=>{
//     const [z,,,t] = temp;
//     const tt = shift(z, 11);
//     temp.shift();
//     temp.push(shift(t, 19) ^ shift(tt, 8));
//     return temp[3];
// };

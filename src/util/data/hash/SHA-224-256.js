
// @ts-check

import { hashCore } from "./core.js";
import { fromBigEndian32, toBigEndian32, padding } from "./lib.js";

const K = [
    0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5, 0x3956c25b, 0x59f111f1, 0x923f82a4, 0xab1c5ed5,
    0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3, 0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174,
    0xe49b69c1, 0xefbe4786, 0x0fc19dc6, 0x240ca1cc, 0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da,
    0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7, 0xc6e00bf3, 0xd5a79147, 0x06ca6351, 0x14292967,
    0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13, 0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85,
    0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3, 0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070,
    0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5, 0x391c0cb3, 0x4ed8aa4a, 0x5b9cca4f, 0x682e6ff3,
    0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208, 0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2,
];
const initState = [
    0x6a09e667, 0xbb67ae85, 0x3c6ef372, 0xa54ff53a,
    0x510e527f, 0x9b05688c, 0x1f83d9ab, 0x5be0cd19,
];
const initState224 = [
    0xc1059ed8, 0x367cd507, 0x3070dd17, 0xf70e5939,
    0xffc00b31, 0x68581511, 0x64f98fa7, 0xbefa4fa4,
];

const rotr = (v, s) => (v >>> s) | (v << 32 - s);

const $ = (data, state) => {
    const stateRef = [...state];
    for(let i = 16;i < 64;i++) {
        const j15 = data[i - 15];
        const s0 = rotr(j15, 7) ^ rotr(j15, 18) ^ (j15 >>> 3);
        const j2 = data[i - 2];
        const s1 = rotr(j2, 17) ^ rotr(j2, 19) ^ (j2 >>> 10);
        data[i] = s0 + s1 + data[i - 7] + data[i - 16];
    }
    for(let i = 0;i < 64;i++) {
        const [s0, s1, s2,, s4, s5, s6, s7] = state;
        const ch = (s4 & s5) ^ (~s4 & s6);
        const S1 = rotr(s4, 6) ^ rotr(s4, 11) ^ rotr(s4, 25);
        const temp = s7 + S1 + ch + K[i] + data[i];
        state[3] += temp;
        const maj = (s0 & s1) ^ (s0 & s2) ^ (s1 & s2);
        const S0 = rotr(s0, 2) ^ rotr(s0, 13) ^ rotr(s0, 22);
        state.unshift(temp + S0 + maj);
        state.pop();
    }
    for(let i = 0;i < 8;i++)
        state[i] += stateRef[i];
};

const hashSHA256 = (data) => {
    const { length } = data;
    padding(data);
    data.push(0, 0, 0, 0);
    fromBigEndian32([length * 8], data);
    const state = [...initState];
    for(let i = 0;i < data.length;i += 64)
        $(toBigEndian32(data, i), state);
    return fromBigEndian32(state);
};

/**
 * SHA-256
 * @param {string} data
 * @param {{format?: "hex" | "binary" | "dec"}} [props]
 */
export const sha256 = (data, props={}) => hashCore(hashSHA256, data, props);

const hashSHA224 = (data) => {
    const { length } = data;
    padding(data);
    data.push(0, 0, 0, 0);
    fromBigEndian32([length * 8], data);
    const state = [...initState224];
    for(let i = 0;i < data.length;i += 64)
        $(toBigEndian32(data, i), state);
    return fromBigEndian32(state.slice(0, -1));
};

/**
 * SHA-224
 * @param {string} data
 * @param {{format?: "hex" | "binary" | "dec"}} [props]
 */
export const sha224 = (data, props={}) => hashCore(hashSHA224, data, props);

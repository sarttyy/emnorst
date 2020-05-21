
// @ts-check

import { hash } from "./core";
import { fromBigEndian32, toBigEndian32, paddingData, ch, maj, xor3 } from "./lib";
import { forIndex } from "../../../utility/loop/index";

const K = [0x5a827999 , 0x6ed9eba1 , 0x8f1bbcdc , 0xca62c1d6];
const blockLen = 64;
const initState = [0x67452301 , 0xefcdab89 , 0x98badcfe , 0x10325476 , 0xc3d2e1f0];
const sttLen = initState.length;

const rotl = (_v, _s) => (
    (_v << _s) | (_v >>> (32 - _s))
);

const round = (_block) => {
    const state = [...initState];
    for (let i = 0;i < _block.length;i += blockLen) {
        const stateRef = [...state];
        const x = toBigEndian32(_block.slice(i, i + blockLen));
        for(let j = 16;j < 80;j++)
            x[j] = rotl(x[j-3] ^ x[j-8] ^ x[j-14] ^ x[j-16], 1);
        forIndex(80, (index)=>{
            const state1_3 = state.slice(1, 4);
            const tmp
                = index < 20 ? ch(...state1_3) + K[0]
                : index < 40 ? xor3(state) + K[1]
                : index < 60 ? maj(...state1_3) + K[2]
                : xor3(state) + K[3];
            const temp = tmp + rotl(state[0], 5) + x[index] + state[4];
            state[1] = rotl(state[1], 30);
            state.unshift(temp);
            state.pop();
        });
        forIndex(sttLen, (index)=>{
            state[index] += stateRef[index];
        });
    }
    return fromBigEndian32(state);
};

/**
 * SHA-1
 * @param {string} text
 * @param {"hex" | "binary" | "dec"} [format]
 */
export const SHA1 = (text, format) => (
    hash(text, format, round, paddingData)
);


// @ts-check

import { getKeys } from "./keys.js";

const getPropNames = Object.getOwnPropertyNames || getKeys;

const getPropSymbols = Object.getOwnPropertySymbols;

/**
 * 受け取ったオブジェクトの全てのプロパティー名とSymbolを取得します。
 * @param  {...any} objs キーを取得するオブジェクトです。
 * @return {PropertyKey[]} オブジェクトのプロパティー名とSymbolの配列です。
 */
export const allKeys = (...objs) => {
    const result = [];
    for(let i = 0;i < objs.length;i++) {
        const keys = [].concat(getPropNames(objs[i]), getPropSymbols(objs[i]));
        for(let j = 0;j < keys.length;j++) {
            ~result.indexOf(keys[j])
            || result.push(keys[j]);
        }
    }
    return result;
};

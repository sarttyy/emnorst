
// @ts-check

import { isNullLike } from "../../utility/index.js";
import { keys } from "./keys.js";

const getPropNames = Object.getOwnPropertyNames || keys;

const getPropSymbols = Object.getOwnPropertySymbols;

/**
 * 受け取ったオブジェクトの全てのプロパティー名とSymbolを取得します。
 * @param  {any} object キーを取得するオブジェクトです。
 * @return {(String | symbol)[]} オブジェクトのプロパティー名とSymbolの配列です。
 */
export const allKeys = (object)=>(
    isNullLike(object) ? null : []
        .concat(getPropNames(object))
        .concat(getPropSymbols && getPropSymbols(object))
);

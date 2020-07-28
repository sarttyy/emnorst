
// @ts-check

import { deepBase } from "../deepbase/index.js";
import { has } from "../property/has.js";
import { property } from "../property/property.js";
import { copyType } from "./copyType.js";
import { assertType } from "../../utility/condition/assert-type.js";
import { isInfinity } from "../../util/is/number.js";

/**
オブジェクトに深いコピーを行います。
prototype
クロージャの可能性を考慮して関数はコピーしません。

この関数が複製しないオブジェクト
- 関数(クロージャーやコンストラクターの問題を解決できないため)
- Mapのkey
- WeakMap, WeakSet(列挙が不可能なため)
- ECMAScriptにないオブジェクト

コピーするオブジェクトです。

コピーを行う深度を指定します。0でシャローコピーです。
*/

/**
 * TODO: Map, Set
 *
 * RC:
 * The function is not copied due to the possibility of closure.
 * @param {*} target The object to copy.
 * @param {number} depth Specify the depth to copy. 0 is a shallow copy.
 * @example
 * const hoge = {
 *     array: [1, 1, 2, 3, 5, 8],
 *     null: null,
 *     number: new Number(0xff),
 *     string: new String("hello machilia!"),
 *     boolean: new Boolean(true),
 *     regexp: /./,
 *     date: new Date(),
 *     error: new Error("418 I'm a teapot"),
 *     bigint: 9007199254740993n,
 *     arguments: (function() { return arguments; })(),
 *     ...etc,
 * };
 * target.recursive = target;
 *
 * const cloned = clone(target);
 *
 * target !== cloned // => true
 */
export const clone = (target, depth=Infinity) => {
    const root = copyType(target);
    const clonedMap = new Map([[target, root]]);
    deepBase(target, {
        depthLimit: depth,
        hooks: {
            propBefore(propDesc, path, { innermost }) {
                if(!innermost && has(propDesc, "value")) {
                    const { value } = propDesc;
                    propDesc = { ...propDesc, value: copyType(value) };
                    clonedMap.set(value, propDesc.value);
                }
                const last = path.pop();
                const context = property(root, path);
                Object.defineProperty(context, last, propDesc);
            },
            existing(propDesc, path) {
                const last = path.pop();
                const context = property(root, path);
                Object.defineProperty(context, last, {
                    ...propDesc,
                    value: clonedMap.get(propDesc.value)
                });
            },
        },
    });
    return root;
};

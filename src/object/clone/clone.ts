
import { DeepState } from "../deep-explore";
import { copyBase } from "./copy-base";

/*
オブジェクトに深いコピーを行います。
prototype
クロージャの可能性を考慮して関数はコピーしません。

この関数が複製しないオブジェクト
- 関数(クロージャーやコンストラクターの問題を同時に解決できないため)
    - new Function(fn.toString())
    - function() { return fn.apply(this, arguments); }
- Mapのkey
- WeakMap, WeakSet(列挙が不可能なため)
- ECMAScriptにないオブジェクト

コピーするオブジェクトです。

コピーを行う深度を指定します。0でシャローコピーです。
*/

interface CloneOptions {
    depth?: number;
}

/**
 * TODO: support Map, Set
 *
 * The function is not copied due to the possibility of closure.
 *
 * @param target The object to copy.
 * @param options Specify the depth to copy. 0 is a shallow copy.
 * @return cloned object
 * @example
 * const target = {
 *     array: [1, 1, 2, 3, 5, 8],
 *     null: null,
 *     number: new Number(0xff),
 *     string: new String("hello world!"),
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
export const clone = <T>(target: T, options: CloneOptions={}): T => {
    const deepState = new DeepState({
        depthLimit: options.depth,
        every({ isExplore, value }) {
            if(isExplore) {
                return copyBase(value);
            }
        },
        property({ existings, parent, descriptor, value, key, isAccessor }) {
            const context = existings.get(parent);
            if(isAccessor) {
                Object.defineProperty(context, key!, descriptor);
            } else return () => {
                Object.defineProperty(context, key!, {
                    configurable: descriptor.configurable,
                    enumerable: descriptor.enumerable,
                    writable: descriptor.writable,
                    value: existings.has(value as object)
                        ? existings.get(value as object) : value,
                });
            };
        }
    });
    deepState.exploreSingle(target);
    return deepState._existings.get(target);
};

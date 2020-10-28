
import { explore } from "../deep-explore";
// import { has } from "../property/has";
import { property } from "../property/property";
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
 * const hoge = {
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
    const root = copyBase(target);
    const clonedMap = new Map;
    clonedMap.set(target, root);
    explore(target, {
        depthLimit: options.depth,
        // existings: new Map,
        // every({ isExplore, existings, value }) {
        //     if(isExplore) existings.set(value, copyBase(value));
        // },
        property({ propDesc, path: [...path], deepest }) {
            if(!deepest && "value" in propDesc) {
                const { value: oldValue } = propDesc;
                propDesc = {
                    configurable: propDesc.configurable,
                    enumerable: propDesc.enumerable,
                    writable: propDesc.writable,
                    value: copyBase(oldValue),
                };
                clonedMap.set(oldValue, propDesc.value);
            }
            const last = path.pop();
            const context = property(root, path);
            Object.defineProperty(context, last, propDesc);
        },
        recursive({ propDesc, path: [...path] }) {
            const last = path.pop();
            const context = property(root, path);
            Object.defineProperty(context, last, {
                configurable: propDesc.configurable,
                enumerable: propDesc.enumerable,
                writable: propDesc.writable,
                value: clonedMap.get(propDesc.value)
            });
        },
    });
    return root;
};


import { callorElse } from "../../utility/index";
import { allKeys } from "../property";
import { allocate } from "./allocate";

/**
 * deepBaseのプロパティー
 * @typedef {{
 * keys: Function;
 * depth: Number;
 * maxDepth: Number;
 * existing: Set | WeakSet;
 * structureCall: Function;
 * propFuncIfObject: Function;
 * propFunc: Function;
 * }} prop
 */

/**
 * WIP: 開発難航中。
 * WARNING: おそらくバグ多数あり。
 * 汎用Deep関数
 * @param {Object} targetObject
 * @param {prop} props
 */
export const deepBase = (targetObject, props={})=>{
    ({
        keys:     props.keys = allKeys,
        depth:    props.depth = 0,
        maxDepth: props.maxDepth = Infinity,
        existing: props.existing = new WeakSet(),
        structureCall: props.structureCall = console.log,
        propFuncIfObject: props.propFuncIfObject = console.log,
        propFunc: props.propFunc = console.log,
    } = props);
    callorElse(props.structureCall, targetObject);
    for(const propName of props.keys(targetObject)){
        allocate(targetObject, propName, props);
    }
};


// @ts-check

import { isDefined } from "../../util/is/index.js";

// break
// 回数
// その他素のループで便利な機能詰め込み

/**
 * @param {function} func
 * @param {*} props
 */
export const loop = (func, props={})=>{
    const {
        limit = 1000,
        isBreak = isDefined,
        fromAbove = false,
        fold,
    } = props;
    for(let index = -1;index++ < limit;){
        const flag = func.call(props.contest, props.arg);
        if(isBreak(flag))
            return props.complete || flag;
            // complete | break
    }
    return props.finish;
};

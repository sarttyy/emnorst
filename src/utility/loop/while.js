
import {isUndefined} from "../is/index";

/**
 * MEMO: ループ条件とreturnをどうにかして引き剥がしたい。
 * MEMO: do取りたい。flag初期値追加。
 * @param {Function} func Callback function that continues to run as long as it returns undefined
 * @param {*} [that] Specify this of the callback function
 */
export const doWhile = (func, that)=>{
    let flag;
    do flag = func.call(that);
    while(isUndefined(flag));
    return flag;
};

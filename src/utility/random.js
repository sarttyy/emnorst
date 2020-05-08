
/**
 * @param {Number} min
 * @param {Number} max
 */
export const random = (min, max)=>(
    Math.random() * (max - min) + min
);

/**
 * 小文字アルファベットと数字の文字列を生成します。
 * @param {Number} length 文字列の長さ
 */
export const randomStr = (length=8)=>{
    let result = "";
    do result += Math.random().toString(36).slice(-10);
    while(result.length < length);
    return result.slice(-length);
};

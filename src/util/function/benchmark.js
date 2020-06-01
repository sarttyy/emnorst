
// @ts-check

/**
 * @param {string} text
 * @param {number} limit
 * @param {string} rest
 */
const pr = (text, limit, rest="...") => {
    if(text.length > limit) {
        text = text.slice(0, limit - rest.length) + rest;
    }
    return text;
};

/*
Javascriptでミリ秒より細かい数字が取得できないため、
実行に時間がかからない関数ほど多く実行します。
より多く実行して正確なデータを取得したい場合は大きな値を指定してください。
N回目のベンチマーク実行中に以下のエラーが発生しました。
*/

/**
 * @param {function(): void} func
 * @param {number} base
 */
export const benchmark = (func, base=10000) => {
    const now = typeof performance === "object"
        ? performance : Date;

    // 一回の実行時間の計測
    const firstStartDate = now.now();
    try{ func(); }catch(err){
        console.error("An error occurred during the benchmark.", err);
    }
    const firstTime = now.now() - firstStartDate;

    // ベンチマーク回数の決定
    let count = Math.floor(base / firstTime ** 1.4 / 2);
    const countRef = 1 + (count = Math.max(count, 2));

    // 関数の表示名
    const displayName = pr((func.name || func.toString()).replace(/\s+/g, " "), 40);
    const __ = `benchmark total time\n(${displayName})`;

    // 計測
    console.time(__);
    const startDate = now.now();
    try{
        for(;--count;)func();
    }catch(err){
        console.error(`The following error occurred during the ${countRef - count}th benchmark run.\n`, err);
    }
    const totalTime = now.now() - startDate + firstTime;
    console.timeEnd(__);

    // 結果の出力
    const executionsCount = countRef - count;
    const once = totalTime / executionsCount;
    return {
        executionsCount,
        totalTime,
        score: once ** -1 * 2,
        once
    };
};

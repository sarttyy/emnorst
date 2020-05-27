
// @ts-check

/*
Javascriptでミリ秒より細かい数字が取得できないため、
実行に時間がかからない関数ほど多く実行します。
より多く実行して正確なデータを取得したい場合は大きな値を指定してください。
*/

/**
 * @param {function(): void} func
 * @param {number} base
 */
export const benchmark = (func, base=10000) => {
    const firstStartDate = Date.now();
    try{ func(); }catch(err){
        console.error("An error occurred during the benchmark.", err);
    }
    const firstTime = Date.now() - firstStartDate;
    let count = Math.floor(firstTime ** -1.4 * base);
    const countRef = count = Math.min(Math.max(count, 2), base);
    const startDate = Date.now();
    console.time("benchmark");
    for(;count--;){
        try{ func(); }catch(err){
            console.error("An error occurred during the benchmark.", err);
        }
    }
    console.timeEnd("benchmark");
    const totalTime = Date.now() - startDate;
    return {
        executionsCount: countRef,
        totalTime,
        score: totalTime / countRef,
    };
};

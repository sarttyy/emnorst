
// @ts-check

/**
 * @param {*} orign
 * @param {PropertyKey} m
 * @param {PropertyKey} n
 */
export const swap = (orign, m, n)=>{
    const temp = orign[m];
    orign[m] = orign[n];
    orign[n] = temp;
    return orign;
};

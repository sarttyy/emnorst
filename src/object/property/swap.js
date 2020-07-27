
/*
オブジェクトの指定したプロパティを入れ替えます。

このオブジェクトに対して代入します。指定しない場合、 `origin`が指定されます。
*/

/**
 * @param {*} orign Swaps the specified properties of the object.
 * @param {PropertyKey} m
 * @param {PropertyKey} n
 * @param {*} [edit] Assign to this object. If not specified, `origin` is specified.
 */
export const swap = (orign, m, n, edit=orign) => {
    const temp = orign[m];
    edit[m] = orign[n];
    edit[n] = temp;
    return edit;
};

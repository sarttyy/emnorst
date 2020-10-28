
/*
オブジェクトの指定したプロパティを入れ替えます。

このオブジェクトに対して代入します。指定しない場合、 `origin`が指定されます。
*/

/**
 * @param origin Swaps the specified properties of the object.
 * @param m
 * @param n
 * @param edit Assign to this object. If not specified, `origin` is specified.
 */
export const swap = (origin: object, m: PropertyKey, n: PropertyKey, edit=origin): object => {
    if(m === n) {
        if(origin !== edit) edit[m] = origin[m];
        return edit;
    }
    const temp = origin[m];
    edit[m] = origin[n];
    edit[n] = temp;
    return edit;
};

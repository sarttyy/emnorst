
// comparison: {
//     /**
//      * @param {number} n
//      * @param {number} m
//      */
//     const lessThan = (n, m)=>(n < m);
//     /**
//      * @param {number} n
//      * @param {number} m
//      */
//     const greaterThan = (n, m)=>(n > m);
//     break comparison;
// }

/**
 * @deprecated
 * @param {*} object
 * @param {*} func
 * @param {*} [that]
 */
export const forIn = (object, func, that)=>{
    if(typeof object === "object")
        object = Object.entries(object);
    return forIndex(object.length, (index)=>(
        func.call(that, object[index])
    ));
};


import * as utility from "../utility/index";
const deepEqual = ([value, other])=>{
    const type = utility.typeOf(value)
    if(type !== utility.typeOf(other))
        return false;
    if(typeof value === "object"){
        const zip = utility.zip(utility.iterate(value), utility.iterate(other));
        return [...zip].every(deepEqual);
    }
    return utility.equals(value, other);
};
export const deepEquals = (...values)=>{
    let prev = values.shift();
    return values.every(value=>deepEqual([prev, prev=value]));
};

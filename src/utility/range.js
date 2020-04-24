
import {isUndefined} from "./is";

export const range = function* (start, end, increment){
    if(isUndefined(end))
        return range(0, start);
    increment = Math.abs(increment || 1);
    if(start > end)increment = -increment;
    while(Math.abs(end - start) >= Math.abs(increment)){
        yield start;
        start += increment;
    }
    yield start;
    return void 0;
};

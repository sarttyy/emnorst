
import {undertake} from "./recursive";

export const clone = (object, depth=0)=>(
    undertake(object, depth)
);

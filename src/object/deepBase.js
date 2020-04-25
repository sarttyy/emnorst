
import {allKeys} from "./temp";
import {isObjectLike} from "../utility/is/index";
import {callorElse} from "../utility/index";

// INFO: 汎用Deep関数
export const deepBase = (object, props={})=>{
    const {
        keys=allKeys,
        depth=0,
        maxDepth=Infinity,
        existing=new WeakSet()
    } = props;
    callorElse(props.structureFunc, [object]);
    for(const propName of keys(object)){
        if(isObjectLike(object[propName])){
            callorElse(props.propStructure, [object, propName]);
            deepBase(object[propName], {
                ...props,
                depth: depth+1,
                maxDepth,
                existing,
            });
        }else
            callorElse(props.propFunc, [object, propName]);
    }
};

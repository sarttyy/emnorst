
import { anonymous } from "../../util/function/simple/anonymous.js";
import { isObject } from "../../util/is/object/object.js";
import { defineProperties } from "./defineProperty.js";

let create = Object.create;

if(typeof create !== "function") {
    const C = anonymous(class {});
    create = (prototype, properties={}) => {
        let obj;

        if(isObject(prototype)) {
            C.prototype = prototype;
            obj = new C();
            C.prototype = null;
        }else obj = { __proto__: prototype };

        return defineProperties(obj, properties);
    };
}

export { create };


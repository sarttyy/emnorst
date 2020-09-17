
import { anonymous } from "../../util/function/simple/anonymous.js";
import { isObject } from "../../util/is/object/object.js";

export let create = Object.create;

if(typeof create !== "function") {
    // eslint-disable-next-line prefer-arrow-callback
    const C = anonymous(function() {});
    create = (prototype, properties={}) => {
        let obj;

        if(isObject(prototype)) {
            C.prototype = prototype;
            obj = new C();
            C.prototype = null;
        }else obj = { __proto__: prototype };

        return Object.defineProperties(obj, properties);
    };
}

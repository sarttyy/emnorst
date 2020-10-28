
import { anonymous } from "../../util/function/simple/anonymous.js";
import { isObject } from "../is/object";

export let create = Object.create;

if(typeof create !== "function") {
    // eslint-disable-next-line prefer-arrow-callback, no-empty-function
    const C = anonymous(function() {});
    create = (prototype, properties={}) => {
        let obj;

        if(isObject(prototype)) {
            C.prototype = prototype;
            obj = new C();
            C.prototype = null;
        }

        return Object.defineProperties(obj, properties);
    };
}

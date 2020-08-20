
import { getKeys } from "../property/keys.js";

let { values } = Object;

if(typeof values !== "function") {
    values = (obj) => {
        const values$ = [];

        const keys = getKeys(obj);
        for(let i = 0;i < keys.length;i++) {
            const key = keys[i];
            values$[i] = obj[key];
        }
        return values$;
    };
}

export { values };

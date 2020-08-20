
import { keys } from "./keys.js";

let values = Object.values;

if(typeof values !== "function") {
    values = (obj) => {
        const values$ = [];

        const keys$ = keys(obj);
        for(let i = 0;i < keys$.length;i++) {
            const key = keys$[i];
            values$[i] = obj[key];
        }
        return values$;
    };
}

export { values };

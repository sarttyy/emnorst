
import { getKeys } from "./keys.js";

let defineProperties = Object.defineProperties;

const { defineProperty } = Object;

if(typeof defineProperties !== "function") {
    defineProperties = (obj, properties) => {
        properties = Object(properties);

        const keys = getKeys(properties);
        for(let i = 0;i < keys.length;i++) {
            const key = keys[i];
            defineProperty(obj, key, properties[key]);
        }
        return obj;
    };
}

export { defineProperty, defineProperties };

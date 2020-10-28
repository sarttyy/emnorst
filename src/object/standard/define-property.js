
import { getKeys } from "./keys.js";

export const { defineProperty } = Object;

export let defineProperties = Object.defineProperties;

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

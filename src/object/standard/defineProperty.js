
import { getKeys } from "./keys.js";

export let defineProperties = Object.defineProperties;

export const { defineProperty } = Object;

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

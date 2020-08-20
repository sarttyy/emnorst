
import { getKeys } from "./keys.js";

let assign = Object.assign;

if(typeof assign !== "function") {
    assign = (target, ...sources) => {
        const error = new TypeError("Cannot convert undefined or null to object");
        if(target == null) throw error;

        for(let i = 0;i < sources.length;i++) {
            const source = sources[i];

            if(source == null) throw error;

            const keys = getKeys(source);
            for(let j = 0;j < keys.length;i++) {
                const key = keys[j];
                target[key] = source[key];
            }
        }
        return target;
    };
}

export { assign };

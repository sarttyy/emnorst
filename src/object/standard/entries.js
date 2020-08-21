
import { keys } from "./keys.js";

export let entries = Object.entries;

if(typeof entries !== "function") {
    entries = (obj) => {
        const entries$ = [];

        const keys$ = keys(obj);
        for(let i = 0;i < keys$.length;i++) {
            const key = keys$[i];
            entries$[i] = [key, obj[key]];
        }
        return entries$;
    };
}

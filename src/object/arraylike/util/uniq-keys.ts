
import { toPropertyKey } from "../../property/to-property-key";

/**
 *
 * @param keys
 */
export const uniqKeys = <T extends PropertyKey>(keys: T[], mapToKey=true): T[] => {
    const existings: { [P in T]?: null } = {};
    const result: T[] = [];
    for(let i = 0;i < keys.length;i++) {
        const key = mapToKey ? toPropertyKey(keys[i]) as T : keys[i];
        if(existings[key] !== null) {
            existings[key] = null;
            result.push(key);
        }
    }
    return result;
};

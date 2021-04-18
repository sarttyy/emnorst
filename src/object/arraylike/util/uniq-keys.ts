
import { toPropertyKey } from "../../property/to-property-key";

const EXISTING = null;

/**
 *
 * @param keys
 */
export const uniqKeys = <T extends PropertyKey>(keys: ArrayLike<T>, mapToKey=false): T[] => {
    const existings: { [P in T]?: typeof EXISTING } = {};
    const result: T[] = [];

    for(let i = 0;i < keys.length;i++) {
        const key = mapToKey ? toPropertyKey(keys[i]) as T : keys[i];
        if(existings[key] !== EXISTING) {
            existings[key] = EXISTING;
            result.push(key);
        }
    }

    return result;
};


import { equals } from "../../util/is/equals/equals";
import { typeOf } from "../../util/standard/type-of";
import { deepExplore } from "../deep-explore";
import { has } from "../property/has";
import { property } from "../property/property";

/**
 * @example
 * isMatch({ hoge: 4, huga: 8 }, { hoge: 4 })
 */
export const isMatch = (target: any, matchObj: any, props: any): boolean => (
    !deepExplore(matchObj, {
        ...props,
        every(matchValue: object, path: PropertyKey[], { isDive }) {
            const last = path.pop();
            const targetContext = property(target, path);
            if(!has(targetContext, last)) {
                // deepExplore.break();
                return;
            }
            const targetValue = targetContext[last];
            if(isDive) {
                const eq = typeOf(matchValue) === typeOf(targetValue)
                    && matchValue.constructor === targetValue.constructor;
                // if(!eq) deepExplore.break();
            }else if(!equals(matchValue, targetValue));
                // deepExplore.break();
        }
    }).calls.break
);

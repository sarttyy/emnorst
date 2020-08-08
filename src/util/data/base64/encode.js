
import { chunk } from "../../../object/arraylike/util/chunk";
import { foldLeft } from "../../../utility/loop/fold";
import { base64Table } from "./table.js";

const str2bin = (str) => (
    foldLeft(str, (binStr, char) => (
        binStr + char.charCodeAt().toString(2).padStart(8, "0")
    ), "")
);

export const base64Encode = (str) => {
    str = str2bin(str);
    str = chunk(str, 6);
    // str[str.length - 1] = "100000";
    for(let i = 0;i < str.length;i++) {
        const bin = str[i].padEnd(6, "0");
        const num = parseInt(bin, 2);
        str[i] = base64Table.charAt(num);
    }
    const fill = str.length % 6;
    if(fill) str.push("=".repeat(6 - fill));
    return str.join("");
};

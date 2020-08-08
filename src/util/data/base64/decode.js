
import { chunk } from "../../../object/arraylike/util/chunk";
import { foldLeft } from "../../../utility/loop/fold";
import { base64Table } from "./table.js";

const bin2str = (bin) => (
    foldLeft(bin.filter((char) => parseInt(char, 2)), (binStr, char) => (
        binStr + String.fromCharCode(parseInt(char, 2))
    ), "")
);

export const base64Decode = (base64Str) => {
    const bin = [];
    for(let i = 0;i < base64Str.length;i++) {
        if(base64Str[i] === "=") continue;
        const n = base64Table.indexOf(base64Str[i]);
        bin[i] = n.toString(2).padStart(6, "0");
    }
    return bin2str(chunk(bin.join(""), 8));
};

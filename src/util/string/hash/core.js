
import { isArray, isString } from "../../is/index";
import { foldLeft } from "../../../utility/loop/fold";

const toHex = function(_decz) {
    let hex = "";
    for (let i = 0;i<_decz.length;i++)
        hex += (_decz[i] > 0xf ? "" : "0") + _decz[i].toString(16);
    return hex;
};

const pack = (text) => (
    foldLeft(text, (result, charCode)=>(
        result += String.fromCharCode(charCode)
    ), "")
);

const unpack = (text) => {
    const result = [];
    for(let n = 0, i = 0, c;i < text.length;i++){
        c = text.charCodeAt(i);
        if(c <= 0xff)
            result[n++] = c;
        else{
            result[n++] = c >>> 8;
            result[n++] = c & 0xff;
        }
    }
    return result;
};

const getMD = (data, round, paddingData) => {
    let datz = [];
    if(isArray(data)) datz = data;
    else if(isString(data)) datz = unpack(data);
    datz = paddingData(datz);
    return round(datz);
};

export const hash = (text, format, round, paddingData) => {
    const data = getMD(text, round, paddingData);
    switch(format){
    default:
    case "hex":
        return toHex(data);
    case "binary":
        return pack(data);
    case "dec":
        return data;
    }
};

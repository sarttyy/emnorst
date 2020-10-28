
// @ts-check

export const fromLittleEndian32 = (data, arr) => {
    const result = arr || [];
    while(data.length) {
        const ___ = data.shift();
        result.push(___ & 0xff);
        result.push(___ >>> 8 & 0xff);
        result.push(___ >>> 16 & 0xff);
        result.push(___ >>> 24 & 0xff);
    }
    return result;
};

export const toLittleEndian32 = (data, i=0) => {
    const result = [];
    for(let j = 16;j--;) {
        const d0 = data[i++];
        const d1 = data[i++] << 8;
        const d2 = data[i++] << 16;
        const d3 = data[i++] << 24;
        result.push(d0 | d1 | d2 | d3);
    }
    return result;
};

export const fromBigEndian32 = (data, arr) => {
    const result = arr || [];
    while(data.length) {
        const ___ = data.shift();
        result.push(___ >>> 24 & 0xff);
        result.push(___ >>> 16 & 0xff);
        result.push(___ >>> 8 & 0xff);
        result.push(___ & 0xff);
    }
    return result;
};

export const toBigEndian32 = (data, i=0) => {
    const result = [];
    for(let j = 16;j--;) {
        const d0 = data[i++] << 24;
        const d1 = data[i++] << 16;
        const d2 = data[i++] << 8;
        const d3 = data[i++];
        result.push(d0 | d1 | d2 | d3);
    }
    return result;
};

export const padding = (data) => {
    const len = data.length & 0x3f;
    let paddingLen = (len < 56 ? 56 : 64) - len;
    if(paddingLen) {
        data.push(0x80);
        while(--paddingLen) data.push(0);
    }
    return data;
};


// @ts-check

export const fromBigEndian32 = (_blk) => {
    const result = [];
    for (let n = 0, i = 0;i < _blk.length;i++) {
        result[n++] = (_blk[i] >>> 24) & 0xff;
        result[n++] = (_blk[i] >>> 16) & 0xff;
        result[n++] = (_blk[i] >>> 8) & 0xff;
        result[n++] = _blk[i] & 0xff;
    }
    return result;
};

export const toBigEndian32 = (_blk) => {
    const tmp = [];
    for(let n = 0, i = 0;i < _blk.length;i += 4, n++)
        tmp[n] = (_blk[i] << 24) | (_blk[i + 1] << 16) | (_blk[i + 2] << 8) | _blk[i + 3];
    return tmp;
};

const blockLen = 64;

export const paddingData = (_datz) => {
    let datLen = _datz.length;
    let n = datLen;
    _datz[n++] = 0x80;
    while(n % blockLen !== 56)_datz[n++] = 0;
    datLen *= 8;
    return _datz.concat(0, 0, 0, 0, fromBigEndian32([datLen]));
};

export const ch = (_b, _c, _d) => (
    (_b & _c) ^ (~_b & _d)
);

export const maj = (_b, _c, _d) => (
    (_b & _c) ^ (_b & _d) ^ (_c & _d)
);

export const xor3 = (state) => (state[1] ^ state[2] ^ state[3]);

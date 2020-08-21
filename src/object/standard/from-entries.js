
export let fromEntries = Object.fromEntries;

if(typeof fromEntries !== "function") {
    fromEntries = (entries) => {
        const obj = {};

        for(let i = 0;i < entries.length;i++) {
            const [key, value] = entries[i];
            obj[key] = value;
        }
        return obj;
    };
}

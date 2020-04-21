
const last = (array, index=1)=>(
    array[array.length - index]
);
export const zip = function* (...arrays){
    if(typeof last(arrays) === "function"){
        const func = arrays.pop();
        arrays = arrays.map(func);
    }
    const max = arrays.reduce((length, array)=>(
        Math.max(length, array.length)
    ), 0);
    for(let i=0;max>i;i++){
        yield arrays.reduce((iarrays, array)=>{
            iarrays.push(array[i]);
            return iarrays;
        }, []);
    }
};
export const through = function* (start, end, increment){
    increment = Math.abs(increment || 1);
    if(start > end)increment = -increment;
    while(Math.abs(start - end) >= Math.abs(increment)){
        yield start;
        start += increment;
    }
    yield start;
};


export const equals = (...values)=>{
    // SameValueZero
    let prev = values.shift();
    return values.every(value=>(
        Number.isNaN(prev)
            ? Number.isNaN(prev=value)
            : prev===(prev=value)
    ));
};

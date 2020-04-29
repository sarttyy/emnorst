
const ack = (x, y)=>{
    // eslint-disable-next-line no-undef
    if(min(x, y) < 0)
        throw new Error("Negative argument cannot be specified for Ackermann function");
    const carry = {};
    while(carry.x !== 0){
        if(carry.y === 0){
            carry.x--;
            carry.y = 1;
            continue;
            // return ack(--x, 1);
        }
        carry.x--;
        carry.y = ack(carry.x, --carry.y);
        // return ack(--x, ack(x, --y));
    }
    return ++carry.y;
};

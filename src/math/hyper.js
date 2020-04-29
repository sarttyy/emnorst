
// TODO: ハイパー演算
import {previous} from "../utility/loop/index";

const hyperCall = (a, lebel, b)=>{
    if(lebel === 3)
        return a ** b;
    if(b === 0)
        return 1;
    console.log(a, lebel, b);
    lebel--;
    return previous(--b, prev=>(
        console.log(prev)
        || hyperCall(a, lebel, prev)
    ), a);
};

export const hyper = (a, lebel, b=a)=>{
    switch(lebel){
    case 0:
        return ++b;
    case 1:
        return a + b;
    case 2:
        return a * b;
    default:
        return hyperCall(a, lebel, b);
    }
};


import { iterate } from "./loop/iterate.js";

export const tryCatch = (tryFunc, catcher)=>{
    try{
        return tryFunc();
    }catch(error){
        return (catcher || console.error)(error);
    }
};

class Yields {
    constructor(parent){
        this.phase = 0;
        this.parent = parent;
        this.return = parent.return.bind(parent);
    }
    goto(number){
        this.isMove = true;
        this.phase = number;
    }
    yield(value){
        this.parent.resultStack.push(value);
        return this.parent.value;
    }
    yield$(values){
        values = iterate(values);
        values.next();
        // forOf.call(this, values, this.yield);
        return this.parent.value;
    }
}

const result = (value, done=true)=>({ value, done });

class Generator {
    constructor(func){
        this.cb = func;
        this.resultStack = [];
        this.done = false;
        this.yields = new Yields(this);
    }
    [Symbol.iterator](){
        return this;
    }
    next(value){
        this.value = value;
        while(!this.resultStack.length){
            this.cb(this.yields);
            if(this.yields.isMove)
                this.yields.isMove = false;
            else this.yields.phase++;
            if(this.done)return result();
        }
        return result(this.resultStack.shift(), this.done);
    }
    return(value){
        this.done = true;
        this.resultStack.length = 0;
        return result(value);
    }
    throw(){ return this.next(); }
}

/**
 * @param {function(Yields): void} func
 * @return {Generator}
 */
export const generator = (func)=>new Generator(func);

// void ((_)=>{
//     switch(_.phase){
//     case 0:
//         return _.yield(0);
//     case 1:
//         _.yield([1,2,3,4]);
//         return _.yield$([1,2,3,4]);
//     case 2:
//         return _.return("return");
//     case 3:
//         _.goto(0);
//     }
// });
// let i = 0;
// const countor = generator((_)=>{
//     switch(_.phase){
//     case 0:
//         _.goto(0);
//         return i <= 10
//             ? _.yield(i++)
//             : _.return("return");
//     }
// });
// forOf(countor(10), console.log);

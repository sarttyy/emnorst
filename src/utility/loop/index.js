
export * from "./for";
export * from "./while";
export * from "./order";

const propGetter = key=>obj=>obj[key];

// TODO: iterate - 何でもループ"できるようにする"やつ
export const iterate = function* (value){
    if(value[Symbol.iterator])
        yield* value;
    (function(){
        return {
            next(){
                return {
                    value: void 0,
                    done: false
                };
            }
        };
    }).call(value);
};

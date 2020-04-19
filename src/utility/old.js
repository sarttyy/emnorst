
/* eslint-disable @typescript-eslint/camelcase */
import __reiyayakko_package__ from "../package";
/*
    #Reiyayakko.clocker
    >Rei.clocker
*/
__reiyayakko_package__.addModule({
    name: "clocker",
    variable: {
        clockerId: Symbol("clockerId"),
        clockUp: Symbol("clockUp"),
    }
}, ({clockUp, clockerId, modules})=>Object.seal({
    interval: 100,
    count: 0,
    [clockerId]: null,
    [clockUp](eventName){
        modules.event.execute(eventName, this.count++);
    },
    start(interval=100, eventName="ClockerCountUp"){
        this.stop();
        this.interval = interval;
        this[clockerId] = setInterval(this[clockUp].bind(this), this.interval, eventName);
    },
    stop(){
        if(typeof this[clockerId] !== "number")return;
        clearInterval(this[clockerId]);
        this[clockerId] = null;
    }
}));
__reiyayakko_package__.addModule("Stack", ()=>class Stack {
    constructor(maxStackSize=10000){
        this.maxStackSize = maxStackSize;
        this.stack = [];
    }
    push(func, args){
        if(this.stack.length < this.maxStackSize)
            this.stack.push([func, args]);
    }
    execute(){
        while(this.stack.length){
            const [func, args] = this.stack.pop();
            func.apply(this, args);
        }
    }
});
__reiyayakko_package__.addModule("workthread", ({modules})=>(aURL, options)=>{
    if(self.Worker){
        const worker = new Worker(aURL, options);
        const symbol = Symbol("worker");
        worker.onerror = event=>{
            modules.event.execute("workerError", event, worker);
        };
        worker.onmessage = event=>{
            const massage = JSON.parse(event.data);
            modules.event.execute("workerReceive", massage, worker);
        };
        const workerSend = modules.event.register("workerSend", action=>{
            const massage = JSON.stringify(action);
            worker.postMessage(massage);
        });
        const workerDelete = modules.event.register("workerDelete", ()=>{
            worker.terminate();
            modules.event.remove("workerSend", workerSend);
            modules.event.remove("workerDelete", workerDelete);
        });
        return worker;
    }
    console.error("WebWorker cannot be used.");
    return null;
});
__reiyayakko_package__.addModule("stackTrace", ()=>()=>{
    const stacks = new Error().stack.substr(13).trim();
    const __stacks__ = {
        stacks,
        prevStacks: stacks.replace(/.+?(?=\n)/,""),
        stacksArray: stacks.split(/\sat\s/).map(stack=>{
            stack = stack.trim().split(":");
            const column = stack.pop(), line = stack.pop();
            return {
                stack: stack.join(":"),
                line,
                column
            };
        }),
    };
    return __stacks__;
});
__reiyayakko_package__.addModule("case.test", ()=>(regExp, text)=>regExp.test(text)?text:NaN);
__reiyayakko_package__.addModule("element", ()=>selector=>{
    if(!selector)return null;
    const element = document.createElement(/^\w+/.exec(selector)||"div");
    const id = /(?<=#)\w+/.exec(selector);
    if(id)[element.id] = id;
    const className = selector.match(/(?<=\.)\w+/g);
    if(className)element.classList.add(...className);
    return element;
});

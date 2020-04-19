
export const has = (object, propName)=>(
    Object.hasOwnProperty.call(object, propName)
);
export const allKeys = object=>{
    const propNames = Object.getOwnPropertyNames(object);
    const symbols = Object.getOwnPropertySymbols(object);
    return [...propNames, ...symbols];
};
const watchMap = new WeakMap();
export const watch = (obj, propName, func)=>{
    const descriptors = watchMap.has(obj)
        ? watchMap.get(obj) : {};
    const descriptor = Object.getOwnPropertyDescriptor(obj, propName);
    if(!descriptor.hasOwnProperty("value"))
        return;
    descriptors[propName] = descriptor;
    watchMap.set(obj, descriptors);
    let value = obj[propName];
    Object.defineProperty(obj, propName, {
        get: ()=>value,
        set: newValue=>{
            func(value, value = newValue);
        },
        enumerable: true,
        configurable: true
    });
};
export const watchStop = (obj, propName)=>{
    const descriptor = watchMap.get(obj)[propName];
    Object.defineProperty(obj, propName, {
        ...descriptor,
        value: obj[propName]
    });
};
/*
reiyayakkoPackage.addModule({
    name: "object.structure",
    variable(variable){
        variable.apply = (base, apply, name, nameTo=name)=>{
            if(typeof apply[name] === "object")
                variable.modules.structure(base[nameTo], apply[name]);
            else
                base[nameTo] = apply[name];
        };
    }
}, ({modules, apply})=>(baseObj={}, applyObj={})=>{
    for(const propName of modules.object.allKeys(applyObj)){
        if(typeof propName === "string"){
            const propNames = propName.split(".");
            const deepestPropName = propNames.pop();
            let obj = baseObj;
            for(const name of propNames)
                obj = (obj[name] = {});
            apply(obj, applyObj, propName, deepestPropName);
        }else{
            apply(baseObj, applyObj, propName);
        }
    }
    return baseObj;
});
reiyayakkoPackage.addModule("object.Map", ({modules})=>class ObjectMap {
    constructor(map){
        this.map = [];
    }
    static _find(key){
        return ([entryKey])=>modules.equals(entryKey, key);
    }
    get size(){
        return this.map.length;
    }
    get(key){
        return this.map.find(modules.object.Map._find(key));
    }
    set(key, value){
        const index = this.map.findIndex(modules.object.Map._find(key));
        if(index === -1)
            this.map.push([key, value]);
        else
            this.map[index] = [key, value];
    }
    has(key){
        const index = this.map.findIndex(modules.object.Map._find(key));
        return index !== -1;
    }
    delete(key){
        const index = this.map.findIndex(modules.object.Map._find(key));
        if(index === -1)
            return false;
        this.map.splice(index, 1);
        return true;
    }
    clear(){
        this.map = [];
    }
    entries(){
        return this.map.map(entry=>entry);
    }
    forEach(){
        this.map.forEach(...arguments);
    }
    keys(){
        return this.map.map(([key])=>key);
    }
    values(){
        return this.map.map(([,value])=>value);
    }
    [Symbol.iterator](){
        const that = this;
        return (function* (){
            for(const entry of that.map)
                yield entry;
        })();
    }
});
reiyayakkoPackage.addModule({
    name: ["object.Map.prototype", Symbol.toStringTag],
    enumerable: false,
}, ()=>"ObjectMap");
//*/

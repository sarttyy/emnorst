
/*
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

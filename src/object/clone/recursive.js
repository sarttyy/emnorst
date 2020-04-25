
import {copy} from "./clone";

class CloneObject {
    constructor(cloneObject, props = {}){
        this.value = cloneObject;
        this.existingObjects = props.existingObjects || new WeakSet();
        this.isDone = false;
    }
    done(){
        this.isDone = true;
        return this.value;
    }
    get isExisting(){
        return this.existingObjects.has(this.value);
    }
    get type(){
        return typeOf(this.value);
    }
}

export const undertake = (object, props)=>{
    object = new CloneObject(object, props);
    if(object.isExisting)
        return object.done();
    console.groupCollapsed(`type: '${object.type}'`, object.value);
    object.existingObjects.push(object.value);
    const cloneObject = copy(object);
    cloneObject.existingObjects.push(cloneObject.value);
    console.log(cloneObject.existingObjects);
    console.groupEnd();
    return cloneObject.done();
};

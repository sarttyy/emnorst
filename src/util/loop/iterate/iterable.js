
import { iterator } from "./iterator.js";

/**
 * Iterable
 */
class iterable {
    constructor(iterateData, next) {
        this.iterateData = iterateData;
        if(next) this.iterateNext = next;
    }
    [Symbol.iterator]() {
        return iterator(this.iterateData, this.iterateNext);
    }
}

export { iterable as Iterable };

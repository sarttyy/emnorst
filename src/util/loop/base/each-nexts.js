
export const nexts = {
    object(context) {
        const { current, eachItems, keys } = context;
        current.count++;
        const key = keys[current.count];
        current.key = key;
        current.value = eachItems[key];
        if(keys.length <= current.count) context.done = true;
    },
    arraylike(context) {
        const { current, eachItems } = context;
        current.count += (context.reverse ? -1 : +1);
        current.value = eachItems[current.count];
        if(current.count < 0 || eachItems.length <= current.count)
            context.done = true;
    },
    iterable(context) {
        const { current, iterator } = context;
        current.count++;
        const iteratorResult = iterator.next();
        current.value = iteratorResult.value;
        if(iteratorResult.done) context.done = true;
    },
    [null](context) { context.done = true; }
};


/*!
 * reiyayakko-core
 * Copyright 2020 reiyayakko
 * License MIT
 */

import * as all from "./index.js";

const machilia = (target) => {
    const _ = new all.Chain(target).use(all);
    return _.context;
};

all.patch(machilia, all);

export * from "./index.js";
export default all;

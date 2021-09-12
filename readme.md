
# emnorst

[![CI](https://github.com/rizzzse/emnorst/workflows/CI/badge.svg)](https://github.com/rizzzse/emnorst/actions?query=workflow%3ACI)
[![codecov](https://codecov.io/gh/rizzzse/emnorst/branch/master/graph/badge.svg)](https://codecov.io/gh/rizzzse/emnorst)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![npm version](https://img.shields.io/npm/v/emnorst/latest.svg?logo=npm)](https://www.npmjs.com/package/emnorst)
[![TypeDoc](https://img.shields.io/badge/document-TypeDoc-green.svg)](https://typedoc.org)

## usage

### UMD(Browser)

```html
<script src="https://unpkg.com/emnorst@0.0.2"></script>
```

### CommonJS / ESModule(Browser/NodeJS/Deno)

Install is required to use emnorst with NodeJS.

```bash
npm i emnorst
```

```javascript
// CommonJS
const { isPrime } = require("emnorst");

// ES2015 Module
import { isPrime } from "emnorst";

// Deno
// @deno-types="https://unpkg.com/emnorst@0.0.2/dist/emnorst.esm.d.ts"
import { isPrime } from "https://unpkg.com/emnorst@0.0.2?module";

isPrime(2147483647);
// > true
```

## Licence

Copyright (c) 2020 rizzzse

[MIT Licence](https://opensource.org/licenses/MIT)

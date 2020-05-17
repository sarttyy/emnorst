
# usage

## Browser

```html
<script src="https://cdn.jsdelivr.net/gh/reiyayakko/reiyayakko-core@1.1.1/dist/reiyayakko.umd.min.js"></script>
```

### ES2015 Module

```html
<script type="module" src="https://cdn.jsdelivr.net/gh/reiyayakko/reiyayakko-core@1.1.1/dist/reiyayakko.esm.min.js"></script>
```

## NodeJS

```cmd
npm i reiyayakko-core
```

### CommonJS

```javascript
const rei = requie("reiyayakko-core");

rei.util.isNumber(1);
// > true

```

### ES2015 Module

```javascript
import rei from "reiyayakko-core";

rei.util.isNumber(1);
// > true
```

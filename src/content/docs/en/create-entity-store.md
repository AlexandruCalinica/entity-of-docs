---
title: 'createEntityStore'
description: 'API reference for createEntityStore'
---

### createEntityStore(options?: StoreOptions): void;
This function must be called as early as possible in the codebase and only once. It's purpose is to instantiate a global object which acts as a state store for all the entities declared.

```ts
// ...all imports

createEntityStore();

// ...all entities should be used after
```
Store can be accessed at anytime in the browser console by typing `window.__ENTITY_OF__`.

At the moment, `StoreOptions` contains only one property named `enableWarnings`. `createEntityStore` can be initialized with this option in order to start logging warnings in the console about unknown properties or mistyped values.

```ts
createEntityStore({ enableWarnings: true });
```
This flag can also be used to enable console warnings only in development mode while keeping the production clear.
```ts
const enableWarnings = process.env.MODE === 'development';
createEntityStore({ enableWarnings });
```
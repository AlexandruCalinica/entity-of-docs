---
title: "Install"
description: "How to install Entity.of"
---
### Prerequisites

Entity.of is framework agnostic, meaning that it should work with any typescript project that has support for **experimentalDecorators** enabled.

- Typescript codebase
- experimentalDecorator support enabled for the typescript compiler
---

### Add library to your project
via `npm`
```bash
npm install entity-of
```

via `yarn`
```bash
yarn add entity-of
```

### Setup tsconfig.json

Inside your `tsconfig.json` file, make sure that you have the following option enabled:

```json
{
  "compilerOptions": {
    "experimentalDecorators": true
  }
}
```
You're all set.

Check out **Examples** to see basic use-cases of Entity.of or **Tutorials** for advanced usage.
<div class="hot-link-group">
  <a href="/en/first-steps" class="hot-link">🤌 First Steps</a>
  <a href="/en/examples" class="hot-link">🤟 Examples</a>
  <a href="/en/tutorials" class="hot-link">👀 Tutorials</a>
</div>
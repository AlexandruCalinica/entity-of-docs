---
title: 'First steps'
description: 'How to get started with Entity.of'
---

### Create your first entity

```ts
import { Entity, Of, createEntityStore } from 'entity-of';

createEntityStore()

@Entity
class User {
  @Of(() => String)
  id = '';
  
  @Of(() => String)
  name = ''
  
  @Of(() => String)
  email = ''
  
  @Of(() => Number)
  age = 0
  
  @Of(() => Boolean)
  isMarried = false
  
  static of = Entity.of<User>();
}

User.of({});
// => { id: '', name: '', email: '', age: 0, isMarried: false }
```

Follow up with the next section to see more advanced examples.
<div class="hot-link-group">
  <a href="/en/examples" class="hot-link">🤟 Examples</a>
</div>
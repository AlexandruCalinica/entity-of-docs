---
title: '@Entity'
description: 'API reference for @Entity decorator'
---

In order to declare and register a new entity model, `@Entity` is used to decorate the class with a static producer method called `.of()` that will be used to construct entity objects.

```ts
@Entity
class User {
  /** class properties */
  
  static of = Entity.of<User>();
}
```
Although the `@Entity` decorator itself does the whole work of adding the static producer method on the class, it cannot change the initial class type signature, so in order to have correct typing on this method we must declare it manualy like so:
```ts
static of = Entity.of<User>();
```
`Entity.of` does not add any actual functionality to the class, it's just an empty placeholder function that does the correct typing, so it will have no effect if the class itself is not decorated in the first place.

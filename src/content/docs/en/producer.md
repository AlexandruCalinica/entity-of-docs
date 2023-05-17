---
title: '@Producer'
description: 'API reference for @Producer decorator'
---

### @Producer
The scope of this decorator is to allow the consumers of this library to create their own custom static `.of()` method(we'll call this the `producer method`). There might be usecases where you need little bit more than what standard `Entity.of` method is offering, so here's a basic example where we implement an entity with a custom producer method:
```ts
class User {
  @Of(() => String)
  id = '';
  
  @Of(() => String)
  name = ''
  
  @Of(() => String)
  email = ''
  
  @Producer
  static of(data: Partial<User>): User {
    logEntity('User', data);
    
    return {
      id: data.id ?? '',
      name: data.name ?? '',
      email: data.email ?? ''
    }
  }
}
```
Warning: This approach bypasses entirely the tracking features Entity.of provides via the standard usage. In order to make the tracking work with a custom producer method, check the below `mapObjectToEntity` example.

## mapObjectToEntity(data: Partial of T, Entity: Ctr of T): T
This function is what the static producer method `.of()` uses internally.
```ts
static of = Entity.of<User>()
  
// is the same as

@Producer
static of(data: Partial<User>): User {
  // some custom logic here...
  return mapObjectToEntity(data, User); // keep the same return behaviour
}
```
This function is exported from the library also to be used with custom usecases and also provide all the tracking features.

# Trouble Shooting
The only known issue at the moment is about self referencing or cyclic entities that are causing stack overflows due to recurring `.of()` calls.

## Caveats
### Self referencing entities
- The self referencing property must be optional (and nullable if it’s the case) in order to not cause infinite recursion.
- The property initialiser should either be undefined or null but never it’s own static of method.
  
OK:
```js
@Entity
class A {
  @Of(() => A, { optional: true })
  a?: A;

  static of = Entity.of<A>();
}

// or with null initializer

@Entity
class A {
  @Of(() => A, { optional: true, nullable: true })
  a?: A | null = null

  static of = Entity.of<A>();
}
```
NOT OK:
```js
@Entity
class A {
  @Of(() => A)
  a: A = A.of({}) // initializer gets called and it's recursive

  static of = Entity.of<A>();
}
```
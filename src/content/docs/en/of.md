---
title: '@Of'
description: 'API reference for the @Of decorator'
---

### @Of(type?: () => any, options?: FieldOptions)
`@Of` is used to decorate entity class properties. It's purpose is to register a class property as an **entity field** and along with it to describe the returned **type**.
```ts
@Entity
class User {
  @Of(() => String)
  name = ''
  
  static of = Entity<User>();
}
```

First passed argument must be a function that returns the desired type in the form of:
```ts
// primitive constructors
() => String
() => Number
() => Boolean
() => [String] // describes an array of strings
() => [Number] // describes an array of numbers
() => [Boolean] // describes an array of booleans

// entity classes/constructors
() => User
() => [User] // describes an array of users

// advanced custom types

// below line describes an object with properties of type: string|number|boolean|User
() => ({ String, Number, Boolean, User }) 
// below line describes an object with properties of type: User|Profile|Address
() => ({ User, Profile, Address })
// below line describes an array of objects containing properties of type: User
() => [{ User }] // *this type only supports one entity for the moment

// NOT OK
() => null
() => undefined
() => ''
() => 0
() => false
() => {}
() => Object
() => []
() => [{ User, String, Boolean }]

// Not yet implemented but considered
() => [String, Number, Boolean, User] // describes an array containing any of the enumerated types
() => [{ String, Boolean, Number, User }] // describes an array of objects containing any of the enumerated types
```

The `@Of` decorator can also describe if the field is **nullable** or **optional**.
```ts
@Entity
class User {
  @Of(() => String, { nullable: true, optional: true })
  name?: string | null
  
  static of = Entity<User>();
}
```
Tip: If a field must receive as value an array containing some values but also `null`, then the `nullable: true` flag must be passed as option in the decorator:
```ts
@Entity
class User {
  @Of(() => String, { nullable: true })
  name?: (string | null)[] = []
  
  static of = Entity<User>();
}

User.of({ name: [null, 1, 2] }) // typing is ok now.
```

### Advanced Custom Field Types
Although Entity.of is intended to model entities that represent domain models (for ex: database schemas), there might be cases where a field must describe a much more advanced, dynamic or generic data structure. Think of objects where we do not know in advance the name and types of the properties.

Luckily, the `@Of` decorator supports those kinds of usecases.
```ts
@Entity
class DynamicEntity {
  @Of(() => ({ String, Boolean, Number }), { isCustom: true })
  dynamicField: Record<string, string | boolean | number> = {}

  static of = Entity.of<DynamicEntity>();
}

DynamicEntity.of({
  dynamicField: {
    foo: 'hello',
    baz: 123,
    bar: true
  }
})
```
This approach also supports other Entities in combination with Primitive constructors:
```ts
@Entity
class DynamicEntity {
  @Of(() => ({ String, Boolean, Number, User }), { 
    isCustom: true, 
    producerFields: {
      user: 'User'
    } 
  })
  dynamicField: Record<string, string | boolean | number | User> = {}

  static of = Entity.of<DynamicEntity>();
}

DynamicEntity.of({
  dynamicField: {
    foo: 'hello',
    baz: 123,
    bar: true,
    user: {
      ...
    }
  }
})
```
A dynamic field can also support objects with unknown properties all of a specific type
```ts
@Entity
class DynamicEntity {
  @Of(() => ({ User }))
  dynamicField: Record<string, User> = {}

  static of = Entity.of<DynamicEntity>();
}

DynamicEntity.of({
  dynamicField: {
    foo: { /* User props */ }
    bar: { /* User props */ }
    baz: { /* User props */ }
  }
})
```
And finally, a dynamic field can represent an array of objects with unknown keys but all values of a specific type:
```ts
@Entity
class DynamicEntity {
  @Of(() => [{ User }])
  dynamicField: Record<string, User>[] = []

  static of = Entity.of<DynamicEntity>();
}

DynamicEntity.of({
  dynamicField: [
    {
      foo: { /* User props */ }
      bar: { /* User props */ }
      baz: { /* User props */ }
    },
    {
      bac: { /* User props */ }
      fiz: { /* User props */ }
      bad: { /* User props */ }
    },
  ]
})
```
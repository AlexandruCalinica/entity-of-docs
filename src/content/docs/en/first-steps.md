---
title: 'First steps'
description: 'How to get started with Entity.of'
---

### Create your first entity

```ts
import { Entity, Of } from 'entity-of';

@Entity()
class User {
  @Of((t) => t(String))
  id: string = '';

  @Of((t) => t(String))
  name: string = '';

  @Of((t) => t(Number))
  age: number = 0;

  @Of((t) => t(Boolean))
  isPublic: boolean = false;

  static of = Entity.of<User>();
}
```
In **Entity.of** you define custom data types by using ES6 classes. Think of it as a class that describes the shape of your raw data.
Since typescript allows you to use classes as types, there is no need to define separate interfaces/types for your data.

So, using the above example, we can type a variable as `User` and it will be type checked by the compiler.

```ts
const user: User = {...};
```

So far so good, nothing new here. The next natural thing we want to do is to create a new instance of our **User** entity. This is where **Entity.of** comes in handy.
```ts
const user = User.of({});

// => User { id: '', name: '', age: 0, isPublic: false }
```
This outputs a new instance of our **User** entity with all the default values we defined in the class.
We'll see later on why this is helpfull and how we can use it to our advantage.

How did our entity managed to output those default values without writing this code ourselves? Well, that's because we used the **@Entity** and **@Of** decorators alongside with the **static of** method.
Let's dive into the core decorators which comprises the **Entity.of** library.

#### @Entity
It's used for defining the class as an entity. It will implicitly add underneath the hood the **static of** method and also decorates the class with necessary logic in such a way that static method **of** takes any object and returns a correctly typed instance of the entity.

What we achieve with this decorator could be impreatively written by us in the following way(simplified for the sake of the example):
```ts
class User {
  id: string = '';
  name: string = '';
  age: number = 0;
  isPublic: boolean = false;

  constructor(data: Partial<User>) {
    Object.assign(this, data);
  }

  static of(data: Partial<User>) {
    return new User(data);
  }
}
```

Sure we could do this, but we would have to write this code for every entity we create.
> In order to grasp a deeper understanding of what's going on under the hood, you can check out this [video](/en/examples).

#### static of
This method is implicitly added by the above decorator. We still have to declare it additionally on the class in order to reflect the correct type in usage.

```ts
@Entity()
class User {
  /** ... */

  static of = Entity.of<User>();
}
```
Other then that, it's just a placeholder for the actual implementation which is added by the **@Entity** decorator.

#### @Of
This decorator is used for annotating class properties with the types you expect to encounter in your raw data.

```ts
@Of((t) => t(String))
id: string = '';
```
It receives a callback function which takes an argument **t** (also called the **typer**) and you use it to create Entity.Of types.
> To learn more about the **typer** and how to use it, check out this [video](/en/examples) and also check out the [API section]() that describes it.

This tells **Entity.Of** that the **id** property is of type **String**. Now your **User** entity knows about this property and will be able to assign it the correct type when you pass it to the **of** method as raw data.
It also makes sure to log a warning if you pass it a value of a different type and naturally fallback on the default value you defined in the class.

```ts
const user = User.of({ id: 1 });

user.id; // => ''

// Logs to the console a warning message
// 1 x Type Mismatch :: Entity "User" :: Property "id" :: Expected "String" :: Received "Number"
```

#### Extra features
**Entity.of** comes with some extra features that you can use to your advantage yet they're not obviously visible at first glance.

#### Warnings & Logs
Entities declared with this library have a built-in logger that logs warnings and other useful information to the console. This is useful for debugging purposes and also to make sure that your data is being handled correctly.
It's also meant to be used with third party alert libraries such as [Sentry](https://sentry.io/welcome/) or [Bugsnag](https://www.bugsnag.com/).

If at any time your User entity is instantiated with unexpected types, you get the following type of warning message in the console:

```bash
1 x Type Mismatch! :: Entity "User" :: Property "id" :: Expected "String" :: Received "Number"
```

If undeclared properties are passed to the entity, you get the following type of warning message in the console:

```bash
1 x Unknown Property! :: Entity "User" :: Property foo: String
```

### Nesting entities
You can nest entities inside other entities. This is useful when you have a complex data structure and you want to make sure that the data you receive is of the correct type all the way down the structure.

Let's say we have an **Address** entity that we want to nest inside our **User** entity.

```ts
@Entity()
class Address {
  @Of((t) => t(String))
  street: string = '';

  @Of((t) => t(String))
  city: string = '';

  @Of((t) => t(String))
  country: string = '';

  static of = Entity.of<Address>();
}
```

**User** entity now has a property we named **address**(name does not matter) of type **Address**.
```ts
@Entity()
class User {
  @Of((t) => t(String))
  id: string = '';

  @Of((t) => t(String))
  name: string = '';

  @Of((t) => t(Number))
  age: number = 0;

  @Of((t) => t(Boolean))
  isPublic: boolean = false;

  @Of((t) => t(Address)) // <--- Here we nest the Address entity
  address: Address = Address.of({});

  static of = Entity.of<User>();
}
```

Now, when we pass raw data to the **User.of** method, it will make sure that the **address** property is of type **Address** and that it's properties are of the correct type as well.

```ts
const userWithAddress = User.of({
  id: '1',
  name: 'John',
  age: 30,
  isPublic: true,
  address: {
    street: 'Main Street',
    city: 'New York',
    country: 'USA',
  },
});
```
**userWithAddress** will have the following value:

```ts
User { 
  id: '1', 
  name: 'John', 
  age: 30, 
  isPublic: true, 
  address: Address { 
    street: 'Main Street', 
    city: 'New York', 
    country: 'USA' 
  }
}
```
if raw data does not contain any values for the **address** property, it will fallback on the defaults we defined in the **Address** entity.

```ts
User { 
  id: '1', 
  name: 'John', 
  age: 30, 
  isPublic: true, 
  address: Address { 
    street: '', 
    city: '', 
    country: '' 
  }
}
```
If raw data for **address** contains values of the wrong type, it will also fallback on the defaults we defined in the **Address** entity and log a warning message to the console. Let's say **address.street** is passed as a number instead of a string.

```bash
1 x Type Mismatch :: Entity "Address" :: Property "street" :: Expected "String" :: Received "Number"
```

### Arrays
Another common usecase in nested data structures is to have properties that are arrays of entities. This is also supported by **Entity.of**.

Let's modify the **address** entity to be an array of **Address** entities instead of a singular entity.

```ts
@Entity()
class User {
  @Of((t) => t(String))
  id: string = '';

  @Of((t) => t(String))
  name: string = '';

  @Of((t) => t(Number))
  age: number = 0;

  @Of((t) => t(Boolean))
  isPublic: boolean = false;

  @Of((t) => t.array(Address)) // <--- Here we nest the array of Address entities
  addresses: Address[] = []

  static of = Entity.of<User>();
}
```

Creating a new instance of **User** with an array of **Address**es will look like this:

```ts
const userWithAddress = User.of({
  id: '1',
  name: 'John',
  age: 30,
  isPublic: true,
  addresses: [
    {
      street: 'Main Street',
      city: 'New York',
      country: 'USA',
    },
    {
      street: 'Second Street',
      city: 'New York',
      country: 'USA',
    }
  ],
});
```


Now our output will look like this:
  
```ts
User { 
  id: '1', 
  name: 'John', 
  age: 30, 
  isPublic: true, 
  addresses: [
    Address { 
      street: 'Main Street', 
      city: 'New York', 
      country: 'USA' 
    },
    Address { 
      street: 'Second Street', 
      city: 'New York', 
      country: 'USA' 
    }
  ]
}
```

### Records
Another encountered usecase is to have properties that are records of entities. Let's see how we can modify **User** entity to support this.

```ts
@Entity()
class User {
  @Of((t) => t(String))
  id: string = '';

  @Of((t) => t(String))
  name: string = '';

  @Of((t) => t(Number))
  age: number = 0;

  @Of((t) => t(Boolean))
  isPublic: boolean = false;

  @Of((t) => t.record(String, Address)) // <--- Here we nest the record of Address entities
  addresses: Record<string, Address> = {}

  static of = Entity.of<User>();
}
```

Creating a new instance of **User** with a record of **Address**es will look like this:

```ts
const userWithAddress = User.of({
  id: '1',
  name: 'John',
  age: 30,
  isPublic: true,
  addresses: {
    foo: {
      street: 'Main Street',
      city: 'New York',
      country: 'USA',
    },
    baz: {
      street: 'Second Street',
      city: 'New York',
      country: 'USA',
    }
  },
});
```

Now the output will look like this:

```ts
User { 
  id: '1', 
  name: 'John', 
  age: 30, 
  isPublic: true, 
  addresses: {
    foo: Address { 
      street: 'Main Street', 
      city: 'New York', 
      country: 'USA' 
    },
    baz: Address { 
      street: 'Second Street', 
      city: 'New York', 
      country: 'USA' 
    }
  }
}
```

### Unions
There might be cases where we want to have a property that can be of multiple types. For example, we might want to have a property that can be either a string or a number. We can achieve this in the following manner:

```ts
@Entity()
class Account {
  @Of((t) => t.union(String, Number))
  ballance: string | number = 0;

  static of = Entity.of<Account>();
}
```
The new entity called **Account** has a property called **ballance** that can be either a string or a number. We can create a new instance of **Account** like this:

```ts
const account = Account.of({
  ballance: '100',
});

// or

const account = Account.of({
  ballance: 100,
});
```
Both of these will work and the output will be the same:

```ts
Account { 
  ballance: '100'
}

// or

Account { 
  ballance: 100
}
```

#### Unions of entities
We can also have unions of entities. Let's modify the **User** entity to have a property that can be either an **Account** or an **Address**.

```ts
@Entity()
class User {
  @Of((t) => t(String))
  id: string = '';

  @Of((t) => t(String))
  name: string = '';

  @Of((t) => t(Number))
  age: number = 0;

  @Of((t) => t(Boolean))
  isPublic: boolean = false;

  @Of((t) => t.union(Address, Account)) // <--- union of Address | Account
  addressOrAccount: Address | Account = {}

  static of = Entity.of<User>();
}
```
Creating a new instance of **User** with a union of **Address** or **Account** will look like this:

```ts
const userWithAddress = User.of({
  // ...other properties
  addressOrAccount: {
    street: 'Main Street',
    city: 'New York',
    country: 'USA',
  },
});

// or

const userWithAccount = User.of({
  // ...other properties
  addressOrAccount: {
    ballance: 100,
  },
});
```

Now the output will look like either one of this two:

```ts
User { 
  // ...other properties
  addressOrAccount: Address { 
    street: 'Main Street', 
    city: 'New York', 
    country: 'USA' 
  }
}

// or

User { 
  // ...other properties
  addressOrAccount: Account { 
    ballance: 100
  }
}
```

### Optional & Nullable properties
There are times when we want a property to be present or not in the object. Also, we might want to declare the absence of the value of some property by making it null. The **t** (typer) object has two methods that can help us with this: **optional()** and **nullable()**. Let's see how we can use them.

```ts
@Of((t) => t(String).optional())
optionalProp?: string;
```

The **optional()** method will make the property optional. This means that we can create an instance of the entity without providing the value of the property.

```ts
@Of(() => t(String).nullable())
nullableProp: string | null = null;
```

The **nullable()** method will make the property nullable. This means that we can create an instance of the entity with the value of the property being null.

There is also the posibility to have a property that is both optional and nullable. We can achieve this by chaining the **optional()** and **nullable()** methods.

```ts
@Of(() => t(String).optional().nullable())
optionalNullableProp?: string | null = null
```

Follow up with the next section to see more advanced examples.
<div class="hot-link-group">
  <a href="/en/examples" class="hot-link">🤟 Examples</a>
</div>
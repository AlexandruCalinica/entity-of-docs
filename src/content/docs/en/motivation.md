---
title: 'Motivation'
description: 'Entity.of motivation'
---
**Entity.of** was born as a byproduct of first degree encounters with:
- broken APIs
- out-of-date REST api documentations
- unsynchronized graphql schemas + resolvers
- third party services releasing breaking changes
- and many more text-book or edge case situations causing bugs, unexplained behaviours, runtime errors and generally a bad user experience for end users of frontend web apps.

All backend services ideally implement some form of validation and sanitization for any incomming data.
Why should'nt we consider a similar approach for client applications?

<img width="auto" height="auto" alt="diagram" src="https://github.com/AlexandruCalinica/Entity.of/blob/main/assets/entityOf-diagram.png?raw=true" />

## Simplified problem statement
The core idea behind this library is to create a layer inside your application code that handles data modeling, validation and construction.

Let's imagine the following usecase:
  1) Retrieve some data about a User from a web service.
  2) Parse, format and display the data on a webpage.
  3) Mutate the data and send it back to the web service.
  
Somewhere along this flow we'll need to know how the User data looks like. What's the shape of it, what properties does it have, etc. More precisely at step 2 and 3.

For step 2 we need to know the type of data structure we expect to get so we can parse it accordingly and we also need to know the names of properties this data structure holds so that we know what to display on the webpage.

For step 3 we need to know the exact same things as for the previous step otherwise we would'nt know what to modify or what to send back to the server.

Nothing too fancy. The basic approach would look like:
```ts
// STEP 1
fetch('/api/user')
  .then((res) => res.json())
  .then((userData) => {
    // STEP 2
    const { name, age, location } = userData;
    renderUser(name, age, location);
  })
  .catch((err) => console.error(err));
  
function renderUser(name: string, age: number, location: string) {
  /** do some DOM manipulation with the above parameters. */
}
```

Pretty clear so far. We've managed to make it work without the need of declaring somewhere how the `User` data looks like. Now let's look at the 3rd step:
```ts
// STEP 3
function updateUser(updatedName: string, updatedAge: number, updatedLocation: string) {
   const payload = {
      name: updatedName,
      age: updatedAge,
      location: updatedLocation
   };
   
   return fetch('/api/user', {
      method: 'PUT',
      body: JSON.stringify(payload)
   })
}
```

Looks ok-ish, we're still doing hardcore vanilla javascript(in typescript), but what if instead of just 3 properties, our User has 20+ properties? Having our `updateUser` function receive 20+ arguments is not somthing anybody will accept as a solution in a code review session, so ideally we would pass a single argument in the form of an object containing all these properties.

And here's the catch: **How do we type this argument considering the fact that we're in a typescript codebase and our linter rules out the use of explicit `any`?**

Yep, you got it, we create a type or an interface for it. (Thanks Captain Obvious)
```ts
type User = {
  name: string;
  age: number;
  location: string;
  /** + many more props... */
}

function updateUser(updatedUser: User) {   
   return fetch('/api/user', {
      method: 'PUT',
      body: JSON.stringify(updatedUser)
   })
}

updateUser({
  name: 'John Doe',
  age: 29,
  location: 'Romania'
})
```

All good now, but the above code begs the following question:
**If I want to create multiple User looking objects, how can I do that?**

A type or an interface only gives us one option:

```ts
const user: User = { name: 'Foo', age: 42, location: 'UK' };
/** Or */
const user = { name: 'Bar', age: 22, location: 'FR' } as User;
```

Somebody might suggest us: *Hey guys, just write a function that takes some object as argument and returns a new object that respects the `User` type declared above*.
```ts
function makeUser(data: Partial<User>): User {
  return {
    name: data.name ?? '',
    age: data.age ?? 0,
    location: data.location ?? ''
  }
}

makeUser({ name: 'Alex' });
// => { name: 'Alex', age: 0, location: '' }
```
Pretty cool, we can even use it in our initial fetch that retrieves the User data from the server.
```ts
// STEP 1
fetch('/api/user')
  .then((res) => res.json())
  .then((userData) => {
    // STEP 2
    const { name, age, location } = makeUser(userData);
    renderUser(name, age, location);
  })
  .catch((err) => console.error(err)); 
```
Now we can be sure that if for some reason the server does not respond with the same object structure that we expect, `makeUser()` will try to access the expected properties and if it does'nt find any, it will return some defaults not matter what.

We're going to stop here with the analogy, since we've just proven what a data modeling layer looks like, where it comes from and how it benefits us. If you think about constructor functions and ES6 classes, you're on the right mindset path, as these are javascripts core features intended for standardizing object modeling and creation.

## Solution
The purpose of this library is to help developers create and maintain this data modeling layer in a minimal, easy-to-use and easy-to-decouple fashion.
**Entity.of** uses **decorator pattern** and **type guard pattern**. The first one (decorator) is used to apply the second (type guard). There is also a third obvious ingredient of this recipe which without this library makes no sense - **ES6 Classes**.

```ts
@Entity
class User {
  @Of(() => Number)
  id: number = 0;
  
  @Of(() => String)
  name: string = '';
  
  @Of(() => Boolean)
  isSmart: boolean = true;
  
  static of = Entity.of<User>();
}
```
This `User` class (we call it entity) is a 3-in-1 solution:
  1) Can be used to type arguments, variables or object literals.
  2) Can be used to construct objects that implement the `User` class via the static method `.of()`.
  3) Can track/validate/warn if the `User` entity was initialized with unknown properties or values of unexpected types ***at runtime***

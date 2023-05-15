---
title: 'Concept & philosophy'
description: 'Entity.of concept & philosophy'
---

There are some concepts that are important to understand when working with Entity.of. The ideas underlying this library are not necessarly new in the world of software development, but they are often overlooked, forgotten or simply just not used in the javscript/typescript eco-system. Most ideas are taken from the [Domain Driven Design](https://en.wikipedia.org/wiki/Domain-driven_design) (DDD) and adapted to a much simpler and more practical approach that suitable not only for backend services but also for frontend applications.

### Entities
The core concept of Entity.of is obviously the **Entity**. An entity is a unique object that has a unique identity, attributes, and behaviors. Entities are designed to be long-lived and persistent, and are often stored in a database. By using entities to model the domain, developers can create more accurate and effective software systems that reflect the needs and requirements of the business. 

Depending on where you use Entity.of, an entity can represent the data model of a database table, a REST resource, a GraphQL type, or a JSON object. Nonetheless, the concept of an entity is the same in all cases. It's purpose is to model the domain and to provide a consistent interface to access and manipulate the data used by your application.

An Entity is defined by a **schema**. A schema is a simple ES6 class that defines the attributes of an entity. The schema is used to **validate** the data that is passed to the entity constructor. It also defines the attributes that are available on the entity instance. The schema is also used to generate the **typescript types** for the entity.

From here, we can extract the following 3 core concepts:
1. the **Entity** is a custom user defined type declared as an ES6 class.
2. the **Entity** can construct objects from raw data that conform to the schema.
3. the **Entity** can be used to typeguard the content of raw input data against the schema.

### Data layers

The data layer is the layer that is responsible for storing and retrieving data from a persistent storage. The data layer is usually implemented as a database, but it can also be a REST API, a GraphQL API, or a simple JSON file. The data layer is usually accessed by a **repository**. A repository is a class that provides an interface to access the data layer. The repository is responsible for fetching and storing data from the data layer. It is also responsible for converting the data from the data layer into an entity and vice versa.

Where Entity.of comes into play with data layers is that it provides a way to **validate** and **convert** the raw I/O data to and from the data layer. This is done by using entities. Entities can be used to validate the data that is passed to the repository. They can also be used to convert the data that is returned from the repository into an entity. This way, the repository can be used to access the data layer without having to worry about the data format. The repository can simply pass the raw data to the entity and the entity will take care of the rest.

### Standardization

The main goal of Entity.of is to provide a standard way of working with data in javascript/typescript. Working with literal objects spread across the codebase becomes very hard to maintain and to reason about at a bigger scale. It's very easy to make mistakes and to introduce bugs. Debugging is also very hard when you don't know how the data actually looks like and you constantly have to console.log the data to see what's going on. Type definitions are also decoupled from the actual data and can easily become outdated or unsynced.

Entity.of forces you to define the data model of your application in a single place. This way, you can easily see how the data is structured and how it is used. You can also easily see how the data is transformed from one format to another. This makes it much easier to reason about the data and to debug the application. It also makes it much easier to maintain the application and to introduce new sources of data for consumption.

As a side effect of standardizing the data model, it also becomes much easier to write tests. You can easily mock the data layer and test the repository without having to worry about the data format.

### Validation

One thing is hard to achieve in javascript: **type safety**. The language is very dynamic and it's very easy to make mistakes. The only way to achieve type safety is to use a type system like typescript. Typescript is a great tool, but it's not perfect. It's very easy to make mistakes and to introduce bugs. The main problem is that typescript is not aware of the actual data. It only knows the type definitions. This means that it's very easy to introduce bugs when you pass the wrong data to a function. The function will not complain because the data matches the type definition, but it will fail at runtime because the data is not what it's supposed to be.

Entity.of solves this problem by using entities to validate the data. The entity is aware of the actual data and it can validate the data against the schema. This way, the entity can make sure that the data is valid and that it matches the schema. If the data is invalid, the entity will log errors and fallback on defaults and all of this during the runtime.

### School of thought

In the long run, Entity.of is not a library. It's a way of thinking about:
1. data and how to work with it in a consistent and predictable way. 
2. how to structure data in your application. 
3. how to write code that is easy to understand and to debug. 
4. how to write code that is easy to maintain and to refactor. 
5. how to write code that is easy to extend and to scale.

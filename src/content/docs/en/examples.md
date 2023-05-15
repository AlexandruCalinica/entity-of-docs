---
title: "Examples"
description: "Examples of how to use Entity.of"
---
**Entity.of** typer function `(t) => type` allows you to type properties in a very simple, familiar and composable way.
That means you can achieve deeply nested and complex types via the function composition pattern:

`t.array(t.record(String, t.union(String, Number, Boolean)))`


`t.record(String, t.record(String, t.record(String, t.record(String, String))))`

Bellow you can find examples of how to use the `@Of` decorator with some of the commonly encountered usecases.

---

### Primitives

#### String
```ts
@Of((t) => t(String))
prop: string = '';
```

#### Number
```ts
@Of((t) => t(Number))
prop: number = 0;
```

#### Boolean
```ts
@Of((t) => t(Boolean))
prop: boolean = false;
```

### Entities
```ts
@Of((t) => t(SomeEntity))
prop: SomeEntity = SomeEntity.of({});
```

### Records

#### Records of primitives
```ts
@Of((t) => t.record(String, String))
prop: Record<string, string> = {};

@Of((t) => t.record(String, Number))
prop: Record<string, number> = {};

@Of((t) => t.record(String, Boolean))
prop: Record<string, boolean> = {};
```

#### Records of entities
```ts
@Of((t) => t.record(String, SomeEntity))
prop: Record<string, SomeEntity> = {};
```

#### Records of records
```ts
@Of((t) => t.record(String, t.record(String, String)))
prop: Record<string, Record<string, string>> = {};

@Of((t) => t.record(String, t.record(String, Number)))
prop: Record<string, Record<string, number>> = {};

@Of((t) => t.record(String, t.record(String, Boolean)))
prop: Record<string, Record<string, boolean>> = {};
```

#### Records of arrays
```ts
@Of((t) => t.record(String, t.array(String)))
prop: Record<string, string[]> = {};

@Of((t) => t.record(String, t.array(Number)))
prop: Record<string, number[]> = {};

@Of((t) => t.record(String, t.array(Boolean)))
prop: Record<string, boolean[]> = {};
```

#### Records of unions
```ts
@Of((t) => t.record(String, t.union(String, Number, Boolean)))
prop: Record<string, string | number | boolean> = {};
```

### Arrays
```ts
@Of((t) => t.array(String))
prop: string[] = [];

@Of((t) => t.array(Number))
prop: number[] = [];

@Of((t) => t.array(Boolean))
prop: boolean[] = [];
```

#### Arrays of entities
```ts
@Of((t) => t.array(SomeEntity))
prop: SomeEntity[] = [];
```

#### Arrays of records
```ts
@Of((t) => t.array(t.record(String, String)))
prop: Record<string, string>[] = [];

@Of((t) => t.array(t.record(String, Number)))
prop: Record<string, number>[] = [];

@Of((t) => t.array(t.record(String, Boolean)))
prop: Record<string, boolean>[] = [];
```

#### Arrays of arrays
```ts
@Of((t) => t.array(t.array(String)))
prop: string[][] = [];

@Of((t) => t.array(t.array(Number)))
prop: number[][] = [];

@Of((t) => t.array(t.array(Boolean)))
prop: boolean[][] = [];
```

#### Arrays of unions
```ts
@Of((t) => t.array(t.union(String, Number, Boolean)))
prop: (string | number | boolean)[] = [];
```

### Unions
```ts
@Of((t) => t.union(String, Number, Boolean))
prop: string | number | boolean = '';
```

#### Unions of entities
```ts
@Of((t) => t.union(SomeEntity, SomeOtherEntity))
prop: SomeEntity | SomeOtherEntity = SomeEntity.of({});

@Of((t) => t.union(SomeEntity, t.record(String, String)))
prop: SomeEntity | Record<string, string> = {};
```

#### Unions of records
```ts
@Of((t) => t.union(t.record(String, String), t.record(String, Number), t.record(String, Boolean)))
prop: Record<string, string> | Record<string, number> | Record<string, boolean> = {};
```

#### Unions of arrays
```ts
@Of((t) => t.union(t.array(String), t.array(Number), t.array(Boolean)))
prop: string[] | number[] | boolean[] = [];
```

### Optional & Nullable
In order to make a property optional or nullable, you can use the `optional()` and `nullable()` methods chainable on every type returned by the **typer** function.

```ts
// Primitives
@Of((t) => t(String).optional())
prop?: string;

@Of((t) => t(Number).nullable())
prop: number | null = null;

@Of((t) => t(Boolean).optional().nullable())
prop?: number | null;

// Entities
@Of((t) => t(SomeEntity).optional())
prop?: SomeEntity;

@Of((t) => t(SomeEntity).nullable())
prop: SomeEntity | null = null;

@Of((t) => t(SomeEntity).optional().nullable())
prop?: SomeEntity | null;

// Records
@Of((t) => t.record(String, String).optional())
prop?: Record<string, string>;

@Of((t) => t.record(String, Number).nullable())
prop: Record<string, number> | null = null;

@Of((t) => t.record(String, Boolean).optional().nullable())
prop?: Record<string, boolean> | null;

// Arrays
@Of((t) => t.array(String).optional())
prop?: string[];

@Of((t) => t.array(Number).nullable())
prop: number[] | null = null;

@Of((t) => t.array(Boolean).optional().nullable())
prop?: boolean[] | null;

// Unions
@Of((t) => t.union(String, Number, Boolean).optional())
prop?: string | number | boolean;

@Of((t) => t.union(String, Number, Boolean).nullable())
prop: string | number | boolean | null = null;

@Of((t) => t.union(String, Number, Boolean).optional().nullable())
prop?: string | number | boolean | null;
```

### Custom
For advanced usecases that are not possible to achieve with the built in types, you can use the `custom()` method. This method takes a function that receives the value and returns the transformed value. Think of it as a `map()` function for the raw value that's going to be passed for the property.


```ts
@Of((t) => t.custom((value) => {
  if (Object.hasOwn(value, 'foo')) {
    return SomeEntity.of(value);
  }
  return SomeOtherEntity.of(value);
}))
prop: SomeEntity | SomeOtherEntity = SomeEntity.of({});
```

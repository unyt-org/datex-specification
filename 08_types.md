# Data Types and Values

DATEX has a variety of standard data types, including
primitives, JSON data types, Records, Maps and Sets.
Functionally, there is no difference between primitive and non-primitive types - both can be accessed by reference or value and can be used as a base
for custom types. 

DATEX Script example:
```datex
val a = 10; // inferred type for x is 'integer'
val b: integer/8 = 255; // explicitly specifying type as signed 8-bit integer
val c: text/markdown = "# Markdown content";
val d = (1,2,3); // inferred type is (integer, integer, integer)
val d:Array<integer/8> = [1,2,3]; // Explicitly create an array containing only signed 8-bit integers
val s1 = Set (1,2,3); // creating a new value of type Set<integer> (inferred)
val s3 = Set<any>(1,2,3); // creating a Set with an explicit type
val s2: Set<integer> = xy() // type checking (TODO when infer?)

```

<!--Type definitions are created with the special `Type` data type. -->
The standard data types are available on every endpoint instance.
Custom type definitions can be loaded as pointers from other endpoints.

## Nominal and Structural Types
The DATEX type system is fundamentally a nominal type system.
Values are always associated with a nominal type.

Structural type matching is used for primitive values, JSON values and Records.

### Type Aliases


## Interfaces

Interfaces are special types that cannot be instantiated.
They can contain overridable and sealed properties.

## The `ValueConsumer` interface

The `ValueConsumer<I,O>` interface has a single property called
`handleValue`. This property has to be assigned to a `Function<I,O>`.
The function takes a value of type `I` as input and returns a value of type `O`.

## The `Function` interface
The `Function<I,O>` interface implements the `ValueConsumer<I,O>` interface.

## The `SyncConsumer` interface


## The `Instantiator` interface
The `Instantiator` interface extends the `ValueConsumer` interface

## The `StreamConsumer` interface

## Primitive Types

### The `boolean` type

A `boolean` value can either be `true` or `false`.


### The `integer` type
### The `text` type
### The `void` type
TODO: type name same as value ... type==value?
void as const value+type
### The `null` type
const value+type
### The `integer` type
### The `decimal` type
### The `quantity` type
### The `buffer` type
### The `time` type
### The `color` type
### The `endpoint` type
### The `symbol` type
### The `image` type
### The `audio` type
### The `video` type
### The `model` type
### The `font` type
### The `application` type

## Records

Records are non-extendable key-value data structures.
All properties must be specified on creation. New properties cannot be added.
Records can contain integer and text keys.

Example:
```datex
val record = (1, 2, 3, a:'text', b:42)
```
Per default, any value can be assigned to a key.
The allowed types for keys of a `Record<T>` can be specified with the generic parameter `T`:
```datex
Record<text> // allow only text values for any key
Record<(a:text, b:integer)> // allow only a property 'a' with type text and a property 'b' with type integer
```


## Objects

Objects are extendable key-value data structures.
Only text keys are allowed. New properties can be added and existing properties can be deleted after creation.
Per default, any value can be assigned to a key.

## Arrays
Arrays are extendable key-value data structures.
Only integer keys are allowed. New properties can be added and existing properties can be deleted after creation.
Per default, any value can be assigned to a key.

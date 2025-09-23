# 10 Type System

## 10.1 Core Types

DATEX defines a range of core types, from simple primitive types such as
`integer` and `text`, to more complex composite types such as `Map` and `Set`.

The term "core value" refers to a concrete instance of a core type, while
"value" is used in a broader sense to denote an instance of any type.

There is no difference between primitive and composite types in their usage.
Both can be accessed as references and values.

### 10.1.1 List of Core Types

#### 10.1.1.1 Non-instantiable Types

| Type    | Example (DATEX Syntax) | Description                                                                                                                      |
| ------- | ---------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| unit    | `unit`                 | The unit type has a single value, also called `unit`. It is used as the return type of a function that does not return anything. |
| never   | `never`                | The never type has no values. It is used to indicate that a function does not return normally (e.g., it always throws an error). |
| unknown | `unknown`              | The unknown type is the supertype of all types. It can hold any value, but values of this type cannot be used directly.          |

#### 10.1.1.2 Primitive Types

| Type        | Variant      | Example (DATEX Syntax) | Description                                                                                                                                                                                                           |
| ----------- | ------------ | ---------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| boolean     |              | `true` / `false`       | A boolean value can either be `true` or `false`.                                                                                                                                                                      |
| null        |              | `null`                 | A null value.                                                                                                                                                                                                         |
| integer     |              | `42`                   | The default integer type can hold arbitrarily large finite positive and negative integer values.                                                                                                                      |
|             | u8           | `42u8`                 | An integer with a range of 0 to 255.                                                                                                                                                                                  |
|             | u16          | `42u16`                | An integer with a range of 0 to 65,535.                                                                                                                                                                               |
|             | u32          | `42u32`                | An integer with a range of 0 to 4,294,967,295.                                                                                                                                                                        |
|             | u64          | `42u64`                | An integer with a range of 0 to 18,446,744,073,709,551,615.                                                                                                                                                           |
|             | ubig         | `42ubig`               | An integer with an arbitrary large positive value.                                                                                                                                                                    |
|             | i8           | `42i8`                 | An integer with a range of -128 to 127.                                                                                                                                                                               |
|             | i16          | `42i16`                | An integer with a range of -32,768 to 32,767.                                                                                                                                                                         |
|             | i32          | `42i32`                | An integer with a range of -2,147,483,648 to 2,147,483,647.                                                                                                                                                           |
|             | i64          | `42i64`                | An integer with a range of -9,223,372,036,854,775,808 to 9,223,372,036,854,775,807.                                                                                                                                   |
|             | ibig         | `42ibig`               | An integer with an arbitrary large negative or positive value.                                                                                                                                                        |
| decimal     |              | `42.0`                 | The default decimal type can hold arbitrarily large finite positive and negative decimal values with arbitrary finite decimals. Additionally it can hold the special values \`infinity\`, \`-infinity \` and \`nan\`. |
|             | f32          | `42.0f32`              | A 32-bit floating point number.                                                                                                                                                                                       |
|             | f64          | `42.0f64`              | A 64-bit floating point number.                                                                                                                                                                                       |
|             | big          | `42.0big`              | A decimal number with arbitrary precision.                                                                                                                                                                            |
| amount      |              | `42m`                  | A quantity value consisting of a decimal number and an SI unit or currency unit                                                                                                                                       |
| endpoint    |              | `@example`             | A DATEX endpoint identifier.                                                                                                                                                                                          |
| url         |              | `https://unyt.org/`    | A URL.                                                                                                                                                                                                                |
|             | anonymous    | `@@123456789`          | An anonymous DATEX endpoint identifier.                                                                                                                                                                               |
|             | person       | `@user`                | A DATEX endpoint identifier representing a person.                                                                                                                                                                    |
|             | organisation | `@+unyt`               | A DATEX endpoint identifier representing an organisation.                                                                                                                                                             |
| text        |              | `"Hello DATEX"`        | A string of text.                                                                                                                                                                                                     |
|             | plain        | -                      | A string of the text with the mime type `text/plain`.                                                                                                                                                                 |
|             | markdown     | -                      | A string of the text with the mime type `text/markdown`.                                                                                                                                                              |
|             | html         | -                      | A string of the text with the mime type `text/html`.                                                                                                                                                                  |
|             | ...          | -                      | TODO: additional text/* mime types                                                                                                                                                                                    |
| application |              | -                      | A binary blob with the mime type `application/*`.                                                                                                                                                                     |
|             | json         | -                      | A binary blob with the mime type `application/json`.                                                                                                                                                                  |
|             | pdf          | -                      | A binary blob with the mime type `application/pdf`.                                                                                                                                                                   |
|             | ...          | -                      | TODO: additional application/* mime types                                                                                                                                                                             |
| audio       |              | -                      | An audio file with the mime type `audio/*`.                                                                                                                                                                           |
|             | mp3          | -                      | An audio file with the mime type `audio/mpeg`.                                                                                                                                                                        |
|             | wav          | -                      | An audio file with the mime type `audio/wav`.                                                                                                                                                                         |
|             | ...          | -                      | TODO: additional audio/* mime types                                                                                                                                                                                   |
| video       |              | -                      | A video file with the mime type `video/*`.                                                                                                                                                                            |
|             | mp4          | -                      | A video file with the mime type `video/mp4`.                                                                                                                                                                          |
|             | webm         | -                      | A video file with the mime type `video/webm`.                                                                                                                                                                         |
|             | ...          | -                      | TODO: additional video/* mime types                                                                                                                                                                                   |
| image       |              | -                      | An image file with the mime type `image/*`.                                                                                                                                                                           |
|             | png          | -                      | An image file with the mime type `image/png`.                                                                                                                                                                         |
|             | jpeg         | -                      | An image file with the mime type `image/jpeg`.                                                                                                                                                                        |
|             | svg          | -                      | An image file with the mime type `image/svg+xml`.                                                                                                                                                                     |
|             | ...          | -                      | TODO: additional image/* mime types                                                                                                                                                                                   |
| font        |              | -                      | A font file with the mime type `font/*`.                                                                                                                                                                              |
|             | woff         | -                      | A font file with the mime type `font/woff`.                                                                                                                                                                           |
|             | woff2        | -                      | A font file with the mime type `font/woff2`.                                                                                                                                                                          |
|             | ...          | -                      | TODO: additional font/* mime types                                                                                                                                                                                    |
| model       |              | -                      | A 3D model file with the mime type `model/*`.                                                                                                                                                                         |
|             | gltf         | -                      | A 3D model file with the mime type `model/gltf+json`.                                                                                                                                                                 |
|             | glb          | -                      | A 3D model file with the mime type `model/gltf-binary`.                                                                                                                                                               |
|             | ...          | -                      | TODO: additional model/* mime types                                                                                                                                                                                   |

##### 10.1.1.2.1 Amounts

An amount consists of a decimal number and a unit. The unit can either be a SI
unit or a currency unit.

###### SI Base Units

| Unit | Description | Example DATEX Value | DATEX Type   |
| ---- | ----------- | ------------------- | ------------ |
| m    | meter       | `42m`               | `amount/m`   |
| kg   | kilogram    | `42kg`              | `amount/kg`  |
| s    | second      | `42s`               | `amount/s`   |
| A    | ampere      | `42A`               | `amount/A`   |
| K    | kelvin      | `42K`               | `amount/K`   |
| mol  | mole        | `42mol`             | `amount/mol` |
| cd   | candela     | `42cd`              | `amount/cd`  |

###### Currency Units

| Unit | Description   | Example DATEX Value | DATEX Type   |
| ---- | ------------- | ------------------- | ------------ |
| EUR  | Euro          | `42EUR`             | `amount/EUR` |
| USD  | US Dollar     | `42USD`             | `amount/USD` |
| GBP  | British Pound | `42GBP`             | `amount/GBP` |
| JPY  | Japanese Yen  | `42JPY`             | `amount/JPY` |
| CHF  | Swiss Franc   | `42CHF`             | `amount/CHF` |
| ...  | ...           | ...                 | ...          |

#### 10.1.1.3 Composite Types

| Type      | Example (DATEX Syntax)                        | Description                                                                                        |
| --------- | --------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| List      | `(1,2,3)`                                     | A list of arbitrary values.                                                                        |
| Array     | `[1,2,3]`                                     | An array of arbitrary values with a fixed length.                                                  |
| Map       | `("key": "value", (1): 2)`                    | A map of arbitrary key-value pairs.                                                                |
| Struct    | `{name: "Alice", age: 30}`                    | A struct with fixed named fields containing arbitrary values.                                      |
| Set       | `Set(1,2,3)`                                  | A set of unique arbitrary values.                                                                  |
| Function  | `function (x: integer) -> integer ( x * 2 )`. | A pure function that returns the same output value for the same input value, without side effects. |
| Procedure | `procedure (x: integer) -> integer ( x * 2 )` | A procedure that can have side effects and does not guarantee the same output for the same input.  |
| ...       | ...                                           | ...                                                                                                |

DATEX Script example (TODO move)

```datex
const a = 10; // inferred type for x is 'integer'
const b: integer/i8 = 255; // explicitly specifying type as signed 8-bit integer
const c: text/markdown = "# Markdown content";
const d = (1,2,3); // inferred type is List<integer>
const d: List<integer/i8> = (1,2,3); // Explicitly create a List containing only signed 8-bit integers
const s1 = Set (1,2,3); // creating a new value of type Set<integer> (inferred)
const s3 = Set<integer|text>(1,2,3); // creating a Set with an explicit type
```

Core types are available on every endpoint instance. Custom type definitions can
be loaded as pointers from other endpoints.

## 10.2 Nominal and Structural Types

The DATEX type system provides both nominal and structural typing.

### 10.2.1 Type Aliases

## 10.3 Interfaces

Interfaces are special types that cannot be instantiated. They can contain
overridable and sealed properties.

## 10.4 The `ValueConsumer` interface

The `ValueConsumer<I,O>` interface has a single property called `handleValue`.
This property has to be assigned to a `Function<I,O>`. The function takes a
value of type `I` as input and returns a value of type `O`.

## 10.5 The `Function` interface

The `Function<I,O>` interface implements the `ValueConsumer<I,O>` interface.

## 10.6 The `SyncConsumer` interface

## 10.7 The `Instantiator` interface

The `Instantiator` interface extends the `ValueConsumer` interface

## 10.8 The `StreamConsumer` interface

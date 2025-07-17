# 4 Terms and Definitions

[//]: # (TODO: terms as top level enumeration, no sub-chapters)

## 4.1 Primitive Values

A value with one of the following types:

- `null` _(JS: undefined = `js:undefined & null`)_
- `boolean`
- `integer`
- `decimal`
- `quantity`
- ~~`buffer`~~ _(deprecated)_ _(JS: Buffer = `js:Buffer & Array<integer/8>`)_
- `time` _(time = timestamp / point in time, duration = quantity of seconds)_
- `endpoint`
- ~~`symbol`~~ _(deprecated)_ _(immutable pointer on `null`)_ _(JS: Symbol =
  `$<js:Symbol & null>`)_ **(TDB)**
- `color` **(TDB)**
- any mime type

### 4.1.1 Mime Value

A value with one of the following types:

- `text`
- `image`
- `audio`
- `video`
- `model`
- `font`
- `application`

## 4.2 Non-instantiatable type

- `Any`
- `ValueConsumer` **(TDB)**
- `StreamConsumer` **(TDB)**

## 4.3 Complex Values

A value with one of the following types:

- `Tuple`
- `Array`
- `Object`
- `Map`
- `Set`
- `Scope` (**TBD**)
- `Function`
- `Iterator`
- `Stream`
- `Error` (TODO: std lib?)
- `Task`
- `Type`
- all logical types

## 4.4 Logical Value

A value with one of the following types:

- `Disjunction`
- `Conjunction`
- `Negation`

## 4.5 DXB

Refers to the DATEX Binary Format in general, or to a particular DATEX block.

## 4.6 script

A text containing human-readable DATEX Syntax. A script can be compiled to DXB.

## 4.7 block

A self-contained executable DATEX Binary sent from one endpoint to another
endpoint.

## 4.8 message

A sequence of DATEX instructions distributed over one ore more blocks.

## 4.9 scope

The set of variables that exist during the exeuction of a message. A scope
exists until the message is completely executed.

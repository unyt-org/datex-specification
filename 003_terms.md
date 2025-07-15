# 3 Terms and Definitions

[//]: # (TODO: terms as top level enumeration, no sub-chapters)

## 3.1 Primitive Values
A value with one of the following types:
* `null` *(JS: undefined = `js:undefined & null`)*
* `boolean`
* `integer`
* `decimal`
* `quantity`
* ~~`buffer`~~ *(deprecated)* *(JS: Buffer = `js:Buffer & Array<integer/8>`)*
* `time` *(time = timestamp / point in time, duration = quantity of seconds)*
* `endpoint`
* ~~`symbol`~~ *(deprecated)* *(immutable pointer on `null`)* *(JS: Symbol = `$<js:Symbol & null>`)* **(TDB)**
* `color` **(TDB)**
* any mime type

### 3.1.1 Mime Value
A value with one of the following types:
* `text`
* `image`
* `audio`
* `video`
* `model`
* `font`
* `application`


## 3.2 Non-instantiatable type
* `Any`
* `ValueConsumer` **(TDB)**
* `StreamConsumer` **(TDB)**


## 3.3 Complex Values
A value with one of the following types:
* `Tuple`
* `Array`
* `Object`
* `Map`
* `Set`
* `Scope` (**TBD**)
* `Function`
* `Iterator`
* `Stream`
* `Error` (TODO: std lib?)
* `Task`
* `Type`
* all logical types


## 3.4 Logical Value
A value with one of the following types:
* `Disjunction`
* `Conjunction`
* `Negation`


## 3.5 DXB
Refers to the DATEX Binary Format in general, or to a particular DATEX block.

## 3.6 script
A text containing human-readable DATEX Syntax. A script can be compiled to DXB.

## 3.7 block
A self-contained executable DATEX Binary sent from one endpoint to another endpoint. 

## 3.8 message
A sequence of DATEX instructions distributed over one ore more blocks.

## 3.9 scope
The set of variables that exist during the exeuction of a message. A scope exists until the message is completely executed.

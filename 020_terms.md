# Terms and Definitions


## Primitive Value
A value with one of the following types:
* ~~`void`~~ *(deprecated)*
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


## Non-instantiatable type
* `Any`
* `ValueConsumer` **(TDB)**
* `StreamConsumer` **(TDB)**

## Mime Value
A value with one of the following types:
* `text`
* `image`
* `audio`
* `video`
* `model`
* `font`
* `application`


## Complex Value
A value with one of the following types:
* `Record`
* `Array`
* `Object`
* `Map`
* `Set`
* `Scope` (**TBD**)
* `Function`
* `Iterator`
* `Stream`
* `Error`
* `Task`
* `Type`
* all logical types



## Logical Value
A value with one of the following types:
* `Disjunction`
* `Conjunction`
* `Negation`


## DXB
Refers to the DATEX Binary Format in general, or to a particular DATEX block.

## script
A text containing human-readable DATEX Syntax. A script can be compiled to DXB.

## block
A self-contained executable DATEX Binary sent from one endpoint to another endpoint. 

## message
A sequence of DATEX instructions distributed over one ore more blocks.

## scope
The set of variables that exist during the exeuction of a message. A scope exists until the message is completely executed.

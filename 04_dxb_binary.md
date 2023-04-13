# Binary Instruction Codes

The following section contains a list of all DXB binary instruction codes.


## Remarks

Instruction codes have a size of 1 byte. The codes from 0x60 to 0x9f are reserved for later use.

Number types:
* **Uint8**:  Unsigned Integer, 8 Bits = 1 Byte
* **Uint32**: Unsigned Integer, 32 Bits = 4 Bytes
* **Int8**: Signed Integer, 8 Bits = 1 Byte, -2_147_483_648 to 2_147_483_647
* **Int16**: Signed Integer, 16 Bits = 2 Bytes, -2_147_483_648 to 2_147_483_647
* **Int32**: Signed Integer, 32 Bits = 4 Bytes, -2_147_483_648 to 2_147_483_647
* **Int64**: Signed Integer, 64 Bits = 8 Bytes, -9223372036854775808 to 9223372036854775807
* **Float64**: IEEE 754, Double-precision floating-point format, 64 Bits = 8 Bytes, 2.2e-308 to 1.7e+308

DATEX uses the little endian format for all numbers.

## Stand-alone codes
|Name               | Hex Code | DX equivalent | Description |
|-------------------|:--:|---------|------------------------------------------------------------------|
|`CLOSE_AND_STORE`| a0 | `;`     | Close current statement and store result in the `#scope_result` variable. A DATEX Script must always end with CLOSE_AND_STORE. |
|`SUBSCOPE_START`   | a1 | `(`     | Subscope starts, executed independently from parent scope        |
|`SUBSCOPE_END`     | a2 | `)`     | Subscope closed, `#scope_result` passed on to parent            |
|`END`              | 00 | `end`    | The scope execution is immediately stopped. The `#scope_result` is returned as normal |
|`RETURN`           | a4 | `return`    | Returns the current `#scope_result`, scope continues afterwards    |

## Runtime Commands

Runtime commands can be standalone commands or commands with parameters.
A command is normally expected to be followed by a specfic amount of values (parameters).
Runtime commands are equivalent to operators (e.g. comparators) in DXB, but are viewed as a seperate group because they correspond to a string in DATEX Script (semantics similar to applying a value to a function).<br>
Other operators always have a shorthand symbol in DATEX Script (e.g. `!`, `==`).

|Name            | Hex Code | Structure | Expected Parameters | Return value type |  DX equivalent | Description |
|-------------------|:--:|------|-------|-------------|-----|-----------------------------------------------------------------|
|`JMP`              | a5 | `[INDEX]: Uint32` | -   | `<Void>` | `jmp 42`      | Changes scope index to 'INDEX' and continues execution from there   |
|`JTR`              | a6 | `[INDEX]: Uint32`      | `<boolean>`  | `<Void>` | `jtr 42 ev1`    | Jumps if the parameter value is true-ish    |
|`JFA`              | 66 | `[INDEX]: Uint32`      | `<boolean>`  | `<Void>` | `jfa 42 ev1`    | Jumps if the parameter value is false-ish    |
| | | | | | | |
|`COUNT`            | ad | standalone     | `<Any>`   | `<integer>` | `count ev1`   | Counts the number of elements of the ev   |
|`ABOUT`            | ae | standalone     | `<Any>`   | `<Markdown>` | `about ev1`   | Returns a `<Markdown>` value describing the value  |
|`GET_TYPE`         | f5 | standalone     | `<Any>`   | `<Type>` | `type ev1`   | Returns the `<Type>` of a value |
|`RESOLVE_URL`      | 52 | standalone     | `<text>` | `<Url>` | `url "https://..."`   | Converts the string to a `<Url>`. The url is resolved to its content |
|`TEMPLATE`         | 53 | standalone     | `<Type>`  `<Object>`  | `<Void>` | `template <Type> {}`  | Defines the template for a type |
|`EXTENDS`          | 54 | standalone     | `<Any>` | `<boolean>` | `av extends y` |Returns true if the current active value (av) extends y |
|`IMPLEMENTS`       | 55 | standalone     | `<Type>` | `<boolean>` | `av implements <Type>`  | Returns true if the current active value (av) extends the template of the type |
| | | | | | | |
|`DELETE_POINTER`   | ba | standalone     | `<Any>` (pointer) | `<Void>` | `delete pointer`  | Permanently deletes the pointer on the current endpoint |
|`SUBSCRIBE`        | bb | standalone     | `<Any>` (pointer) | `<Any>`  | `subscribe pointer`  | Get future updates for this pointer. The current value of the pointer is returned |
|`UNSUBSCRIBE`      | bc | standalone     | `<Any>` (pointer) | `<Void>` | `unsubscribe pointer`  | Stop getting future updates for this pointer. |
|`VALUE`            | bd | standalone     | `<Any>` (pointer) | `<Any>`  | `value pointer`  | Get the value of a pointer |
|`ORIGIN`           | be | standalone     | `<Any>` (pointer) | `<Endpoint>` | `origin pointer`  | Get the origin endpoint of a pointer. |
|`SUBSCRIBERS`      | bf | standalone     | `<Any>` (pointer) | `<Filter>` | `subscribers pointer`  | Get all current subscribers for a pointer. |


## Operators

### Comparators

A comparator operator compares the current active value with an effective value that follows after the comparator.

|Name               | Hex Code |  DX equivalent | Description |
|-------------------|:--:|-------------------|----------------------------------------------|
|`EQUAL`            | a7 | `av == ev1` | Active value is set to `true` if current active value is the same as ev1 |
|`NOT_EQUAL`        | a8 | `av ~= ev1` | Active value is set to `true` if current active value is not the same as ev1 |
|`GREATER`          | a9 | `av > ev1`  | Active value is set to `true` if current active value is greater ev1 |
|`LESS`             | aa | `av < ev1`  | Active value is set to `true` if current active value is less than ev1 |
|`GREATER_EQUAL`    | ab | `av >= ev1` | Active value is set to `true` if current active value is greater or equal to ev1 |
|`LESS_EQUAL`       | ac | `av <= ev1` | Active value is set to `true` if current active value is less or equal to ev1 |


### Combinators

Combination operators combine two values and can be used as mathematical or logical operators, but can also have custom functions for different value types.
For mathematical operations, Floats and Ints can be combined.

|Name             | Hex Code |  DX equivalent | Description |
|-----------------|:--:|-------------------|----------------------------------------------|
|`ADD`            | f8 | `1 + 2`, `1.0 + 2`, `"a" + "b"`, `[1,2] + [3,4]` (whitespaces required) | Adds the active value to the next value |
|`SUBTRACT`       | fa | `10 - 2` (whitespaces required) | Subtracts next value from the active value |
|`MULTIPLY`       | fb | `10 * 2`, `10 * 'a'`, `(void * 4, 1, (1,2,3) * 2)` (whitespaces required) | Multiplies the active value with the next value |
|`DIVIDE`         | fb | `22.22 / 2` | Divides the active value from the next value |
|`AND`            | ea | `true & b`, `@user1 & #allowed` | Logical AND |
|`OR`             | eb | `false \| b`, `@user1 \| @user2` | Logical OR |
|`RANGE`          | fd | `a..b` | Accepts only `<integer>` values, returns `<Tuple>` with ascending integers starting with `a` and excluding `b` |


### Other operators
|Name             | Hex Code |  DX equivalent | Description |
|-----------------|:--:|-------------------|----------------------------------------------|
|`STREAM`         | ed | `x << 'streamed data' 'more data' ` | Accepts an arbitrary number of immediately followed `<text>`, `<Buffer>`, and `<Stream>` values. x must be a `<StreamSink>` |


## Shortcuts for Standard Library types

The `<Type>` values for all standard library types are represented with a single byte:

|Name               | Hex Code | DX equivalent |
|----------------------|:--:|-------------|
|`STD_TYPE_STRING`     | 10 | `<text>`  |
|`STD_TYPE_INT`        | 11 | `<integer>`     |
|`STD_TYPE_FLOAT`      | 12 | `<decimal>`   |
|`STD_TYPE_BOOLEAN`    | 13 | `<boolean>` |
|`STD_TYPE_NULL`       | 14 | `<Null>`    |
|`STD_TYPE_VOID`       | 15 | `<Void>`    |
|`STD_TYPE_BUFFER`     | 16 | `<Buffer>`  |
|`STD_TYPE_CODE_BLOCK` | 17 | `<Datex>`   |
|`STD_TYPE_UNIT`       | 18 | `<Unit>`    |
|`STD_TYPE_FILTER`     | 19 | `<Filter>`  |
|`STD_TYPE_ARRAY`      | 1a | `<Array>`   |
|`STD_TYPE_OBJECT`     | 1b | `<Object>`  |
|`STD_TYPE_SET`        | 1c | `<Set>`     |
|`STD_TYPE_MAP`        | 1d | `<Map>`     |
|`STD_TYPE_TUPLE`      | 1e | `<Tuple>`   |
|`STD_TYPE_RECORD`     | 1f | `<Tuple>`   |
|`STD_TYPE_FUNCTION`   | 20 | `<Function>`|
|`STD_TYPE_STREAM`     | 21 | `<Stream>`|

## Values


Values instructions parse a value and then insert it into the scope.


### Standalone values

|Name               | Hex Code | DX equivalent |
|----------------------|:--:|-------------|
|`TRUE`      | c4 | `true` |
|`FALSE`     | c5 | `false`|
|`NULL`      | c6 | `null` |
|`VOID`      | c7 | `void` |

### Other primitive values

|Name              | Hex Code | Structure | DX example | Description |
|------------------|:--:|------|-----------|-----------------------------------------------------------------|
|`STRING`          | c0 |<pre class="language-yaml">LENGTH: Uint32&#10;VALUE: Uint8[LENGTH]</pre>| `"A String"`    | Maximum size 4.29 GB. DATEX Strings are not null-terminated, their length is stored |
|`SHORT_STRING`    | ce |<pre class="language-yaml">LENGTH: Uint8&#10;VALUE: Uint8[LENGTH]</pre>| `"A Short String"`    | Maximum size 255 bytes  |
|`INT_8`           | c1 |<pre class="language-yaml">VALUE: Int8</pre>| `127`    | Range -128 -> 127 |
|`INT_16`          | c2 |<pre class="language-yaml">VALUE: Int16</pre>| `32767`    | Range –32768 -> 32767 |
|`INT_32`          | c3 |<pre class="language-yaml">VALUE: Int32</pre>| `127`    | Range –2147483648 -> 2147483647 |
|`INT_64`          | c4 |<pre class="language-yaml">VALUE: Int64</pre>| `<integer>9e18`    | Range -9223372036854775808 -> 9223372036854775807 |
|`FLOAT_64`        | c5 |<pre class="language-yaml">VALUE: Float64</pre>| `-12.34`, `infinity`, `nan` | Range 2.2e-308 -> 1.7e+308 |
|`BUFFER`          | ca |<pre class="language-yaml">LENGTH: Uint32&#10;VALUE: Uint8[LENGTH]</pre>| `` `fafe334feaefe3` `` | A raw binary data buffer, maximum size 4.29 GB |


### Array, Objects, Tuples and Records

|Name               | Hex Code | DX equivalent | Description |
|-------------------|:--:|---------|------------------------------------------------------------------|
|`ARRAY_START`      | e0 | `[`     | `<Array>` declaration start      |
|`ARRAY_END`        | e1 | `]`     | `<Array>` declaration end      |
|`OBJECT_START`     | e2 | `{`     | `<Object>` declaration start      |
|`OBJECT_END`       | e3 | `}`     | `<Object>` declaration end      |
|`TUPLE_START`      | e4 | `(`     | `<Tuple>` declaration start |
|`TUPLE_END`        | e5 | `)`     | `<Tuple>` declaration end      |

Tuple, Record, and Subscope share the same symbol in DATEX Script.

## Pointers and Variables

DATEX distinguishes between normal Variables, Internal Variables for specific purposes, and Pointers/Labels for persistant values.

|Name             | Hex Code |  DX equivalent | Description |
|-----------------|:--:|-------------------|----------------------------------------------|
|`VAR`            | b0 | `myVar` | Inserts the value of 'myVar' into the scope |
|`SET_VAR`        | b1 | `myVar = x` | Sets the value of 'myVar' to 'x' |
|`VAR_ACTION`     | b2 | `myVar += x`, `myVar -= x`, `myVar &= x` | Applies 'x' with the operator to 'myVar' internally (The value of 'myVar' is updated, but the variable is not overwritten) |

<!--
`CODE_BLOCK`           `0xc9`  (a,b)=>(a+b)
```yaml
{ 
    PARAMS_NR:   Uint16 
    {
        PARAM_NAME_LENGTH: Uint8
        PARAM_NAME:        Uint8[PARAM_NAME_LENGTH]
    }[PARAMS_NR]
    CODE_LENGTH: Uint32
    CODE:        Uint8[CODE_LENGTH]  
}
```

`UNIT`                `0xca` 
```yaml
{ 
    VALUE  Float64
}
```

`FILTER`              `0xcb`  +app & #label1 | #label2
```yaml
{ 
}
```


`ALIAS`               `0xd0`   @alias
```yaml
{ 
    NAME_LENGTH:    Uint8
    CHANNEL_LENGTH: Uint8
    NAME:           Uint8[NAME_LENGTH]
    CHANNEL:        Uint8[CHANNEL_LENGTH]
}
```

LABEL               = 0xd1 { # #label
    NAME_LENGTH    Uint8
    CHANNEL_LENGTH Uint8
    NAME           Uint8[NAME_LENGTH]
    CHANNEL        Uint8[CHANNEL_LENGTH]
}

FLAG                = 0xd2 { # §flag
    NAME_LENGTH    Uint8
    CHANNEL_LENGTH Uint8
    NAME           Uint8[NAME_LENGTH]
    CHANNEL        Uint8[CHANNEL_LENGTH]
}

ORG                 = 0xd3 { # :org
    NAME_LENGTH    Uint8
    CHANNEL_LENGTH Uint8
    NAME           Uint8[NAME_LENGTH]
    CHANNEL        Uint8[CHANNEL_LENGTH]
}

APP                 = 0xd4 { # +app
    NAME_LENGTH    Uint8
    CHANNEL_LENGTH Uint8
    NAME           Uint8[NAME_LENGTH]
    CHANNEL        Uint8[CHANNEL_LENGTH]
}

NODE                = 0xd5 { # *node
    NAME_LENGTH    Uint8
    CHANNEL_LENGTH Uint8
    NAME           Uint8[NAME_LENGTH]
    CHANNEL        Uint8[CHANNEL_LENGTH]
}


PLUS_ALIAS          = 0xd6 { # @+alias
    NAME_LENGTH    Uint8
    CHANNEL_LENGTH Uint8
    NAME           Uint8[NAME_LENGTH]
    CHANNEL        Uint8[CHANNEL_LENGTH]
}

PLUS_LABEL          = 0xd7 { # #+label
    NAME_LENGTH    Uint8
    CHANNEL_LENGTH Uint8
    NAME           Uint8[NAME_LENGTH]
    CHANNEL        Uint8[CHANNEL_LENGTH]
}

PLUS_FLAG           = 0xd8 { # §+flag
    NAME_LENGTH    Uint8
    CHANNEL_LENGTH Uint8
    NAME           Uint8[NAME_LENGTH]
    CHANNEL        Uint8[CHANNEL_LENGTH]
}

PLUS_ORG            = 0xd9 { # :+org
    NAME_LENGTH    Uint8
    CHANNEL_LENGTH Uint8
    NAME           Uint8[NAME_LENGTH]
    CHANNEL        Uint8[CHANNEL_LENGTH]
}

PLUS_APP            = 0xda { # ++app
    NAME_LENGTH    Uint8
    CHANNEL_LENGTH Uint8
    NAME           Uint8[NAME_LENGTH]
    CHANNEL        Uint8[CHANNEL_LENGTH]
}

PLUS_NODE           = 0xdb { # *+node
    NAME_LENGTH    Uint8
    CHANNEL_LENGTH Uint8
    NAME           Uint8[NAME_LENGTH]
    CHANNEL        Uint8[CHANNEL_LENGTH]
}

ID_ENDPOINT         = 0xdc { # %aa-ff-ee-a3-ef
    ID_LENGTH      Uint8
    CHANNEL_LENGTH Uint8
    ID             Uint8[ID_LENGTH]
    CHANNEL        Uint8[CHANNEL_LENGTH]
}

PLUS_ID_ENDPOINT    = 0xdd { # %+aa-ff-ee-a3-ef
    ID_LENGTH      Uint8
    CHANNEL_LENGTH Uint8
    ID             Uint8[ID_LENGTH]
    CHANNEL        Uint8[CHANNEL_LENGTH]
}
-->
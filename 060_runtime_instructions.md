# Instruction Codes

## 00

## 10 STD_TYPE_TEXT

* DATEX Script code `#std.text`

## C0 TEXT

Structure: [Instruction.Text](./300_data_structures.md#instructiontext)

LENGTH is the size of the utf-8-encoded string in bytes.

### Minimum size
`4 bytes`

### Maximum size
`4 + 2**32 bytes`

### Validation
```typescript
function(data: Uint8[]):
   length <- getUint32(data)
   return len(data) > length + 4
```

### Parameters
*None*
### Return value
The TEXT instruction returns a value of type `Datex.Text`.

### Procedure
```typescript
function (data: Instruction.Text):
   return Datex.Text {
      length: data.LENGTH,
      content: data.CONTENT
   }
```
### Datex Script mapping

Characters between two double quotes are converted to utf-8 formatted text. Characters can be escaped with a backslash character (`\`).

Examples:
```datex
"a";
"#ölz1";
"中文";
"\"";
"\\";
```


## 53 IMPLEMENTS

Structure: *Empty*

In the following, 'type' refers to a value of type `<Type>` or `<Composite(<Type>)>`.

The IMPLEMENTS instruction checks if a type or its *root type* extends or implements another type.

### Minimum size
`0 bytes`

### Maximum size
`0 bytes`

### Validation
*none*

### Parameters
* Effective Value Parameter `$0`: The following types are allowed: `Datex.Type`, `Datex.Composite<Datex.Type>`
* Effective Value Parameter `$1`: The following types are allowed: `Datex.Type>`, `Datex.Composite<Datex.Type>`

### Return value
The IMPLEMENTS instruction returns a value of type `Datex.Boolean`.

### Procedure

```typescript
function (data:void, $0: Datex.Type|Datex.Composite<Datex.Type>, $1: Datex.Type|Datex.Composite<Datex.Type>):

	if $0 = Datex.any:
      return true

   if $0->TYPE = Datex.Type and $1->TYPE = Datex.Type:
      if composite.includes($0->IMPLEMENTED) or
         composite.includes($0->EXTENDED) or
         composite.includes($0->ROOT->IMPLEMENTED) or
         composite.includes($0->ROOT->EXTENDED):
            return true
      else 
         return false
   else 
      TODO

```

### Datex Script mapping

The `implements` keyword is mapped to the IMPLEMENTS instruction.
The keyword must be preceeded by one effective value and succeeded by one effective value:
```datex
a implements b
```
a corresponds to `$0`. b corresponds to `$1`. 

## 56 JUMP

Structure: [Instruction.Jump](./300_data_structures.md#instructionjump)

The JUMP instruction moves the instruction index to a given index.


### Minimum size
`4 bytes`

### Maximum size
`4 bytes`

### Validation
*none*

### Parameters
*None*

### Return value
*void*

### Procedure

```typescript
function (data: Instruction.Jump):
   newSubScope()
   (global->INDEX) <- data.INDEX

```

### Datex Script mapping

#### Labeled jumps:

The `jump` command can be followed by an ASCII character sequence (label). The global index is set to the position of the corresponding label command.


```datex
jump xx # scope->byteIndex = a
# ...
lbl xx  # scope->byteIndex = b
```
This corresponds to a JUMP instruction with the data
```rust
Instruction.Jump {
   INDEX: b
}
```



## 57 JUMP_TRUE

Structure: [Instruction.Jump](./300_data_structures.md#instructionjump)

The JUMP_TRUE instruction moves the instruction index to a given index, if a truthy value is passed as a parameter.

### Minimum size
`4 bytes`

### Maximum size
`4 bytes`

### Validation
*none*

### Parameters
* Effective Value Parameter `$0`: The following types are allowed: `Datex.Any`

### Return value
*void*

### Procedure

```typescript
function (data: Instruction.Jump, $0: Datex.Any):
   if not Datex.Boolean ($0):
      return;
   newSubScope()
   (global->INDEX) <- data.INDEX

```

### Datex Script mapping

#### Labeled jumps:

The `jumpTrue` command can be followed by an ASCII character sequence (label). The global index is set to the position of the corresponding label command.

```datex
jumpTrue xx condition # global->INDEX = a
# ...
lbl xx  # global->INDEX = b
```
This corresponds to a JUMP_TRUE instruction with the data
```rust
Instruction.Jump {
   INDEX: b
}
```


#### Explicit index jumps:
Alternatively, an explicit index (global->INDEX) can be provided to the `jumpTrue` command:

```datex
jumpTrue b condition
```

This corresponds to a JUMP_TRUE instruction with the data
```rust
Instruction.Jump {
   INDEX: b
}
```



## 58 JUMP_FALSE

Structure: [Instruction.Jump](./300_data_structures.md#instructionjump)

The JUMP_FALSE instruction moves the instruction index to a given index, if a truthy value is passed as a parameter.

### Minimum size
`4 bytes`

### Maximum size
`4 bytes`

### Validation
*none*

### Parameters
* Effective Value Parameter `$0`: The following types are allowed: `Datex.Any`

### Return value
*void*

### Procedure

```typescript
function (data: Instruction.Jump, $0: Datex.Any):
   if Datex.Boolean ($0):
      return;
   newSubScope()
   (global->INDEX) <- data.INDEX

```

### Datex Script mapping

#### Labeled jumps:

The `jumpFalse` command can be followed by an ASCII character sequence (label). The global index is set to the position of the corresponding label command.

```datex
jumpFalse xx condition # global->INDEX = a
# ...
lbl xx  # global->INDEX = b
```
This corresponds to a JUMP_FALSE instruction with the data
```rust
Instruction.Jump {
   INDEX: b
}
```


#### Explicit index jumps:
Alternatively, an explicit index (global->INDEX) can be provided to the `jumpFalse` command:

```datex
jumpFalse b condition
```

This corresponds to a JUMP_FALSE instruction with the data
```rust
Instruction.Jump {
   INDEX: b
}
```

## xx INSTRUCTION

Structure: [Instruction.xx](./300_data_structures.md#xx)

Description

### Minimum size
`x bytes`
### Maximum size
`x bytes`
### Validation
### Parameters
### Return value
### Procedure
### Datex Script mapping
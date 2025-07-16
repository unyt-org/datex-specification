# 8 Instruction Codes

## 8.1 00

## 8.2 STD_TYPE_TEXT

- DATEX Script code `#std.text`

## 8.3 TEXT

Structure: [Instruction.Text](./016_data_structures.md#instructiontext)

LENGTH is the size of the utf-8-encoded string in bytes.

### 8.3.1 Minimum size

`4 bytes`

### 8.3.2 Maximum size

`4 + 2**32 bytes`

### 8.3.3 Validation

```typescript
function(data: Uint8[]):
   length <- getUint32(data)
   return len(data) > length + 4
```

### 8.3.4 Parameters

_None_

### 8.3.5 Return value

The TEXT instruction returns a value of type `DATEX.Text`.

### 8.3.6 Procedure

```typescript
function (data: Instruction.Text):
   return DATEX.Text {
      length: data.LENGTH,
      content: data.CONTENT
   }
```

### 8.3.7 DATEX Script mapping

Characters between two double quotes are converted to utf-8 formatted text.
Characters can be escaped with a backslash character (`\`).

Examples:

```datex
"a";
"#ölz1";
"中文";
"\"";
"\\";
```

## 8.4 IMPLEMENTS

Structure: _Empty_

In the following, 'type' refers to a value of type `<Type>` or
`<Composite(<Type>)>`.

The IMPLEMENTS instruction checks if a type or its _root type_ extends or
implements another type.

### 8.4.1 Minimum size

`0 bytes`

### 8.4.2 Maximum size

`0 bytes`

### 8.4.3 Validation

_none_

### 8.4.4 Parameters

- Effective Value Parameter `$0`: The following types are allowed: `DATEX.Type`,
  `DATEX.Composite<DATEX.Type>`
- Effective Value Parameter `$1`: The following types are allowed:
  `DATEX.Type>`, `DATEX.Composite<DATEX.Type>`

### 8.4.5 Return value

The IMPLEMENTS instruction returns a value of type `DATEX.Boolean`.

### 8.4.6 Procedure

```typescript
function (data:void, $0: DATEX.Type|DATEX.Composite<DATEX.Type>, $1: DATEX.Type|DATEX.Composite<DATEX.Type>):

	if $0 = DATEX.any:
      return true

   if $0->TYPE = DATEX.Type and $1->TYPE = DATEX.Type:
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

### 8.4.7 DATEX Script mapping

The `implements` keyword is mapped to the IMPLEMENTS instruction. The keyword
must be preceeded by one effective value and succeeded by one effective value:

```datex
a implements b
```

a corresponds to `$0`. b corresponds to `$1`.

## 8.5 JUMP

Structure: [Instruction.Jump](./016_data_structures.md#instructionjump)

The JUMP instruction moves the instruction index to a given index.

### 8.5.1 Minimum size

`4 bytes`

### 8.5.2 Maximum size

`4 bytes`

### 8.5.3 Validation

_none_

### 8.5.4 Parameters

_None_

### 8.5.5 Return value

_void_

### 8.5.6 Procedure

```typescript
function (data: Instruction.Jump):
   newSubScope()
   (global->INDEX) <- data.INDEX
```

### 8.5.7 DATEX Script mapping

#### 8.5.7.1 Labeled jumps:

The `jump` command can be followed by an ASCII character sequence (label). The
global index is set to the position of the corresponding label command.

```datex
jump xx # scope->byteIndex = a
# 8 ...
lbl xx  # scope->byteIndex = b
```

This corresponds to a JUMP instruction with the data

```rust
Instruction.Jump {
   INDEX: b
}
```

## 8.1 JUMP_TRUE

Structure: [Instruction.Jump](./016_data_structures.md#instructionjump)

The JUMP_TRUE instruction moves the instruction index to a given index, if a
truthy value is passed as a parameter.

### 8.1.1 Minimum size

`4 bytes`

### 8.1.2 Maximum size

`4 bytes`

### 8.1.3 Validation

_none_

### 8.1.4 Parameters

- Effective Value Parameter `$0`: The following types are allowed: `DATEX.Any`

### 8.1.5 Return value

_void_

### 8.1.6 Procedure

```typescript
function (data: Instruction.Jump, $0: DATEX.Any):
   if not DATEX.Boolean ($0):
      return;
   newSubScope()
   (global->INDEX) <- data.INDEX
```

### 8.1.7 DATEX Script mapping

#### 8.1.7.1 Labeled jumps:

The `jumpTrue` command can be followed by an ASCII character sequence (label).
The global index is set to the position of the corresponding label command.

```datex
jumpTrue xx condition # global->INDEX = a
# 8 ...
lbl xx  # global->INDEX = b
```

This corresponds to a JUMP_TRUE instruction with the data

```rust
Instruction.Jump {
   INDEX: b
}
```

#### 8.0.0.1 Explicit index jumps:

Alternatively, an explicit index (global->INDEX) can be provided to the
`jumpTrue` command:

```datex
jumpTrue b condition
```

This corresponds to a JUMP_TRUE instruction with the data

```rust
Instruction.Jump {
   INDEX: b
}
```

## 8.1 JUMP_FALSE

Structure: [Instruction.Jump](./016_data_structures.md#instructionjump)

The JUMP_FALSE instruction moves the instruction index to a given index, if a
truthy value is passed as a parameter.

### 8.1.1 Minimum size

`4 bytes`

### 8.1.2 Maximum size

`4 bytes`

### 8.1.3 Validation

_none_

### 8.1.4 Parameters

- Effective Value Parameter `$0`: The following types are allowed: `DATEX.Any`

### 8.1.5 Return value

_void_

### 8.1.6 Procedure

```typescript
function (data: Instruction.Jump, $0: DATEX.Any):
   if DATEX.Boolean ($0):
      return;
   newSubScope()
   (global->INDEX) <- data.INDEX
```

### 8.1.7 DATEX Script mapping

#### 8.1.7.1 Labeled jumps:

The `jumpFalse` command can be followed by an ASCII character sequence (label).
The global index is set to the position of the corresponding label command.

```datex
jumpFalse xx condition # global->INDEX = a
# 8 ...
lbl xx  # global->INDEX = b
```

This corresponds to a JUMP_FALSE instruction with the data

```rust
Instruction.Jump {
   INDEX: b
}
```

#### 8.0.0.1 Explicit index jumps:

Alternatively, an explicit index (global->INDEX) can be provided to the
`jumpFalse` command:

```datex
jumpFalse b condition
```

This corresponds to a JUMP_FALSE instruction with the data

```rust
Instruction.Jump {
   INDEX: b
}
```

## 8.1 xx INSTRUCTION

Structure: [Instruction.xx](./016_data_structures.md#xx)

Description

### 8.1.1 Minimum size

`x bytes`

### 8.1.2 Maximum size

`x bytes`

### 8.1.3 Validation

### 8.1.4 Parameters

### 8.1.5 Return value

### 8.1.6 Procedure

### 8.1.7 DATEX Script mapping

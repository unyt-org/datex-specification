# 12 Mapping from DATEX Script to DXB (High-level abstractions)

All properties of the `#std` record are directly accessible in all scopes (`#std` prefix not necessary: `#std.text -> text`).

## 12.1 If branching

```datex
if conditionA (
	A 
)
# 12 global->INDEX = 1
```

maps to

```datex
jumpFalse 1 conditionA
A
```

## 12.1 If/Else branching

```datex
if conditionA (
	A 
)
# 12 global->INDEX = 1
else if conditionB (
	B
)
# 12 global->INDEX = 2
else (
	C 
)
# 12 global->INDEX = 3
```

maps to

```datex
jumpFalse 1 conditionA
A
jump 3

# 12 global->INDEX = 1
jumpFalse 2 conditionB
B
jump 3

# 12 global->INDEX = 2
C

# 12 global->INDEX = 3
```

## 12.1 While loops

```datex
# 12 global->INDEX = 1
while conditionA (
	A 
)
# 12 global->INDEX = 2
```

maps to

```datex
jumpFalse 2 conditionA
A
jump 1
```


## 12.1 Text with single quotes (template strings)

Characters between two single quotes are converted to a TEXT instruction, similar to [double quoted text](./006_runtime_instructions.md#datex-script-mapping).

Values can be injected into the string by enclosing them with parentheses. Parentheses can be escaped with a backslashes (`\`).

Examples:

```datex
'a value: (x) more text'
```
This is equivalent to the following DATEX script

```datex
("a value: " + (text x) + " more text")
or:todo?
template ("a value: ", x, " more text")
```
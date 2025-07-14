# 13 Mapping from DATEX Script to DXB (High-level abstractions)

All properties of the `#std` record are directly accessible in all scopes (`#std` prefix not necessary: `#std.text -> text`).

## 13.1 If branching

```datex
if conditionA (
	A 
)
# 13 global->INDEX = 1
```

maps to

```datex
jumpFalse 1 conditionA
A
```

## 13.1 If/Else branching

```datex
if conditionA (
	A 
)
# 13 global->INDEX = 1
else if conditionB (
	B
)
# 13 global->INDEX = 2
else (
	C 
)
# 13 global->INDEX = 3
```

maps to

```datex
jumpFalse 1 conditionA
A
jump 3

# 13 global->INDEX = 1
jumpFalse 2 conditionB
B
jump 3

# 13 global->INDEX = 2
C

# 13 global->INDEX = 3
```

## 13.1 While loops

```datex
# 13 global->INDEX = 1
while conditionA (
	A 
)
# 13 global->INDEX = 2
```

maps to

```datex
jumpFalse 2 conditionA
A
jump 1
```


## 13.1 Text with single quotes (template strings)

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
# Mapping from DATEX Script to DXB (High-level abstractions)

All properties of the `#std` record are directly accessible in all scopes (`#std` prefix not necessary: `#std.text -> text`).

## If branching

```datex
if conditionA (
	A 
)
# global->INDEX = 1
```

maps to

```datex
jumpFalse 1 conditionA
A
```

## If/Else branching

```datex
if conditionA (
	A 
)
# global->INDEX = 1
else if conditionB (
	B
)
# global->INDEX = 2
else (
	C 
)
# global->INDEX = 3
```

maps to

```datex
jumpFalse 1 conditionA
A
jump 3

# global->INDEX = 1
jumpFalse 2 conditionB
B
jump 3

# global->INDEX = 2
C

# global->INDEX = 3
```

## While loops

```datex
# global->INDEX = 1
while conditionA (
	A 
)
# global->INDEX = 2
```

maps to

```datex
jumpFalse 2 conditionA
A
jump 1
```


## Text with single quotes (template strings)

Characters between two single quotes are converted to a TEXT instruction, similar to [double quoted text](./060_runtime_instructions.md#datex-script-mapping).

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
# 11 Logical Composites

Logical Composites are the fundamental building blocks for high-level DATEX
functionality. They enable complex types, inheritance, meta properties, filter
logic and permission handling.

Logical Composites can be negations (NOT), conjunctions (AND) or disjunctions
(OR). A Logical Composite contains an ordered list of one or more values (that
can also be other Logical Composites).

Logical Composites are always evaluated from right to left (most recent to least
recent item).

```datex
ref a = false;
ref b = true;
ref y = true & a & b;
print y; # false;

a = true;
print y; # true;
```

Types:

```datex
type integer = (/* native implementation */);

type MyInteger = 
	integer &
	(
		export function toHex() (
			'#c0ffee'
		)
	)
val int = MyInteger (10);
print int.toHex()
```

## 11.1 Logical Composite Matching with Assertions

Logical composites can also contain assertions that are evaluated for a single
atomic value when a composite is matched against a value.

A match is valid (`true`) if a conjunction of the atomic value and the logical
composite results in a value other than `false`.

```datex
ref a = false;
ref y = a & assert (#it > 10);
print y; # Error: Composite value is unknown, assertion could not be resolved

print (20 matches y); # true
```

Endpoints:

```datex
@example & (x | allowed | admin)
@example matches (x | allowed | admin)
```

Types:

```datex
1 matches 1|text;

1 matches 1|2|3; # true
(1 & 'one') matches text; # true
(1 & 'one') matches integer; # true
```

## 11.2 Evaluation

Composites can be collapsed with the current item values. In some cases,
composite items without a reference (non-reactive values) can also be
immediately collapsed on construction.

Per default, values are compared by value and not by reference.

All items of a connective are compared (and potentially collapsed) in pairs from
right to left.

### 11.2.1 Conjunctions (AND)

Conjunctions evaluate to `false` if both items are primitive values with the
same type, but with a different value. If both items have the exact same value,
they are collapsed into a single item.

Non-primitive items are collapsed according to the specific rules of the types.

Examples:

```datex
false & false # false
true & false # false
true & true # true
1 & 2 # false
2 & "123" # 2 & "123"
@example & @test # false
@example & @example # true
integer/8 & integer # integer/8 (most specific type)
```

### 11.2.2 Disjunctions (OR)

If both items have the exact same value, they are collapsed into a single item.
Non-primitive items are collapsed according to the specific rules of the types.

If a non-false item is encountered, the non-false item is kept and all other
items are removed.

Examples:

```datex
false | false # false
true | false # true for values, true | false for types
true | true # true
```

## 11.3 Value Matching

// TODO: OR instead of AND for type inheritance

A DATEX value A can be matched against another value B. The result of the match
operation C is always a boolean.

```typescript
function logicalMatch(
	A: any & !Conjunction & !Disjunction & !Negation
	B: any & !Conjunction & !Disjunction & !Negation
)
	if A = B:
		return true

	// special type matching
	else if A->TYPE = #std.Type and B->TYPE = #std.Type:
		return  A->BASE = B

	// special endpoint matching
	else if A->TYPE = #std.Endpoint and B->TYPE = #std.Endpoint:
		return  A->BASE = B 

	return false
```

```typescript
function matchSingle(
	A: any
	B: any & !Conjunction & !Disjunction & !Negation
)

	// special type match
	if B->TYPE = #std.Type:
		if A->TYPE != #std.Type and A->TYPE != #std.void:
			return matchSingle(A->TYPE, B)

	result <- false;

	if A->TYPE = Conjunction:
		for each item E:any of A:
			result <- matchSingle(E, B)
			if result = false: break

	else if A->TYPE = Disjunction:
		for each item E:any of A:
			result <- matchSingle(E, B)
			if result = true: break

	else result <- logicalMatch(A, B)

	return result
```

```typescript
function match(
	A: any
	B: any
)
	result <- false

	if B->TYPE = Conjunction:
		for each item E:any of B:
			result <- match(A, E)
			if result = false: break

	else if B->TYPE = Disjunction:
		for each item E:any of B:
			result <- match(A, E)
			if result = true: break

	else result <- matchSingle(A, B)

	return result
```

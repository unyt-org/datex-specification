# Errors

## ReferenceError

### "x" is not defined

occurs when there is a non-existent variable referenced somewhere.

```ts
x + 5;
```

### assignment to undeclared variable "x"

occurs when the value has been assigned to an undeclared variable. This happens
within any scope (global, module, function) when variables are accessed before
the place where they are declared is executed.

```ts
x = 42;
```

### cannot use variable "x" in its own initializer

```ts
const x = x + 1;
```

### can't access lexical declaration "x" before initialization

occurs when a lexical variable was accessed before it was initialized. This
happens within any scope (global, module, function) when variables are accessed
before the place where they are declared is executed.

```ts
// mod a
use b from b.dx;
export const a = 42;

// mod b
use a from a.js;
print a;
export const b = 69;
```

```ts
function test() (
    print x;
    const x = 42;
)
```

## SyntaxError

### "x" is a reserved identifier

occurs when reserved keywords are used as identifiers.

```ts
const type = 42;
```

### ambiguous syntax, use parentheses to disambiguate

occurs for example when an nullish coalescing operator is used with a logical OR
or logical AND in the same expression without parentheses.

```ts
a ?? b || c;
a || b ?? c;
a ?? b && c;
a && b ?? c;
```

```ts
a + b * c | d; // unclear whether `|` is part of binary or type union
```

### continue must be inside loop

occurs when a continue statement is not inside a loop statement.

```ts
continue;
```

### duplicate formal argument "x"

occurs when a function creates two or more parameter bindings with the same
name.

```ts
function add(x, x) ()
```

### function statement requires a name

occurs when there is a function statement in the code that requires a name.

```ts
function () (42)
```

**Note**: that we might have to distinguish function expressions from function
declarations, like `val x = function () ()` might be valid as expression.

### identifier starts immediately after numeric literal

occurs when an identifier started with a digit. Identifiers can only start with
a letter, underscore (_), or dollar sign ($).

```ts
const 1life = "foo";
const foo = 1life;

1.toString() // TBD
1..toString() // TBD
```

### illegal character

occurs when the lexer reads a character that's not part of a string literal, and
the character cannot constitute a valid token in the language.

```ts
“datex”; // ” != " 

42 – 13; // – != -

const foo = "bar"; // ; != ;
```

### invalid assignment left-hand side

occurs when there was an unexpected assignment somewhere. It may be triggered
when a single = sign was used instead of == or ===.

```ts
Math.PI + 1 = 3

const x = "test" += "test"

function foo() (
  42;
)
foo() = 1;

obj?.foo = 1;
```

### missing `:` after property key

occurs when objects or tuples are created using the initializer syntax. A colon
(:) separates keys and values for the object's properties. Somehow, this colon
is missing or misplaced.

```ts
const obj = { key = "value" }; // invalid
const obj = { (x = "value"): 4 }; // valid
const obj = { "b"+"ar": "foo" }; // TDB
```

### missing `)` after condition

occurs when there is an error with how an if condition is written. It must
appear in parenthesis after the if keyword.

```ts
if (Math.PI < 3 (
  print 42
)
```

**Note**: We must also disable apply chains for conditions.

### missing `]` after element list

occurs when there is an error with the array initializer syntax somewhere.
Likely there is a closing square bracket (]) or a comma (,) missing

```ts
const list = [1, 2,
const y = 42; // not allowed
```

```ts
const list = [1, 2,
    (const y = 42; y)
] // allowed
```

### missing `)` after function body

occurs when there is a syntax mistake when creating a function somewhere. Check
if any closing curly braces or parenthesis are in the correct order.

```ts
function test() (
    if (test) (
        42
    ) else ( 42
)
```

### missing `=` in declaration

occurs when a declaration was not given a value in the same statement.

```ts
const TEXT;
```

### missing formal parameter

occurs when your function declaration is missing valid parameters.

```ts
function square(3) ()
function square("test") ()
function square({obj: "test"}) ()
```

### missing variable name

It is usually caused by omitting a variable name or a typographic error.

```ts
const = "foo";
```

### unexpected token

occur when the parser does not see a token it recognizes at the given position,
so it cannot make sense of the structure of the program. This might be a simple
typo.

```ts
entry1,entry2,; // expected expression, got ';'
[a,,] // expected expression, got ','
```

## TypeError

### numeric literal exceeds type bounds

occurs when a literal with a suffix overflows its annotated type variant.

```ts
0b111111111u8
3848u8
-42u16
3.999999999999999999999999999999999919f32
```

### cannot compare values of incompatible types

```ts
"hello" < 42;
true > "abc";
```

### "x" is not a function

occurs when there was an attempt to call a value from a function, but the value
is not actually a function.

```ts
const x = { test: 4 }.test();
```

### object/tuple property access on non-object

occurs when dot or bracket access is applied to non-object types.

```ts
const x = 42;
x.foo;
```

### cannot use value of type "void"

occurs when a void-typed function is used as an expression.

```ts
var x = print("hi") + 42;
```

### cannot read properties of void

occurs when there was an unexpected index/property access on a void value.

```ts
function y() ();
const x = y; // TDB
const x = void; // TDB
x.test()
```

**Note**: See runtime error "cannot dereference null". TBD.

### can't assign to property "x" on "y": not an object

occurs when attempting to create a property on value which cannot hold any
property.

```ts
const foo = "my text";
foo.bar = 5; // not allowed
```

### invalid assignment to const "x"

occurs when it was attempted to alter a constant value as const declarations
can't be re-assigned or redeclared.

```ts
const x = 42;
x = 69;
```

### incorrect arguments count

occurs when there is an error with how a function is called and incorrect count
of arguments were provided.

```ts
function test(a: integer/u8, b: text) ()
test(4)
test(4, "55", 2)
```

### argument of type "X" is not assignable to parameter of type "Y"

occurs when a function is called with an invalid typed parameter.

```ts
function test(a: integer/u8, b: text) ()

test("text", "test2")
test(42, 69)
```

### type "X" is not assignable to type "Y"

occurs when a assignment with incorrect types is made.

```ts
var x: text | integer = [1, 2];
```

### cannot reassign to immutable reference

```ts
var x = &69;
x = 42;
```

### RuntimeError

### maximum call stack size exceeded

```ts
function loop() (loop());
loop();
```

### division by zero

```ts
var x = 5 / 0;
```

### index out of bounds

_TBD_

```ts
[1, 2, 3][5];

[1, 2, 3][-5];

(1, 2, 3)[-2];
```

### cannot dereference null

```ts
var x = null;
x.test;
```

## MatchError

## incorrect type match

**TBD**

```ts
var x: integer = 42;
if x matches "a" | 5.5 () // shall we enforce that only integer and sub values of tpe integer can be matches here?
```

### non-exhaustive match

```ts
var x: 1 | 2 = 2;
match x (
  1 => "one",
)
```

### duplicate match arms

```ts
match x (
  1 => "a",
  1 => "b"
)
```

### unreachable match arm

```ts
match x (
  _ => "default",
  1 => "never reached"
)
```

## ModuleError

### cyclic module dependency

```ts
// a.dx
use b from "b.dx";

// b.dx
use a from "a.dx";
```

### module not found

```ts
use x from "nonexistent.dx";
```

### export of undeclared item

```ts
export x; // x is not defined
```

## FunctionError

### return type mismatch

occurs when the function returns a type not matching the declared return type.

```ts
function foo() -> text (
    42;
)
```

### missing return statement

occurs if one branch is lacking a return.

```ts
function getId() -> integer (
    if cond (
        return 42;
    )
    // missing return in other branch
)
```

**Note**: We can also use can not assign type void to type integer here.

### unreachable return

```ts
return 42;
return 69; // unreachable
```

# A5 Errors

## A5.1 ReferenceError

### A5.1.1 "x" is not defined

occurs when there is a non-existent variable referenced somewhere.

```ts
x + 5;
```

### A5.1.2 assignment to undeclared variable "x"

occurs when the value has been assigned to an undeclared variable. This happens
within any scope (global, module, function) when variables are accessed before
the place where they are declared is executed.

```ts
x = 42;
```

### A5.1.3 cannot use variable "x" in its own initializer

```ts
const x = x + 1;
```

### A5.1.4 can't access lexical declaration "x" before initialization

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

## A5.2 SyntaxError

### A5.2.1 "x" is a reserved identifier

occurs when reserved keywords are used as identifiers.

```ts
const type = 42;
```

### A5.2.2 ambiguous syntax, use parentheses to disambiguate

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

### A5.2.3 continue must be inside loop

occurs when a continue statement is not inside a loop statement.

```ts
continue;
```

### A5.2.4 duplicate formal argument "x"

occurs when a function creates two or more parameter bindings with the same
name.

```ts
function add(x, x) ()
```

### A5.2.5 function statement requires a name

occurs when there is a function statement in the code that requires a name.

```ts
function () (42)
```

**Note**: that we might have to distinguish function expressions from function
declarations, like `val x = function () ()` might be valid as expression.

### A5.2.6 identifier starts immediately after numeric literal

occurs when an identifier started with a digit. Identifiers can only start with
a letter, underscore (_), or dollar sign ($).

```ts
const 1life = "foo";
const foo = 1life;

1.toString() // TBD
1..toString() // TBD
```

### A5.2.7 illegal character

occurs when the lexer reads a character that's not part of a string literal, and
the character cannot constitute a valid token in the language.

```ts
“datex”; // ” != " 

42 – 13; // – != -

const foo = "bar"; // ; != ;
```

### A5.2.8 invalid assignment left-hand side

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

### A5.2.9 missing `:` after property key

occurs when objects or tuples are created using the initializer syntax. A colon
(:) separates keys and values for the object's properties. Somehow, this colon
is missing or misplaced.

```ts
const obj = { key = "value" }; // invalid
const obj = { (x = "value"): 4 }; // valid
const obj = { "b"+"ar": "foo" }; // TDB
```

### A5.2.10 missing `)` after condition

occurs when there is an error with how an if condition is written. It must
appear in parenthesis after the if keyword.

```ts
if (Math.PI < 3 (
  print 42
)
```

**Note**: We must also disable apply chains for conditions.

### A5.2.11 missing `]` after element list

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

### A5.2.12 missing `)` after function body

occurs when there is a syntax mistake when creating a function somewhere. Check
if any closing curly braces or parenthesis are in the correct order.

```ts
function test() (
    if (test) (
        42
    ) else ( 42
)
```

### A5.2.13 missing `=` in declaration

occurs when a declaration was not given a value in the same statement.

```ts
const TEXT;
```

### A5.2.14 missing formal parameter

occurs when your function declaration is missing valid parameters.

```ts
function square(3) ()
function square("test") ()
function square({obj: "test"}) ()
```

### A5.2.15 missing variable name

It is usually caused by omitting a variable name or a typographic error.

```ts
const = "foo";
```

### A5.2.16 unexpected token

occur when the parser does not see a token it recognizes at the given position,
so it cannot make sense of the structure of the program. This might be a simple
typo.

```ts
entry1,entry2,; // expected expression, got ';'
[a,,] // expected expression, got ','
```

## A5.3 TypeError

### A5.3.1 numeric literal exceeds type bounds

occurs when a literal with a suffix overflows its annotated type variant.

```ts
0b111111111u8
3848u8
-42u16
3.999999999999999999999999999999999919f32
```

### A5.3.2 cannot compare values of incompatible types

```ts
"hello" < 42;
true > "abc";
```

### A5.3.3 "x" is not a function

occurs when there was an attempt to call a value from a function, but the value
is not actually a function.

```ts
const x = { test: 4 }.test();
```

### A5.3.4 object/tuple property access on non-object

occurs when dot or bracket access is applied to non-object types.

```ts
const x = 42;
x.foo;
```

### A5.3.5 cannot use value of type "void"

occurs when a void-typed function is used as an expression.

```ts
var x = print("hi") + 42;
```

### A5.3.6 cannot read properties of void

occurs when there was an unexpected index/property access on a void value.

```ts
function y() ();
const x = y; // TDB
const x = void; // TDB
x.test()
```

**Note**: See runtime error "cannot dereference null". TBD.

### A5.3.7 can't assign to property "x" on "y": not an object

occurs when attempting to create a property on value which cannot hold any
property.

```ts
const foo = "my text";
foo.bar = 5; // not allowed
```

### A5.3.8 invalid assignment to const "x"

occurs when it was attempted to alter a constant value as const declarations
can't be re-assigned or redeclared.

```ts
const x = 42;
x = 69;
```

### A5.3.9 incorrect arguments count

occurs when there is an error with how a function is called and incorrect count
of arguments were provided.

```ts
function test(a: integer/u8, b: text) ()
test(4)
test(4, "55", 2)
```

### A5.3.10 argument of type "X" is not assignable to parameter of type "Y"

occurs when a function is called with an invalid typed parameter.

```ts
function test(a: integer/u8, b: text) ()

test("text", "test2")
test(42, 69)
```

### A5.3.11 type "X" is not assignable to type "Y"

occurs when a assignment with incorrect types is made.

```ts
var x: text | integer = [1, 2];
```

### A5.3.12 cannot reassign to immutable reference

```ts
var x = &69;
x = 42;
```

### A5.3.13 RuntimeError

### A5.3.14 maximum call stack size exceeded

```ts
function loop() (loop());
loop();
```

### A5.3.15 division by zero

```ts
var x = 5 / 0;
```

### A5.3.16 index out of bounds

_TBD_

```ts
[1, 2, 3][5];

[1, 2, 3][-5];

(1, 2, 3)[-2];
```

### A5.3.17 cannot dereference null

```ts
var x = null;
x.test;
```

## A5.4 MatchError

## A5.5 incorrect type match

**TBD**

```ts
var x: integer = 42;
if x matches "a" | 5.5 () // shall we enforce that only integer and sub values of tpe integer can be matches here?
```

### A5.5.1 non-exhaustive match

```ts
var x: 1 | 2 = 2;
match x (
  1 => "one",
)
```

### A5.5.2 duplicate match arms

```ts
match x (
  1 => "a",
  1 => "b"
)
```

### A5.5.3 unreachable match arm

```ts
match x (
  _ => "default",
  1 => "never reached"
)
```

## A5.6 ModuleError

### A5.6.1 cyclic module dependency

```ts
// a.dx
use b from "b.dx";

// b.dx
use a from "a.dx";
```

### A5.6.2 module not found

```ts
use x from "nonexistent.dx";
```

### A5.6.3 export of undeclared item

```ts
export x; // x is not defined
```

## A5.7 FunctionError

### A5.7.1 return type mismatch

occurs when the function returns a type not matching the declared return type.

```ts
function foo() -> text (
    42;
)
```

### A5.7.2 missing return statement

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

### A5.7.3 unreachable return

```ts
return 42;
return 69; // unreachable
```

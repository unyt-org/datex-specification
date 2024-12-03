# Introduction to DATEX Script

This section contains a non-normative overview of the DATEX Script language.
This is only an introduction containing the main aspects of the language. For an in-depth explanation of DATEX and the DATEX Script language, please refer to the [DATEX Documentation](https://docs.unyt.org/manual/datex).

## How DATEX works

DATEX is a realtime remote execution language based on a **REQUEST-RESPONSE** scheme. Every DATEX execution starts with a script that gets compiled to a DATEX **REQUEST** and is sent to an endpoint (which can also be yourself).<br>
The endpoint then executes the DATEX **REQUEST** and sends a **RESPONSE** back to the sender.<br>
The sender executes the received **RESPONSE** and returns the result.

The only part that will be important for now is writing the REQUEST Script.

## The mandatory "Hello World" script

To follow the tradition, we will first write a simple "Hello World" script in DATEX, which could look like this:
```datex
#public.std.print 'Hello World';
```

The `print` function is called with one parameter, a `'Hello World'` string.
Keep in mind that semicolons are required in DATEX script to separate statements, although they can be omitted after the last statement.
Strings can be created with either single or double quotes - we will come to the differences later.

To create a slightly more complex "Hello World" script and understand how DATEX gets executed, we can write the following script:

```datex
#public.std.print 'Executed on (#current), sent by (#sender)';
```

The output in the console will now tell you the name of the executing endpoint and the name of the endpoint that sent the REQUEST.
When running DATEX locally, those will both be the same.

## Just JSON

Of course, DATEX also supports several other types besides strings, from the common primitive types to complex objects.
DATEX is completely compatible with JSON, which means that every valid JSON is also valid DATEX.

Let's look at an example:

```datex
{
    "a_key": ["an", "array", "of", "strings"],
    "another_key": 77,
    "and_more": {
        "some_nesting": [
            1,
            true,
            null,
            -12.34
        ]
    }
}
```

In contrast to JSON, quotes around object keys can be omitted if the key does not contain whitespaces.
Trailing commas are also not a problem in DATEX script, they are simply ignored.

Besides the standard JSON types, DATEX also supports infinite values (`infinity` and `-infinity`) and `nan` (all written in lower case).<br>
DATEX distinguishes between integers (`77`) and floats (`-12.34`) - strictly speaking, there are also different types for various integer and float sizes, but we will ignore that for now.

You might have noticed that we didn't add a `#public.std.print` statement or anything else in our last example.
This is also an important feature of DATEX: values that are simply added to the root scope without an assignment or a function call are always assigned to the current *result*. 

This *result* value can be overridden with new values, but the last assigned value is sent back in the RESPONSE and returned.
This is why you can see the object logged in the console as a result.


## Let's add some variables

There are multiple ways to store values in DATEX.
Normal variables can be used to store a value temporarily until the end of the execution of the current scope.

A variable can be created without specifying a type - DATEX variables are have the type `any` per default.

There are 3 types of variables: dynamic variables (`var`), reference variables (`ref`), and value variables (`val`).

### Dynamic variables

Dynamic variables can be assigned to a value (with no bound pointer) or a reference (pointer or pointer property).
```datex
var my_var = 123;
my_var = "new value"; # change the value for 'my_var'
my_var = $$ [1,2,3];
```
### Reference variables

Reference variables always point to the initial reference that they were first assigned to. Non-pointer values are automatically converted to pointer references.

```datex
ref my_ref = {a:33,b:44};
my_ref = {a:5,b:23}; # changes the value of the pointer reference, allowed
my_ref $= {}; # changes the referenes, not allowed (throws an error)
```

### Value variables

Value variables never have a pointer reference. If a pointer is assigned to a value variable, the pointer value is copied to the variable, losing the reference.

```datex
ref ptr = 100;
val my_val = ptr;
my_val == ptr # true (same value)
my_val === ptr # false (not the identical reference)
```

## Useful commands

DATEX contains two different types of commands: **Runtime instructions** and **Compiler-evaluated commands**.
In DATEX Script you cannot distinguish  them, but it is good to know the difference between those two types:
 * Runtime instructions are actual binary instruction codes that are executed by the Runtime
 * Compiler-evaluated commands are pseudo-instructions that are converted to multiple Runtime instructions by the Compiler

A command can be a standalone command or it can be followed by one or multiple *effective values*.<p><info>
An *effective value* is either a value literal (e.g., a variable or `1`, `[1,2,3]`,...), a path chain (`x.y.z.0`), a cast value (`<text>12`), or a subscope (anything between to parentheses).
</info></p>

### Count

To get the numbers of elements in a value (e.g. array or object), the `count` command can be used.
It is followed by exactly one effective value and returns an integer:

```datex
count [1,1,1,1] # 4
```

### Conditional commands

Conditional blocks are created with `if`/`else if`/`else`. 

The `if` and `else if` commands must be followed by two effective values: One condition value and one "body".
The `else` command has to be followed only by a "body". The conditional commands can be chained together like in most programming languages:

```datex
val value = 100;

if (value > 0) (
    #public.std.print '(value) is positive'
) else if (value < 0) (
    #public.std.print '(value) is negative'
) else (
    #public.std.print '(value) is zero'
)
```

To check if a value is greater or less than `0`, we use the `<` and `>` operators, which return a boolean.
The `if`/`else if` command then checks whether the value on its right is `true` or `false` to decide if the "body" is executed.

Note that the "body" of the conditional block is enclosed in parentheses (not in curly braces as you might have expected) since it is an effective value - blocks delimited by curly braces like in other languges do not exist in DATEX.

If the condition or the body is a value literal, the parentheses can also be omitted:

```datex
val x = true;
if (x) (#public.std.print 'x is true');
```



### Loops

Let's extend our last example with a simple while-loop:

```datex
var array = [-1,2,-3,4,6,0,0,0,-6,-45,0]; # create an array with different integers
var i = 0; # set counter variable to 0

while (i < (count array)) ( # iterate until end of array is reached
    val value = array.(i); # get the ith element of the array
    
    if (value > 0) (
        #public.std.print '(value) is positive'
    ) else if (value < 0) (
        #public.std.print '(value) is negative'
    ) else (
        #public.std.print '(value) is zero'
    );
    i += 1;
);
```

This script contains multiple new aspects that we should take a closer look at:

* A dot is used to get the ith element of `array`. In this case the variable `i` is additionally put in parentheses - otherwise it would be automatically converted to a string by the Compiler.<br>
If you want to get an element at a specific index, you can also write a number without parentheses after the dot: `array.0`
* The `+=` operator is used to increment `i` by `1` in each iteration of the loop


There is also a simpler way to iterate over the array, using the `iterate` command:

```datex
iterate [-1,2,-3,4,6,0,0,0,-6,-45,0] (
    #public.std.print (
        if (#it > 0) '(#it) is positive'
        else if (#it < 0)  '(#it) is negative'
        else '(#it) is zero'   
    )
)
```

The internal variable `#it` holds the value of the current iteration value.

## More types!

The `type` command can be used to determine the type of a value:
```datex
var x = 10;
#public.std.print 'The type of (x) is (type x)';

var y = [];
#public.std.print 'The type of (y) is (type y)';

var z = {a:'b'};
#public.std.print 'The type of (z) is (type z)';
```

The type returned by the `type` command is a special DATEX value with the type "type".<br>
This special "type" value can also be used to cast values (more on this later).
It is written with angle brackets (e.g., `<integer>`) and will be used from now on to indicate types.

### Standard Library types

Besides the primitive types and the JSON types (Array and Object), the DATEX standard library contains many additional types, including:
* `<Set>`: A list of unique values
* `<Map>`: Holds key-value pairs, keys do not have to be strings (as it is the case in objects)
* `<Time>`: Holds a Unix-time value in milliseconds
* `<Tuple>`: A fixed-length array with fixed element types, has special use cases in DATEX
* `<Record>`: A non-extendable object with fixed element types, has special use cases in DATEX
* `<Datex>`: A compiled DATEX block
* `<Function>`: A compiled DATEX block that can be executed with parameters


## Type Casting

Type Casting plays an important role in DATEX because it is not only used for type casting (obviously), but also needed to create complex type values.

Let's take a look at an example: The `<std:Set>` or simply `<Set>`.

<info>**Type Namespaces**: DATEX Types can include a namespace followed by a colon (e.g. `<std:Set>` or `<mynamespace:MyType>`. The *std* namespace is the default namespace and can be omitted.</info>

A new `<Set>` can be created by casting an `<Array>` to a Set:

```datex
mySet = <Set>[1,2,3,4,4,4];
print 'mySet size: (count mySet)'; # is 4 (duplicate elements are removed)
```

An empty `<Set>` can also be created by casting from `void`:
```datex
<Set>();
```
<info>**void:** The void value is a special value in DATEX. It represents a non-existing value, but still counts as a value literal. This means that it can be used to call a function without parameters or to cast a type from nothing. An immediately closed subscope (`()`) has the same effect as the `void` value.</info>

Type casts can also be chained to apply multiple casts in a row. The casts are executed from right to left:

```datex
<text><decimal><integer>1.5 # returns "1.0"
```

In this case, the `<decimal>` value `1.5` is first cast to an integer, which results in `1`.<br>
Then the `<integer>` is cast back to a `<decimal>`, which results in the value `1.0`.<br>
Afterwards, `1.0` is cast to a `<text>`, resulting in `"1.0"`.

## To Function or not to Function

DATEX does not use "classical" functions. 
Functions in DATEX are more similar to anonymous functions or lambda functions in other programming languages.
They behave like any other value and can be assigned to variables or stored in arrays or objects.

Let's create a simple function and call it:

```datex
use print from #public.std;

var myFunc = function (a,b,c) (
    print 'I am a Function!';
    print 'a = (a)';
    print 'b = (b)';
    print 'c = (c)';
);

myFunc ('Ah','Be','Ce')
```

The function call is actually just an *apply operation* of the `('Ah','Be','Ce')` tuple on `myFunc`. 

<info>An *apply operation* is the default operation on a value if another value follows right after it without an operator (`+`, `>`, `&`, ...) inbetween. Apply operations are not only used for function calls, but also for example for type casting.</info>

The function body is executed in a separate scope. This scope is initialized with the passed parameters as variables.
The variables from the parent scope can also be accessed.

```datex
use (print) from #public.std;

val a = "A parent scope variable"; # create variable 'a' in the parent scope
val b = "Another parent scope variable"; # create variable 'b' in the parent scope

var myFunc = function (a) (
    print 'a = (a)'; # print parameter 'a'
    print 'b = (b)'; # print variable 'b' from the parent scope
);

myFunc("parameter a"); # call function with parameter 'a'
```



## Internal variables

Internal variables are used for special purposes without polluting the current variable scope.
They are accessed with a `#` followed by the name (e.g. `#this`).

Internal variables do not necessarily behave like "normal" variables. They might have another value for different subscopes and can be readonly.

There are several reserved internal variables, including:
 * `#this`: points to the parent object or to the parent/current *root* if no parent object exists; readonly!
 * `#root`: object containing all variables for the current scope
 * `#result`: The current result that gets sent back in the RESPONSE
 * `#meta`: contains additional information about the current scope (e.g. the sender and a timestamp)

You can also create new internal variables yourself, but this not recommended for normal use cases.


## The important part: Remote DATEX Execution

At this point, you (hopefully) understand the basics of the DATEX Script language. 
We will now introduce the unique feature of DATEX which is also essentially the main purpose of DATEX: Remote execution.

### DATEX Endpoints

To be able to execute DATEX on other devices, we first need to understand the addressing mechanism of DATEX.

In DATEX, each Runtime instance represents a unique `endpoint` with a unique identifier. 
Per default, this is a 12-byte *endpoint id*, which can be written in DATEX as `%0027CC264C9D937177FB2000`.

Endpoints can also publish an *alias* for their *id*, which is written as `@alias`.

There are more types of endpoints and more complex addressing schemes, but we will come back to this later.

### Remote Execution

To execute DATEX on another endpoint, you simply need to write the following:

```datex
@example :: 'Hello world';
```

Everything from the double colon up to the semicolon is now executed on `@example` and the result gets returned.
This is not very spectacular since you would get the same behaviour if you just return the `'Hello world'` string without the remote execution.

To see that this statement was actually executed on the remote endpoint, we can return the internal variable `#current`, which contains the endpoint that currently executes the script:

```datex
@example :: 'Executed on (#current)';
```

You will also probably experience a small delay until the result gets printed to the console due to the distance of the remote endpoint.

The result of the remote execution can be treated like any other value and for example be assigned to a variable:
```datex
remoteString = @example :: 'Executed on (#current)';
print remoteString;
```

You can also execute an entire subscope on a remote endpoint like this:
```datex
result = @example :: (
    x = 10;
    y = 100;
    x * y;
);
print result; # 1000
```


### Parallel Remote Execution

A remote execution target can also be a filter that contains multiple endpoints. In this case, the code block is executed simulataneously on all endpoints and the results from all endpoints are returned in a `<Map>`.

Another way to handle multiple results is forked execution, which is enabled by using a triple colon (`:::`) instead of a double colon. In this mode, the currently executed scope is forked for each incoming result and the scope execution continues in parallel for each endpoint result.

## Static Scopes a.k.a. libraries

DATEX can very easily be extended as needed. Besides custom types, you can also add *Static Scopes*, which are essentially records containing functions and other values. 

Static Scopes exist on an endpoint during its lifetime, not only during the execution of a scope.
They can provide an interface to native components.

You can import a Static Scope to the current scope with the `use` command:

```datex
use (Math:Math);

Math.sqrt(25); # 'Math' can now be accessed as a variable in the scope
```

Static Scopes can also be imported per default in every executed scope. This is the case for the *std* Static Scope, which contains the following variables:
 * `print`
 * `printf`
 * `printn`
 * `read`
 * `sleep`



## Pointers

In DATEX, pointers are values with a globally unique id by which they can be accessed from any endpoint that has the required permissions.

Per default, pointers can be accessed by anyone.
Pointer ids have a maximum size of 26 bytes. For shorter ids, the remaining bytes are set to 0.<br>
A pointer can be created by explicitly assigning a value to a specific pointer id, or by requesting an automatically generated pointer id from the runtime:
```datex
$ABCD = <Set>(1,2,3); # assigning the <Set> value to the pointer id $ABCD
$$ <Set>(4,5,6); # the pointer id for this value is created automatically at runtime
x = $$ [1,2,3]; # if the value is required afterwards, the pointer could for example be assigned to a variable (like any other value)
```
When a pointer value is sent over DATEX, it is always sent per reference (just the id is transmitted, not the actual value).
To get the value of a pointer, you need to use the `value` command:
```datex
y = $$ {a:2345467};
y, value y; # return y as a reference, and the value of y
```

Pointers can only be used for non-primitive values. This excludes values like `<text>`, `<integer>`, or `<boolean>`.


## Labels

To make access to pointers easier, labels can be assigned to a pointer. Labels are permanent and are not deleted after the scope is closed.

```
x = $$ ['a','b','c']; # create a pointer
#xLabel = x; # map a label to the pointer
#otherLabel = ['d','e','f']; # a pointer is automatically created for the value when it is assigned to a label
```

Generally, labels behave like normal variables, with the difference that the cannot be reassigned to another value.

## Referencing primitive values - pointer property references

For some use cases, it can be quite helpful to also have a reference to a primitive value like a string. 
Primitive values are immutable in DATEX, which means that a reference to a primitive value only makes sense as a reference to a property of a non-primitive value.
Any updates to that property will then be propagated.

To get such a reference value, the special `->` operator is used:

```datex
#x = {a:'a string that will be updated'}; # create a pointer / label
x = #x->a; # get the pointer property by reference
#x.a = "the new string"; # update the property on the pointer
print x; # x is also automatically updated
```


## Streaming

Besides 'normal' values, DATEX also supports continuous binary data streams.<br>
Streamable values (`<Stream>` or `<Buffer>` or `<text>`) can be redirected into values that implement `<StreamSink>` (for example functions or `<Stream>` values).<br>
Streams can be chained together and multiple values can be added in one stream operation:
```
x = "some text";
y = "more text";

print << x; # stream x to the print function (same effect as applying x to print)
print << x y "and more"; # stream multiple values to the print function
print << x << y << "and more"; # stream operators can also be used inbetween values, but are optional in this case
```

A `<Stream>` value can be used as an intermediate readable and writeable buffer:
```
myStream = <Stream>(); # create new <Stream>
printf << myStream; # redirect myStream to printf

myStream << "text" `abcdef`; # data gets redirected to printf
```



## Object extensions, inheritence and other weird stuff

In DATEX, there is no classical object oriented class hierarchy (like in Java) and also no prototype system (like in JavaScript).<br>
DATEX has *Extendable Objects*:
A object-like value can be extended with one or multiple other object-like values, which means that all properties of those objects are now also part of the extended object.

```datex
a = {a:'a value'};
b = {b:'b value', ...a}; # b now extends a

print ('b extends a: (b extends a)');

a.a = 4; # updating a.a
printf b; # b.a also holds the new value (4)

b.a = 2; # updating b.a
printf a; # a.a also holds the new value (2)
```

This mechanism can also be used for a 'class-inheritance-like' pattern.
Custom types can be restricted to a template object, which defines the structure for values of this type:
```datex
# define the template for <ext:Player>
template <ext:Player> {
    x: <decimal>,
    y: <decimal>
};

# create a new player
player = <ext:Player>();

# get the type
print ('player type: (type player)');

# does it implement the template for <ext:Player>?
print ('player implements <ext:Player>: (player implements <ext:Player>)');

player;
```

This template object can now also extend other template objects, to 'inherit' other types:
```datex
template <ext:Player2> {
    ...<ext:Player>.template,  # extend with template
    name: <text> # add additional properties
}

# create a new player
player2 = <ext:Player2>();

# get the type
print ('player2 type: (type player2)');

# does it implement the template for <ext:Player> and <ext:Player2>?
print ('player2 implements <ext:Player>: (player2 implements <ext:Player>)');
print ('player2 implements <ext:Player2>: (player2 implements <ext:Player2>)');

# player2 template extends <ext:Player>.template
print ('<ext:Player>.template extension: (
    (type player2).template extends <ext:Player>.template
)');

# player2 template does not extend <ext:Player2>.template! (template is the same)
print ('<ext:Player2>.template extension: (
    (type player2).template extends <ext:Player2>.template
)');

player2;
```

## Comparators

### Value comparators

The value comparators check if two values are equal, but not if they are identical:
```datex
1 == 1; # true
1 != 2; # true
[] == []; # true
{a:1,b:[]} == {a:1,b:[]}; # true
<Set>[1,1,1,2,3] == <Set>[3,2,1]; # true

{a:$$[1,2,3]} == {a:$$[1,2,3]}; # false, a has different pointers
```

### Identity comparators

Identity comparators return `true` if two values are the identical (e.g. have the same pointer reference).
Primitive values (that are not pointers!) are also identical.
```datex
1 === 1; # true
[] !== []; # true
x = y = $$ <Map>();
x === y; # true

```


## Transforms

The `transform` command creates a new primitive pointer from another value following a specific rule. This can either be a simple type cast or a transform instruction in form of a `<DatexBlock>`.<br>
The new primitive pointer gets updated when the original value is changed.
:

```
x = $$ 42;

y = transform x <text>; # type cast transform: y = $$ "42"
x += 8; # y is updated
z = transform y ()=>'value = (#this)';  # custom transform: z = $$ "value = 42"
x += 100; # y and z are updated
value x, value y, value z
```

<info>Current limitation in DATEX JS: in some cases, transform updates happen asynchronously and it is not guaranteed that all new transformed value are immediately available after the value change of the root value.</info>

To be continued...

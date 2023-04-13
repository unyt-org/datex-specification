# Instructions

## IMPLEMENTS
### Parameters
* Effective Value Parameter `[0]`: The following types are allowed: `<Type>`, `<Composite(<Type>)>`
* Effective Value Parameter `[1]`: The following types are allowed: `<Type>`, `<Composite(<Type>)>`

### Return value
The IMPLEMENTS instruction returns a value of type `<boolean>`.

### Description
In the following, 'type' refers to a value of type `<Type>` or `<Composite(<Type>)>`.

The IMPLEMENTS instruction checks if a type or its *root type* extends or implements another type.

### Procedure
1. Validate parameter types
2. If `[1]` is `<Any>`, set `[[ACTIVE_VALUE]]` to `true`. Finish.
3. If `[1].[[TYPE]]` is `<Type>` and `[0].[[TYPE]]` is `<Type>`:
   1. If `[0].[[IMPLEMENTED]]` has `[1]`, set `[[ACTIVE_VALUE]]` to `true`. Finish.
   2. If `[0].[[EXTENDED]]` has `[1]`, set `[[ACTIVE_VALUE]]` to `true`. Finish.
   3. If `[0].[[ROOT]].[[IMPLEMENTED]]` has `[1]`, set `[[ACTIVE_VALUE]]` to `true`. Finish.
   4. If `[0].[[ROOT]].[[EXTENDED]]` has `[1]`, set `[[ACTIVE_VALUE]]` to `true`. Finish.
   5. Set `[[ACTIVE_VALUE]]` to `false`. Finish.
4. If `[1].[[TYPE]]` is `<Composite(<Type>)>` and `[0].[[TYPE]]` is `<Type>`:
   1. TODO

### Datex Script mapping

The `implements` keyword is mapped to the IMPLEMENTS instruction.
The keyword must be preceeded by one effective value and succeeded by one effective value:
```datex
A implements B
```
A corresponds to `[0]`. B corresponds to `[1]`. 
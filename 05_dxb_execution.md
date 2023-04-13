# DATEX Execution

## Runtime Environments

A DATEX Runtime Environment has to take care of sequential execution of incoming instructions, handling of encrpytion, permissions, variables and pointers. Furthermore, it must have a DXB generator to automatically generate response and synchronization messages.

A full DATEX Compiler is not required for a Runtime.

A Runtime Environment can also provide an interface to the host system (e.g. to manipulate a UI, access a database, or communicate with peripherals)


## Sandboxed Execution

Since arbitrary DATEX binary code can be executed from other directly or indirectly connected endpoints ("remote endpoints"), the Runtime has to provide a sandboxed environment in which the access to pointers and static scopes it restricted depending on the permissions of the remote endpoint.

Per default, a remote endpoint should not be allowed to execute instructions on a third party endpoint, because it could impersonate the intermediate endpoint that way.

<br>

## Internal Slots

Each scope has a number of memory locations to store values that are relevant for the scope execution process.
Some internal slots are directly accessible in the scope as internal variables (e.g. `#result`, `#this`). Internal variables can be readonly. 
### List of internal slots:

* `[[ACTIVE_VALUE]]`
* `[[LAST_VALUE]]`
* `[[PROC_RESULT]]`
* `[[OPERATOR]]`
* `[[INSERT_LOCATION]]`
* `[[SCOPE_RESULT]]`
* `[[RESULT]]`
* `[[INDEX]]`
* `[[INSTRUCTION_CODE]]`
* `[[INSTRUCTIONN]]`
* `[[THIS]]`
* `[[ROOT]]`

<br>

## General procedure for instruction processing

1. <b>READ THE INSTRUCTION</b>
   * Store the Instruction Code in `[[INSTRUCTION_CODE]]`
   * Store the remaining instruction data in `[[INSTRUCTIONN]]` (length depends on the Instruction Code, can also be 0)

2. <b>EXECUTE THE INSTRUCTION</b>
   * Run the custom instruction procedure depending on `[[INSTRUCTION_CODE]]`
   * Move `[[ACTIVE_VALUE]]` to `[[LAST_VALUE]]`
   * Add the result of the instruction procedure (`[[PROC_RESULT]]`) to `[[ACTIVE_VALUE]]`

3. <b>APPLY IN CONTEXT</b>
   * If `[[OPERATOR]]` is set, apply the operator to `[[LAST_VALUE]]` and `[[ACTIVE_VALUE]]` and store the result in `[[ACTIVE_VALUE]]`; clear `[[OPERATOR]]`
   * Else apply `[[ACTIVE_VALUE]]` directly to `[[LAST_VALUE]]` and store the result in `[[ACTIVE_VALUE]]`

4. <b>INSERT THE VALUE</b>
   * If `[[INSERT_LOCATION]]` is set, insert `[[ACTIVE_VALUE]]` at `[[INSERT_LOCATION]]`
   * Else store the `[[ACTIVE_VALUE]]` in `[[SCOPE_RESULT]]`
   
<br>

## Statements

The `CLOSE_AND_STORE` Instruction is used to separate groups of Instructions ("Statements").

The `[[ACTIVE_VALUE]]` is stored in `[[SCOPE_RESULT]]`.
`[[ACTIVE_VALUE]]`, `[[LAST_VALUE]]`, `[[OPERATOR]]`, and `[[INSERT_LOCATION]]` are cleared.


<br>

## Instruction-specific procedures

### JMP
1. Set `[[INDEX]]` to `[INDEX]`
2. Stop instruction processing

### JTR
1. If `[[ACTIVE_VALUE]]` is `true`, Set `[[INDEX]]` TO `[INDEX]`
2. Stop instruction processing

### COUNT
1. If `[[ACTIVE_VALUE]]` is primitive, set `[[PROC_RESULT]]` to `1`

...
# 5 DATEX Execution

## 5.1 Runtime Environments

A DATEX Runtime Environment has to take care of sequential execution of incoming instructions, handling of encrpytion, permissions, variables and pointers. Furthermore, it must have a DXB generator to automatically generate response and synchronization messages.

A full DATEX Compiler is not required for a Runtime.

A Runtime Environment can also provide an interface to the host system (e.g. to manipulate a UI, access a database, or communicate with peripherals)


## 5.2 Sandboxed Execution

Since arbitrary DATEX binary code can be executed from other directly or indirectly connected endpoints ("remote endpoints"), the Runtime has to provide a sandboxed environment in which the access to pointers and static scopes it restricted depending on the permissions of the remote endpoint.

Per default, a remote endpoint should not be allowed to execute instructions on a third party endpoint, because it could impersonate the intermediate endpoint that way.

<br>

## 5.3 Internal Slots

Each scope has a number of memory locations to store values that are relevant for the scope execution process.
Some internal slots are directly accessible in the scope as internal variables (e.g. `#result`, `#this`). Internal variables can be readonly. 
### 5.3.1 List of internal slots:

<!--todo: which slots are for scopes/sub scopes-->
* `[[ACTIVE_VALUE]]`
* `[[LAST_VALUE]]`
* `[[PROC_RESULT]]`
* `[[OPERATOR]]`
* `[[INSERT_LOCATION]]`
* `[[SCOPE_RESULT]]`
* `[[RESULT]]`
* `[[INDEX]]`
* `[[INSTRUCTION_CODE]]`
* `[[INSTRUCTION]]`
* `[[THIS]]`
* `[[ROOT]]`

<br>

## 5.4 General procedure for instruction processing

1. <b>READ THE INSTRUCTION</b>
   * Store the Instruction Code in `[[INSTRUCTION_CODE]]`
   * Store the remaining instruction data in `[[INSTRUCTION]]` (length depends on the Instruction Code, can also be 0)

2. <b>EXECUTE THE INSTRUCTION</b>
   * Validate the parameter types depending on the `[[INSTRUCTION_CODE]]`
   * Run the custom instruction procedure depending on `[[INSTRUCTION_CODE]]`
   * Move `[[ACTIVE_VALUE]]` to `[[LAST_VALUE]]`
   * Move the return value of the instruction procedure (`[[PROC_RESULT]]`) to `[[ACTIVE_VALUE]]`

3. <b>APPLY IN CONTEXT</b>
   * If `[[OPERATOR]]` is set, apply the operator to `[[LAST_VALUE]]` and `[[ACTIVE_VALUE]]` and store the result value in `[[ACTIVE_VALUE]]`; clear `[[OPERATOR]]`
   * Else apply `[[ACTIVE_VALUE]]` directly to `[[LAST_VALUE]]` and store the result in `[[ACTIVE_VALUE]]`

4. <b>INSERT THE VALUE</b>
   * If `[[INSERT_LOCATION]]` is set, insert `[[ACTIVE_VALUE]]` at `[[INSERT_LOCATION]]`
   <!--todo?: remove* Else store the `[[ACTIVE_VALUE]]` in `[[SCOPE_RESULT]]`-->


<br>


## 5.5 Statements

The `CLOSE_AND_STORE` Instruction is used to separate groups of Instructions ("Statements").

The `[[ACTIVE_VALUE]]` is stored in `[[SCOPE_RESULT]]`.
`[[ACTIVE_VALUE]]`, `[[LAST_VALUE]]`, `[[OPERATOR]]`, and `[[INSERT_LOCATION]]` are cleared.


<br>

## 5.6 Global Runtime data
* global: [`Runtime.Global`](./300_data_structures.md#runtimeglobal)
* The `scope` keyword acts as context of the current scope ([`Runtime.Scope`](./300_data_structures.md#runtimeglobal)).

## 5.7 General Runtime procedures

### 5.7.1 runtimeExecution
```typescript
function runtimeExecution(scope: Runtime.Scope, global: Runtime.Global):

   while scope.byteIndex < len(scope.executable):
      (instructionCode, scope.byteIndex) <- extractUint32(
         scope.executable,
         scope.byteIndex
      )
      instrDefinition <- global.instructionDefinitions[instructionCode]

      if len(scope.executable) - scope.byteIndex < 
         instrDefinition.minimumSize:
         scope.byteIndex <- scope.byteIndex - 2
         return

      data <- scope.executable[scope.byteIndex..len(scope.executable)]

      if instrDefinition.validation and
         not instrDefinition.validation(data)
            scope.byteIndex <- scope.byteIndex - 2
            return

      result <- instrDefinition.procedure(data as Instruction.*)
      
      scope.lastValue <- scope.activeValue
      scope.activeValue <- result

      if scope.operator:
         scope.activeValue <- applyOperator(scope.operator, scope.lastValue, scope.activeValue) // TODO
         scope.operator <- void
      else:
         scope.activeValue <- apply(scope.lastValue, scope.activeValue) // TODO

      if scope.insertLocation:
         insert(scope.insertLocation, scope.activeValue) // TODO
         scope.insertLocation <- void



```
### 5.7.2 newSubScope
```typescript
function newSubScope(scope: Runtime.Scope)
   // TODO add new subscope to heap
   scope.subscopes += Runtime.Subscope {

   }
```


## 5.8 Instruction-specific procedures

### 5.8.1 COUNT
1. If `[[ACTIVE_VALUE]]` is primitive, set `[[PROC_RESULT]]` to `1`

...
# Terms and Definitions


## primitive value
A value of the type `<void>`, `<null>`, `<boolean>`, `<integer>`, `<decimal>`, `<text>`, `<buffer>` or any variation of those types.

## DXB
Refers to the DATEX Binary Format in general, or to a particular DATEX block.

## script
A text containing human-readable DATEX Syntax. A script can be compiled to DXB.

## block
A self-contained executable DATEX Binary sent from one endpoint to another endpoint. 

## message
A sequence of DATEX instructions distributed over one ore more blocks.

## scope
The set of variables that exist during the exeuction of a message. A scope exists until the message is completely executed.

## static scope
A scope which is always available in a Runtime and can be accessed from any message scope.
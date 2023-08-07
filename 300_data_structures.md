# Data Structures


## Runtime

## Runtime.DXBRouterHeaderData
```rust
Runtime.DXBRouterHeaderData {
	version: Uint8
	ttl: Uint8

	optional sender: Datex.Endpoint
	receivers: Datex.Endpoint[] | Datex.Logical<Datex.Endpoint>

	creationTimestamp: Datex.Time
	expirationTimestamp: Datex.Time

	blockSize: Uint32
}
```

### Runtime.DXBValidatedBlock
```rust
Runtime.DXBValidatedBlock {
	routingData: DXBRouterHeaderData

	isSigned: boolean
	isEncrypted: boolean

	scopeId: Uint32
	blockIndex: Uint16
	blockSubIndex: Uint16

	blockType: BlockType
	allowExecute: boolean
	endOfBlock: boolean
	endOfScope: boolean
	optional representedBy: Datex.Endpoint
	optional onBehalfOf: Datex.Endpoint
	deviceType: DeviceType

	body: DXBInstruction[]
}
```
### Runtime.Global: 
```rust
Runtime.Global {
	RESULT: any
	INDEX: Uint64
	THIS: any
	ROOT: any
}
```

### Runtime.Scope: 
```rust
Runtime.Scope {
	ACTIVE_VALUE: any
	LAST_VALUE: any
	PROC_RESULT: any
	OPERATOR: InstructionCode
	INSERT_LOCATION: any
	SCOPE_RESULT: any
	INSTRUCTION_CODE: any
	INSTRUCTION: any
}
```

## Datex

### Datex.Endpoint
```rust
Datex.Endpoint {
	type: Uint8
	id: Uint8[18]
	instance: Uint16
}
```

### Datex.Value
```rust
Datex.Value {
	type: Datex.Type
	value: any
}
```

### Datex.Text
```rust
Datex.Text {
	length: Uint32
	content: Uint8[length]
}
```

## Protocol

### Protocol.Endpoint
```rust
Protocol.Endpoint {
	TYPE: Uint8
	ID: Uint8[18]
	INSTANCE: Uint16
}
```

### Protocol.PointerId
```rust
Protocol.PointerId {
	TYPE: Uint8
	IDENTIFIER: Uint8[18]
	INSTANCE: Uint16
	TIMESTAMP: Uint32 // unix ts in seconds, starting from 25. Juli 23
	COUNTER: Uint8
}
```

### Protocol.ReceiverEndpoint
```rust
Protocol.ReceiverEndpoint {
	ENDPOINT: Protocol.Endpoint
	optional KEY: Uint8[512] // only if Receivers.FLAGS.ENDPOINTS_HAVE_KEYS
}
```

### Protocol.ReceiverEndpoints
```rust
Protocol.ReceiverEndpoints {
	COUNT: Uint16 # if MAX, flood, no RECEIVERS
	ENDPOINTS: Protocol.ReceiverEndpoint[COUNT]
}
```

### Protocol.Receivers
```rust
Protocol.Receivers {
	FLAGS: Uint8
		HAS_POINTER_ID:           FLAGS & 0b00000001,
		HAS_ENDPOINTS:            FLAGS & 0b00000010,
		ENDPOINTS_HAVE_KEYS:      FLAGS & 0b00000100
	optional POINTER_ID: Protocol.PointerId
	optional ENDPOINTS: Protocol.ReceiverEndpoints
}
```

### Protocol.RoutingHeader
```rust
Protocol.RoutingHeader {
	MAGIC_NUMBER: Uint16 {0x01, 0x64},
	VERSION: Uint8,
	TTL: Uint8,
	FLAGS: Uint8
		HAS_UNENCRYPTED_SIGNATURE: FLAGS & 0b00000001,
		HAS_ENCRYPTION:            FLAGS & 0b00000010,
		HAS_ENCRYPTED_SIGNATURE:   FLAGS & 0b00000100,
		IS_LARGE_SIZE:             FLAGS & 0b00001000
	BLOCK_SIZE: IS_LARGE_SIZE ? Uint32 : Uint16,

	SCOPE_ID: Uint32
	BLOCK_INDEX: Uint16
	BLOCK_SUB_INDEX: Uint16

	SENDER_TYPE: Uint8,
	optional SENDER: Uint8[20] // only exists if SENDER_TYPE != 255, otherwise SENDER is @@any
	optional RECEIVERS: Protocol.Receivers
}
```

### Protocol.BlockHeader
```rust
Protocol.BlockHeader {
	
	FLAGS: Uint21
		BLOCK_TYPE:    FLAGS & 0b111100000000000000000,
		ALLOW_EXECUTE: FLAGS & 0b000010000000000000000,
		END_OF_BLOCK:  FLAGS & 0b000001000000000000000, // if a subdivided block has only a single signature, it is sent with the last block containing the END_OF_BLOCK flag
		END_OF_SCOPE:  FLAGS & 0b000000100000000000000,
		HAS_EXPIRATION_TIMESTAMP:   FLAGS & 0b000000010000000000000,
		HAS_ON_BEHALF_OF:           FLAGS & 0b000000001000000000000,
		HAS_REPRESENTED_BY:         FLAGS & 0b000000000100000000000,
		IS_COMPRESSED:              FLAGS & 0b000000000010000000000,
		_RESERVED_:    FLAGS & 0b000000000001111111111,
	CREATION_TIMESTAMP: Uint43, // unix ts in ms, starting from 25. Juli 23
	optional EXPIRATION_OFFSET: Uint32, // unix ts in seconds, starting from CREATION_TIMESTAMP
	optional REPRESENTED_BY: Protocol.Endpoint
	optional IV: Uint8[16]
}
```

### Protocol.DXB
```rust
Protocol.DXB {
	ROUTING_HEADER: Protocol.RoutingHeader,
	optional UNENCRYPTED_SIGNATURE: Uint8[192],
	optional ENCRYPTED_SIGNATURE: Uint[x] // used instead SIGNATURE to hide identity of signing endpoint (when using ON_BEHALF_OF)
	// optional start signed part:
	optional BLOCK_HEADER: Protocol.BlockHeader
	// optional start encrypted part:
	ENCRYPTED_FLAGS: Uint8
		DEVICE_TYPE: ENCRYPTED_FLAGS & 0b11110000
	optional ON_BEHALF_OF: Protocol.Endpoint,
	BODY: Uint8[] // array of instructions, might be split over multiple blocks -> combined to Protocol.Body
}
```

### Protocol.Body
```rust
Protocol.Body {
	INSTRUCTIONS: Protocol.DXBInstruction[]
}
```

### Protocol.DXBInstruction
```rust
Protocol.DXBInstruction 
{
	INSTRUCTION_CODE: InstructionCode.IMPLEMENTS
}
|
{
	INSTRUCTION_CODE: InstructionCode.JUMP
	DATA: Instruction.Jump
}
|
{
	INSTRUCTION_CODE: InstructionCode.ENDPOINT
	DATA: Instruction.Endpoint
}

```

## Instruction

### Instruction.Endpoint
```rust
Instruction.Endpoint {
	TYPE: Uint8
	ID: Uint8[18]
	INSTANCE: Uint16
}
```

### Instruction.Jump
```rust
Instruction.Jump {
	INDEX: Uint32
}
```

<!-- TODO: general explainer on how to parse structs with dynamic length fields -->

### Instruction.Text
```rust
Instruction.Text {
	LENGTH: Uint32
	CONTENT: Uint8[LENGTH]
}
```





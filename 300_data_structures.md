# Data Structures


## Runtime

## Runtime.InstructionDefinition
```rust
Runtime.InstructionDefinition {
	minimumSize: Uint8,
	optional maximumSize: UintXXX, // TODO
	optional validation: (data: Uint8[]) -> boolean,
	procedure: (Instruction.*) -> any
}
```

## Runtime.DXBRoutingHeaderData
```rust
Runtime.DXBRoutingHeaderData {
	version: Uint8
	ttl: Uint8

	optional sender: Datex.Endpoint
	receivers: Map<Datex.Endpoint[], Uint8[]>
	optional pointerId: Protocol.PointerId,

	creationTimestamp: Datex.Time
	expirationTimestamp: Datex.Time

	blockSize: Uint32
}
```

### Runtime.DXBBlock
```rust
Runtime.DXBBlock {
	activeBoundA: Uint16, // subblock to be executed next
	activeBoundB: Uint16, // latest received subblock
	lastSubBlockReceived: boolean,

	subBlocks: Map<Uint16, Runtime.DXBUnresolvedSubBlock>
	
	headerData: DXBBlockHeaderData
}

### Runtime.DXBBlockHeaderData
```rust
Runtime.DXBBlockHeaderData {
	routingData: DXBRoutingHeaderData

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
}
```

### Runtime.DXBUnresolvedSubBlock
```rust
Runtime.DXBUnresolvedSubBlock {
	headerData: Runtime.DXBBlockHeaderData,
	optional signature: Uint8[],
	optional iv: Uint8[16],
	data: Uint8[]
}
```

### Runtime.Global: 
```rust
Runtime.Global {
	instructionDefinitions: Map<InstructionCode, Runtime.InstructionDefinition>
	scopes: Map<Datex.Endpoint, Map<Uint32, Runtime.Scope>>,
	endpoint: Datex.Endpoint,
	version: ...
	... <!-- TODO -->
}
```

### Runtime.Scope: 
```rust
Runtime.Scope {
	headerData: DXBBlockHeaderData, // first block's header data
	activeBoundA: Uint16, // block to be executed next
	activeBoundB: Uint16, // latest received block
	lastBlockReceived: boolean,
	result: any
	byteIndex: Uint64
	this: any
	root: any,
	blocks: Map<Uint32, Runtime.DXBBlock>, // <block id, block>
	subscopes: Runtime.Subscope[],
	executable: Uint8[]
}
```

### Runtime.Subscope: 
```rust
Runtime.Subscope {
	activeValue: any
	lastValue: any
	procResult: any
	operator: InstructionCode
	insertLocation: any
	scopeResult: any
	instructionCode: InstructionCode // TODO remove?
	instruction: Protocol.DXBInstruction
}
```

## Datex

### Datex.Endpoint
```rust
Datex.Endpoint {
	type: Uint8,
	id: Uint8[18],
	instance: Uint16,
	optional signaturePrivateKey: Uint8[],
	signaturePublicKey: Uint8[],
	optional encryptionPrivateKey: Uint8[],
	encryptionPublicKey: Uint8[]
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
		HAS_EXPIRATION_OFFSET:   FLAGS & 0b000000010000000000000,
		HAS_REPRESENTED_BY:         FLAGS & 0b000000001000000000000,
		IS_COMPRESSED:              FLAGS & 0b000000000100000000000,
		IS_SIGNATURE_IN_LAST_SUBBLOCK:       FLAGS & 0b000000000010000000000 // if this bit is set the signature is present in the last sub block. All previous subblocks combined must be verified against this signature
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
		HAS_ON_BEHALF_OF: ENCRYPTED_FLAGS & 0b00001000,
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





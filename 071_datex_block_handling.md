# DATEX Block Handling


```

enum BlockType {
	
}

enum DeviceType {

}

DXBInstruction {
	instructionCode: Uint8
	data: Uint8[]
}

DXBRouterHeaderData {
	version: Uint8,
	ttl: Uint8,

	optional sender: Datex.Endpoint
	receivers: Datex.Endpoint[] | Datex.Logical<Datex.Endpoint>

	creationTimestamp: Datex.Time
	expirationTimestamp: Datex.Time

	blockSize: Uint32
}

DXBValidatedBlock {
	routingData: DXBRouterHeaderData,

	isSigned: boolean,
	isEncrypted: boolean,

	scopeId: Uint32,
	blockIndex: Uint16,
	blockSubIndex: Uint16,

	blockType: BlockType
	allowExecute: boolean
	endOfBlock: boolean
	endOfScope: boolean
	optional representedBy: Datex.Endpoint
	optional onBehalfOf: Datex.Endpoint
	deviceType: DeviceType,

	body: DXBInstruction[]
}

```


```typescript
abstract function dxbOut (dxb: DXB)

function getUint16(data: Uint8[], i: Uint8):
	return dxb[i] + dxb[i+1] * 0xff
function extractUint16(buffer: Uint8[], i: Uint8):
	return (getUint16(buffer, i), i+2)

function getUint64(data: Uint8[], i: Uint8):
	return 
		dxb[i] + 
		dxb[i+1] * 0xff +
		dxb[i+2] * 0xffff +
		dxb[i+3] * 0xffffff +
		dxb[i+4] * 0xffffffff +
		dxb[i+5] * 0xffffffffff +
		dxb[i+6] * 0xffffffffffff +
		dxb[i+7] * 0xffffffffffffff
function extractUint64(buffer: Uint8[], i: Uint8):
	return (getUint64(buffer, i), i+8)

function getUint32(data: Uint8[], i: Uint8):
	return 
		dxb[i] + 
		dxb[i+1] * 0xff +
		dxb[i+2] * 0xffff +
		dxb[i+3] * 0xffffff
function extractUint32(buffer: Uint8[], i: Uint8):
	return (getUint32(buffer, i), i+4)


function getSlice(data: Uint8[], i: Uint8, length: Uint8):
	return data[i..i+length]
function extractSlice(buffer: Uint8[], i: Uint8, length: Uint8):
	return (getSlice(buffer, i, length), i+length)


function extractReceivers(buffer: Uint8[], i: Uint8):

	flags <- buffer[i++]
	hasPointerId: boolean <- flags & 0b00000001
	hasEndpoints: boolean <- flags & 0b00000010
	endpointsHaveKeys: boolean <- flags & 0b00000100

	receivers <- Map<Datex.Endpoint, Uint8[]>

	if hasPointerId:
		(pointerId,i ) <- extractSlice(buffer, i, 26)
	if hasEndpoints:
		(count, i) <- extractUint16(buffer, i)
		for c in 0..count:
			(receiver, i) <- extractEndpoint(buffer,i )
			if endpointsHaveKeys:
				(encryptedKey, i) <- extractSlice(buffer, i, 512)
				receivers.set(receiver, encryptedKey)
			else 
				receivers.set(receiver, null)

	return (receivers, i)

function parseEndpoint(data: Uint8[]):
	i <- 0
	return Datex.Endpoint {
		type: data[i++],
		id: getSlice(buffer, i, 18),
		instance: getUint16(buffer, i+18)
	}

function extractEndpoint(buffer: Uint8[], i: Uint8):
	(slice, i) <- getSlice(buffer, i, 21) 
	return (parseEndpoint(slice), i)

function extractDXBRouterHeaderData(dxb: DXB)
	i <- 0;
	if not (dxb[i++] = 0x01 and dxb[i++] = 0x64):
		return

	version <- dxb[i++]
	ttl <- dxb[i++]
	flags <- dxb[i++]
	isLargeSize: boolean <- flags & 0b00001000
	hasUnencryptedSignature: boolean <- flags & 0b00000001
	hasEncryptedSignature: boolean <- flags & 0b00000100

	blockSize: Uint31
	if isLargeSize:
		(blockSize, i) <- extractUint16(dxb, i)
	else:
		blockSize <- dxb[i++]
	
	i <- i + 8

	senderType <- dxb[i]

	if senderType != 255:
		(sender, i) <- extractEndpoint(dxb, i)
	else:
		i <- i + 1

	(receivers, i) <- extractReceivers(dxb, i)

	if hasEncryptedSignature:
		i <- i + 192
	else if hasUnencryptedSignature:
		i <- i + x // TODO

	(flagsAndCreationTimestamp, i) <- extractUint64(dxb, i)
	creationTimestampMs: Uint64 <- flagsAndCreationTimestamp & 0x7ffffffffff
	(expirationOffset, i) <- extractUint32(dxb, i)

	creationTimestamp <- Datex.Time.fromMilliseconds (creationTimestampMs)
	expirationTimestamp <- Datex.Time.fromMilliseconds (creationTimestampMs + expirationOffset*1000)

	return DXBRouterHeaderData {
		version,
		ttl,

		sender,
		receivers: receivers.keys(),

		creationTimestamp,
		expirationTimestamp,

		blockSize
	}

function dxbIn (
	dxb: DXB
)
	
	

``````
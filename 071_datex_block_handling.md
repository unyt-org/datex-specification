# DATEX Block Handling

```typescript
abstract function dxbOut (dxb: Protocol.DXB)
```

```typescript
function extractReceivers(buffer: Uint8[], i: Uint8):

	flags <- buffer[i++]
	hasPointerId: boolean <- flags & 0b00000001
	hasEndpoints: boolean <- flags & 0b00000010
	endpointsHaveKeys: boolean <- flags & 0b00000100

	receivers <- Map<Datex.Endpoint, Uint8[]>

	if hasPointerId:
		(pointerId,i) <- extractSlice(buffer, i, 26)

	if hasEndpoints:
		(count, i) <- extractUint16(buffer, i)
		for c in 0..count:
			(receiver, i) <- extractEndpoint(buffer,i )
			if endpointsHaveKeys:
				(encryptedKey, i) <- extractSlice(buffer, i, 512)
				receivers.set(receiver, encryptedKey)
			else 
				receivers.set(receiver, null)

	return (receivers, pointerId, i)
```

```typescript
function parseEndpoint(data: Uint8[]):
	i <- 0
	return Datex.Endpoint {
		type: data[i++],
		id: getSlice(buffer, i, 18),
		instance: getUint16(buffer, i+18)
	}
```

```typescript
function extractEndpoint(buffer: Uint8[], i: Uint8):
	(slice, i) <- getSlice(buffer, i, 21)
	return (parseEndpoint(slice), i)
```

```typescript
function extractDXBRoutingHeaderData(dxb: Protocol.DXB)
	i <- 0;
	if not (dxb[i++] = 0x01 and dxb[i++] = 0x64):
		return

	version <- dxb[i++]
	ttl <- dxb[i++]
	routingHeaderFlags <- dxb[i++]
	isLargeSize: boolean <- routingHeaderFlags & 0b00001000
	hasUnencryptedSignature: boolean <- routingHeaderFlags & 0b00000001
	hasEncryptedSignature: boolean <- routingHeaderFlags & 0b00000100

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

	(receivers, pointerId, i) <- extractReceivers(dxb, i)

	if hasEncryptedSignature:
		i <- i + 192
	else if hasUnencryptedSignature:
		i <- i + x // TODO

	(blockHeaderFlagsAndCreationTimestamp, i) <- extractUint64(dxb, i)
	creationTimestampMs: Uint64 <- blockHeaderFlagsAndCreationTimestamp & 0x7ffffffffff

	blockHeaderFlags <- blockHeaderFlagsAndCreationTimestamp >> 43
	(expirationOffset, i) <- extractUint32(dxb, i)

	creationTimestamp <- Datex.Time.fromMilliseconds (creationTimestampMs)

	hasExpirationOffset <- blockHeaderFlags & 0b000000010000000000000

	size <- i - 8
	if hasExpirationOffset:
		expirationTimestamp <- Datex.Time.fromMilliseconds (creationTimestampMs + expirationOffset*1000)
		size <- size - 4
	
	return Protocol.DXBRoutingHeaderData {
		size,
		version,
		ttl,
		flags: routingHeaderFlags,

		sender,
		receivers,
		pointerId,

		creationTimestamp,
		expirationTimestamp,

		blockSize
	}
```

```typescript
function decryptSignature(signature: Uint8[], sender: Datex.Endpoint, global: Runtime.Global):
	// TODO 

```

```typescript
function parseUnresolvedDXBSubBlock(
	dxb: Protocol.DXB,
	routingHeaderData: Protocol.DXBRoutingHeaderData,
	global: Runtime.Global
):
	i <- routingHeaderData.size

	routingHeaderFlags <- routingHeaderData.flags

	hasUnencryptedSignature <- routingHeaderFlags & 0b00000001
	hasEncryption <- routingHeaderFlags & 0b00000010
	hasEncryptedSignature <- routingHeaderFlags & 0b00000100

	if hasEncryptedSignature:
		(encryptedSignature, i) <- getSlice(dxb, i, X)
		unencryptedSignature = decryptSignature(
			encryptedSignature,
			routingHeaderData.sender,
			global
		)
	else if hasUnencryptedSignature:
		(unencryptedSignature, i) <- getSlice(dxb, i, 192)

	data <- dxb[i..len(dxb)] // optional signed part starting with block header, flags, onbehalfof and body

	(flags, i) <- extractUint64(dxb, i) >> 43

	blockType <- flags & 0b111100000000000000000
	allowExecute <- flags & 0b000010000000000000000
	endOfBlock <- flags & 0b000001000000000000000
	endOfScope <- flags & 0b000000100000000000000

	hasExpirationOffset <- flags & 0b000000010000000000000
	hasRepresentedBy <- flags & 0b000000001000000000000
	isCompressed <- flags & 0b000000000100000000000
	isSignatureInLastSubblock <- flags & 0b000000000010000000000
	
	if hasExpirationOffset:
		i <- i + 4
	
	if hasRepresentedBy:
		(representedBy, i) <- extractEndpoint(dxb, i)
	
	if isEncrypted:
		(iv, i) <- extractSlice(buffer, i, 16)

	return Runtime.DXBUnresolvedSubBlock {
		headerData: Runtime.DXBBlockHeaderData {
			routingData: routingHeaderData,
			isSigned,
			isEncrypted,
			isSignatureInLastSubblock,

			scopeId,
			blockIndex,
			blockSubIndex,

			blockType,
			allowExecute,
			endOfBlock,
			endOfScope,
			representedBy,
		},
		iv,
		signature,
		data
	}
```

```

```

```typescript
function getMissingSubBlockIds(
	block: Runtime.DXBBlock,
	global: Runtime.Global
):

	missingSubBlockIds <- []
	subBlocks <- block.subBlocks
	indicies <- getRingBufferIndexRange(block.activeBoundA, block.activeBoundB)

	for i in indicies:
		if not (i in block.subBlocks)
			missingSubBlockIds += i
	return missingSubBlockIds
```

```typescript
function decryptRSA(encryptedData: Uint8[], global: Runtime.Global)
	privateDecryptionKey <- global.endpoint.encryptionPrivateKey
	return RSADecrypt(encryptedData, privateDecryptionKey)
```

```typescript
function decryptBlockData(encryptedData: Uint8[], scope: Runtime.Scope, block: Runtime.DXBBlock, subBlock: Runtime.DXBUnresolvedSubBlock, global: Runtime.Global):
	iv <- subBlock.iv

	encryptedKey <- 
		subBlock.headerData.routingData.receivers[global.endpoint] or
		block.headerData.routingData.receivers[global.endpoint] or
		scope.headerData.routingData.receivers[global.endpoint]

	decryptedKey <- decryptRSA(encryptedKey, global)
	return AESDecrypt(encryptedData, decryptedKey)
```

```typescript
function collectSubBlocks(block: Runtime.DXBBlock, scope: Runtime.Scope, global: Runtime.Global):

	indicies <- getRingBufferIndexRange(block.activeBoundA, block.activeBoundB)

	lastAvailableIndex <- 0
	// loop over all available subblocks, validate signature (combined subBlock or single subBlock)
	for i in indicies:
		subBlock <- block.subBlocks[i]
		if not subBlock:
			if block.headerData.isSignatureInLastSubblock:
				return
			else:
				break
		lastAvailableIndex <- i;

		if	block.headerData.isSignatureInLastSubblock and
			subBlock.headerData.endOfBlock:
			signature <- subBlock.signature
			signedData <- Uint8[]()

			for j in indicies:
				signedData += block.subBlocks[j].data

			// validate signature, subblock(s) must be signed
			isValid <- validateSignature(signedData, signature)
			if not isValid:
				// invalid data, gargabe collection ...
				return
			
		else if subBlock.headerData.isSigned:
			signedData <- subBlock.data
			isValid <- validateSignature(signedData, signature)
			if not isValid:
				return
		else:
			// if one subblock is not signed whole block is marked as non-signed
			block.headerData.isSigned = false

	executable <- Uint8[]()
	availableIndicies <- getRingBufferIndexRange(indicies[0],lastAvailableIndex)

	// optional decryption
	for i in availableIndicies:
		subBlock <- block.subBlocks[i]
		if subBlock.headerData.isEncrypted
			encryptedData = subBlock.data
			// keys can be defined in block, subBlock or scope
			// IV is located in each subblock
			decryptedData <- decryptBlockData(encryptedData, scope, block, subBlock, global)
			executable <- executable + decryptedData
		else:
			executable <- executable + subBlock.data

	block.activeBoundA <- lastAvailableIndex
	scope.executable <- scope.executable + executable
```


```typescript
function executeDXB(
	dxb: Protocol.DXB,
	routingHeaderData: Protocol.DXBRoutingHeaderData,
	global: Runtime.Global
):

	unresolvedSubBlock <- parseUnresolvedDXBSubBlock(dxb, routingHeaderData, global)

	endpoint <- global.endpoint
	if not (endpoint in global.scopes):
		global.scopes[endpoint] <- Map<Uint32, Map<Uint32, Runtime.DXBBlock>>()

	headerData <- unresolvedSubBlock.headerData

	scopeId <- headerData.scopeId
	if not (scopeId in global.scopes[endpoint]):
		global.scopes[endpoint][scopeId] <- Runtime.Scope{ headerData }

	blockId <- headerData.blockId
	if not (blockId in global.scopes[endpoint][scopeId].blocks):
		global.scopes[endpoint][scopeId].blocks[blockId] <- Runtime.DXBBlock{ headerData }
	
	block <- global.scopes[endpoint][scopeId].blocks[blockId]
	blockSubIndex <- headerData.blockSubIndex

	if (blockSubIndex > block.activeBoundB or blockSubIndex < block.activeBoundA) and block.lastSubBlockReceived:
		return

	block.subBlocks[blockSubIndex] <- unresolvedSubBlock

	if blockSubIndex > block.activeBoundB
		block.activeBoundB <- blockSubIndex 
	else if blockSubIndex < block.activeBoundA
		block.activeBoundB <- blockSubIndex 

	missingSubBlockIds <- getMissingSubBlockIds(block, global)

	if len(missingSubBlockIds) > 0:
		triggerResend(missingBlockIds, block, global) // TODO

	collectSubBlocks(
		block,
		global
	)

	runtimeExecution(scope, global)
```

```typescript
function redirectDXB (
	dxb: Protocol.DXB,
	routingHeaderData: Protocol.DXBRoutingHeaderData,
	global: Runtime.Global
):
```

```typescript
function dxbIn (
	dxb: Protocol.DXB,
	global: Runtime.Global
):
	routingHeaderData <- extractDXBRoutingHeaderData(dxb)
	receivers <- routingHeaderData.receivers

	if global.endpoint in receivers:
		executeDXB(dxb, routingHeaderData, global)

	if not (len(receivers) = 1 and receivers[0] = global.endpoint):
		redirectDXB(dxb, routingHeaderData, global)
```

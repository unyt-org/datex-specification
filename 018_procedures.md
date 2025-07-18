# 18 Procedures

## 18.1 ...

### 18.1.1 17.1.1

```typescript
function getRingBufferIndexRange(a: Uint16, b: Uint16):
	
	indiciesInBounds <- []

	function appendArrayIndexRange(a, b):
		for i in (a..b):
			indiciesInBounds += i

	if a < b
		appendArrayIndexRange(a, b)
	else:
		appendArrayIndexRange(a, Uint16.MAX)
		appendArrayIndexRange(0, b)

	return indiciesInBounds
```

## 18.2 Buffer Operations

### 18.2.1 getUint16

```typescript
function getUint16(data: Uint8[], i: Uint8):
	return dxb[i] + dxb[i+1] * 0xff
```

### 18.2.2 extractUint16

```typescript
function extractUint16(buffer: Uint8[], i: Uint8):
	return (getUint16(buffer, i), i+2)
```

### 18.2.3 getUint64

```typescript
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
```

### 18.2.4 extractUint64

```typescript
function extractUint64(buffer: Uint8[], i: Uint8):
	return (getUint64(buffer, i), i+8)
```

### 18.2.5 getUint32

```typescript
function getUint32(data: Uint8[], i: Uint8):
	return 
		dxb[i] + 
		dxb[i+1] * 0xff +
		dxb[i+2] * 0xffff +
		dxb[i+3] * 0xffffff
```

### 18.2.6 extractUint32

```typescript
function extractUint32(buffer: Uint8[], i: Uint8):
	return (getUint32(buffer, i), i+4)
```

### 18.2.7 getSlice

```typescript
function getSlice(data: Uint8[], i: Uint8, length: Uint8):
	return data[i..i+length]
```

### 18.2.8 extractSlice

```typescript
function extractSlice(buffer: Uint8[], i: Uint8, length: Uint8):
	return (getSlice(buffer, i, length), i+length)
```

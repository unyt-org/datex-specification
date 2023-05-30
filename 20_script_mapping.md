# Mapping from DATEX Script to DXB

All properties of the `#std` record are directly accessible in all scopes (`#std` prefix not necessary: `#std.text -> text`).


## General Instruction Structure
```ts
	IC: UINT8
	DATA: ANY
```


## Types (0x10 - 0x2f)
### Text (0x10)

* DATEX Script code `#std.text`
* Instruction Code: `0x10`


## Values (0xc0 - 0xdf)
### Text (0xc0)

* DATEX Script code `"text"`
* Instruction Code: `0xc0`
* Data mapping: 
	```ts
	LENGTH: UINT32
	CONTENT: UINT8[LENGTH]
	```
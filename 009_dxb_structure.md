# 9 Structure of a DATEX Block

## 9.1 Overview

A DATEX Block consists of 4 main sections:

- A **Routing Header**, which mainly contains information about the sender and
  receivers of the block, and important information about the block (e.g. block
  size)
- A **Block Header**, which contains metadata about the current block (type,
  timestamp, id, flags)
- A **Encrypted Header** that is part of the optionally encrypted section of the
  block, and contains secret information that is only visible to the receivers
  of the block
- A **Body**, which contains executable DATEX instructions

<DXBProtocolViewer speck="./assets/structures/dxb.json"></DXBProtocolViewer>

## 9.2 The Routing Header

<speck-table level="2" file="./assets/structures/dxb.json" section="Routing Header">

| Field                                                      | Size                              | Type     | Condition (for optional fields)                                                           |
| :--------------------------------------------------------- | :-------------------------------- | :------- | :---------------------------------------------------------------------------------------- |
| Magic Number                                               | 2 bytes                           | array    | -                                                                                         |
| Version                                                    | 1 byte                            | uint8    | -                                                                                         |
| Block Size                                                 | 2 bytes                           | uint16   | -                                                                                         |
| [Flags](#routing-header-flags)                             | 1 byte                            | bitmask  | -                                                                                         |
| Checksum                                                   | 4 bytes                           | uint32   | `Has Checksum` equals `true`                                                              |
| Distance                                                   | 1 byte                            | uint8    | -                                                                                         |
| TTL                                                        | 1 byte                            | uint8    | -                                                                                         |
| Sender                                                     | 21 bytes                          | endpoint | -                                                                                         |
| Receivers Pointer ID                                       | 26 bytes                          | pointer  | [`Receiver Type`](#routing-header-receiver-type) equals `"Pointer"`                       |
| Number of Receivers                                        | 1 byte                            | uint8    | [`Receiver Type`](#routing-header-receiver-type) in (`"Receivers"`,`"ReceiversWithKeys"`) |
| Receivers                                                  | 21 bytes x `Number of Receivers`  | endpoint | [`Receiver Type`](#routing-header-receiver-type) equals `"Receivers"`                     |
| [Receivers with Keys](#routing-header-receivers-with-keys) | 533 bytes x `Number of Receivers` | -        | [`Receiver Type`](#routing-header-receiver-type) equals `"ReceiversWithKeys"`             |
| Signature                                                  | 108 bytes                         | string   | [`Signature Type`](#routing-header-signature-type) equals `"Unencrypted"`                 |
| Encrypted Signature                                        | 108 bytes                         | string   | [`Signature Type`](#routing-header-signature-type) equals `"Encrypted"`                   |

<a id="routing-header-flags"></a>

### 9.2.1 Flags

| Field                                              | Size   | Type    |
| :------------------------------------------------- | :----- | :------ |
| [Signature Type](#routing-header-signature-type)   | 2 bits | enum    |
| [Encryption Type](#routing-header-encryption-type) | 1 bit  | enum    |
| [Receiver Type](#routing-header-receiver-type)     | 2 bits | enum    |
| Is Bounce Back                                     | 1 bit  | boolean |
| Has Checksum                                       | 1 bit  | boolean |

<a id="routing-header-signature-type"></a>

#### 9.2.1.1 Signature Type

**Enum Mapping:**

| Integer Value | Mapped Value    |
| :------------ | :-------------- |
| `0b00`        | `"None"`        |
| `0b10`        | `"Unencrypted"` |
| `0b11`        | `"Encrypted"`   |
| `0b01`        | `"Invalid"`     |

<a id="routing-header-encryption-type"></a>

#### 9.2.1.2 Encryption Type

**Enum Mapping:**

| Integer Value | Mapped Value  |
| :------------ | :------------ |
| `0`           | `"None"`      |
| `1`           | `"Encrypted"` |

<a id="routing-header-receiver-type"></a>

#### 9.2.1.3 Receiver Type

**Enum Mapping:**

| Integer Value | Mapped Value          |
| :------------ | :-------------------- |
| `0b00`        | `"None"`              |
| `0b01`        | `"Pointer"`           |
| `0b10`        | `"Receivers"`         |
| `0b11`        | `"ReceiversWithKeys"` |

<a id="routing-header-receivers-with-keys"></a>

### 9.2.2 Receivers with Keys

| Field    | Size      | Type     |
| :------- | :-------- | :------- |
| Receiver | 21 bytes  | endpoint |
| Key      | 512 bytes | hex      |

</speck-table>

## 9.3 The Block Header

<speck-table level="2" file="./assets/structures/dxb.json" section="Block Header">

| Field                                                    | Size     | Type     | Condition (for optional fields)    |
| :------------------------------------------------------- | :------- | :------- | :--------------------------------- |
| Context ID                                               | 4 bytes  | uint32   | -                                  |
| Section Index                                            | 2 bytes  | uint16   | -                                  |
| Block Number                                             | 2 bytes  | uint16   | -                                  |
| [Flags and Timestamp](#block-header-flags-and-timestamp) | 8 bytes  | bitmask  | -                                  |
| Lifetime                                                 | 4 bytes  | uint32   | `Has Lifetime` equals `true`       |
| Represented By                                           | 21 bytes | endpoint | `Has Represented By` equals `true` |
| IV                                                       | 16 bytes | -        | `Has IV` equals `true`             |

<a id="block-header-flags-and-timestamp"></a>

### 9.3.1 Flags and Timestamp

| Field                                  | Size    | Type    |
| :------------------------------------- | :------ | :------ |
| [Block Type](#block-header-block-type) | 4 bits  | enum    |
| Has Side Effects                       | 1 bit   | boolean |
| Has Only Data                          | 1 bit   | boolean |
| Is End of Section                      | 1 bit   | boolean |
| Is End of Context                      | 1 bit   | boolean |
| Has Lifetime                           | 1 bit   | boolean |
| Has Represented By                     | 1 bit   | boolean |
| Has IV                                 | 1 bit   | boolean |
| Is Compressed                          | 1 bit   | boolean |
| Is Signature in Last Subblock          | 1 bit   | boolean |
| Reserved                               | 8 bits  | uint    |
| Creation Timestamp                     | 43 bits | uint    |

<a id="block-header-block-type"></a>

#### 9.3.1.1 Block Type

**Enum Mapping:**

| Integer Value | Mapped Value  |
| :------------ | :------------ |
| `0`           | `"Request"`   |
| `1`           | `"Response"`  |
| `2`           | `"Hello"`     |
| `3`           | `"Trace"`     |
| `4`           | `"TraceBack"` |

</speck-table>

## 9.4 The Encrypted Header

<speck-table level="2" file="./assets/structures/dxb.json" section="Encrypted Header">

| Field                            | Size     | Type     | Condition (for optional fields)  |
| :------------------------------- | :------- | :------- | :------------------------------- |
| [Flags](#encrypted-header-flags) | 1 byte   | bitmask  | -                                |
| On Behalf Of                     | 21 bytes | endpoint | `Has On Behalf Of` equals `true` |

<a id="encrypted-header-flags"></a>

### 9.4.1 Flags

| Field                                      | Size   | Type    |
| :----------------------------------------- | :----- | :------ |
| [User Agent](#encrypted-header-user-agent) | 4 bits | enum    |
| Has On Behalf Of                           | 1 bit  | boolean |

<a id="encrypted-header-user-agent"></a>

#### 9.4.1.1 User Agent

**Enum Mapping:**

| Integer Value | Mapped Value |
| :------------ | :----------- |
| `0`           | `"Unknown"`  |
| `1`           | `"Human"`    |
| `2`           | `"Bot"`      |
| `3`           | `"Service"`  |

</speck-table>

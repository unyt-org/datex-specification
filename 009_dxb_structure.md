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

| Field                            | Size                             | Type     | Condition (for optional fields)                                                           |
| :------------------------------- | :------------------------------- | :------- | :---------------------------------------------------------------------------------------- |
| Magic Number                     | 2 bytes                          | -        | -                                                                                         |
| Version                          | 1 byte                           | uint8    | -                                                                                         |
| Block Size                       | 2 bytes                          | uint16   | -                                                                                         |
| [Flags](#routing-header-flags)   | 1 byte                           | bitmask  | -                                                                                         |
| Checksum                         | 4 bytes                          | uint32   | -                                                                                         |
| Distance                         | 1 byte                           | uint8    | -                                                                                         |
| TTL                              | 1 byte                           | uint8    | -                                                                                         |
| [Sender](#routing-header-sender) | 21 bytes                         | endpoint | -                                                                                         |
| Receivers Pointer ID             | 26 bytes                         | pointer  | [`Receiver Type`](#routing-header-receiver-type) equals `"Pointer"`                       |
| Number of Receivers              | 1 byte                           | uint8    | [`Receiver Type`](#routing-header-receiver-type) in (`"Receivers"`,`"ReceiversWithKeys"`) |
| Receivers                        | 21 bytes x `Number of Receivers` | endpoint | [`Receiver Type`](#routing-header-receiver-type) in (`"Receivers"`,`"ReceiversWithKeys"`) |
| Receivers with Keys              | 21 bytes x `Number of Receivers` | endpoint | [`Receiver Type`](#routing-header-receiver-type) equals `"ReceiversWithKeys"`             |
| Signature                        | 255 bytes                        | string   | [`Signature Type`](#routing-header-signature-type) equals `"Unencrypted"`                 |
| Encrypted Signature              | 300 bytes                        | string   | [`Signature Type`](#routing-header-signature-type) equals `"Encrypted"`                   |

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

<a id="routing-header-sender"></a>

### 9.2.2 Sender

| Field             | Size     | Type   |
| :---------------- | :------- | :----- |
| Endpoint Type     | 1 byte   | -      |
| Endpoint ID       | 18 bytes | string |
| Endpoint Instance | 2 bytes  | int16  |

</speck-table>

## 9.3 The Block Header

<speck-table level="2" file="./assets/structures/dxb.json" section="Block Header">

| Field             | Size     | Type     |
| :---------------- | :------- | :------- |
| Context ID        | 4 bytes  | uint32   |
| Section Index     | 2 bytes  | uint16   |
| Block Number      | 2 bytes  | uint16   |
| Flags & Timestamp | 8 bytes  | -        |
| Lifetime          | 4 bytes  | uint32   |
| Repr              | 21 bytes | endpoint |
| IV                | 16 bytes | -        |

</speck-table>

## 9.4 The Encrypted Header

<speck-table level="2" file="./assets/structures/dxb.json" section="Encrypted Header">

| Field                            | Size     | Type     | Condition (for optional fields)  |
| :------------------------------- | :------- | :------- | :------------------------------- |
| [Flags](#encrypted-header-flags) | 1 byte   | bitmask  | -                                |
| On Behalf Of                     | 21 bytes | endpoint | `Has On Behalf Of` equals `true` |

<a id="encrypted-header-flags"></a>

### 9.4.1 Flags

| Field            | Size   | Type    |
| :--------------- | :----- | :------ |
| User Agent       | 4 bits | -       |
| Has On Behalf Of | 1 bit  | boolean |

</speck-table>

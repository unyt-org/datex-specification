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

| Field                                                                  | Size                           | Type     | Condition (for optional fields)                                                         |
| :--------------------------------------------------------------------- | :----------------------------- | :------- | :-------------------------------------------------------------------------------------- |
| <a name="routing-header-magic-number">Magic Number</a>                 | 2 bytes                        | -        | -                                                                                       |
| <a name="routing-header-version">Version</a>                           | 1 byte                         | uint8    | -                                                                                       |
| <a name="routing-header-block-size">Block Size</a>                     | 2 bytes                        | uint16   | -                                                                                       |
| <a name="routing-header-flags">Flags</a>                               | 1 byte                         | bitmask  | -                                                                                       |
| <a name="routing-header-checksum">Checksum</a>                         | 4 bytes                        | uint32   | -                                                                                       |
| <a name="routing-header-distance">Distance</a>                         | 1 byte                         | uint8    | -                                                                                       |
| <a name="routing-header-ttl">TTL</a>                                   | 1 byte                         | uint8    | -                                                                                       |
| <a name="routing-header-sender">Sender</a>                             | 21 bytes                       | endpoint | -                                                                                       |
| <a name="routing-header-receivers-pointer-id">Receivers Pointer ID</a> | 26 bytes                       | pointer  | [Receiver Type](#routing-header-receiver-type) equals `"Pointer"`                       |
| <a name="routing-header-receiver-count">Number of Receivers</a>        | 1 byte                         | uint8    | [Receiver Type](#routing-header-receiver-type) in (`"Receivers"`,`"ReceiversWithKeys"`) |
| <a name="routing-header-receivers">Receivers</a>                       | 21 bytes x Number of Receivers | endpoint | [Receiver Type](#routing-header-receiver-type) in (`"Receivers"`,`"ReceiversWithKeys"`) |
| <a name="routing-header-receivers-with-keys">Receivers with Keys</a>   | 21 bytes x Number of Receivers | endpoint | [Receiver Type](#routing-header-receiver-type) equals `"ReceiversWithKeys"`             |
| <a name="routing-header-signature">Signature</a>                       | 255 bytes                      | string   | [Signature Type](#routing-header-signature-type) equals `"Unencrypted"`                 |
| <a name="routing-header-encrypted-signature">Encrypted Signature</a>   | 300 bytes                      | string   | [Signature Type](#routing-header-signature-type) equals `"Encrypted"`                   |


<a name="routing-header-flags"></a>
### 9.2.1 Flags

| Field                                               | Size   | Type    |
| :-------------------------------------------------- | :----- | :------ |
| <a name="flags-signature-type">Signature Type</a>   | 2 bits | enum    |
| <a name="flags-encryption-type">Encryption Type</a> | 1 bit  | enum    |
| <a name="flags-receiver-type">Receiver Type</a>     | 2 bits | enum    |
| <a name="flags-is-bounce-back">Is Bounce Back</a>   | 1 bit  | boolean |
| <a name="flags-has-checksum">Has Checksum</a>       | 1 bit  | boolean |


<a name="flags-signature-type"></a>
#### 9.2.1.1 Signature Type

**Enum Mapping:**

| Integer Value | Mapped Value    |
| :------------ | :-------------- |
| `0b00`        | `"None"`        |
| `0b10`        | `"Unencrypted"` |
| `0b11`        | `"Encrypted"`   |
| `0b01`        | `"Invalid"`     |


<a name="flags-encryption-type"></a>
#### 9.2.1.2 Encryption Type

**Enum Mapping:**

| Integer Value | Mapped Value  |
| :------------ | :------------ |
| `0`           | `"None"`      |
| `1`           | `"Encrypted"` |


<a name="flags-receiver-type"></a>
#### 9.2.1.3 Receiver Type

**Enum Mapping:**

| Integer Value | Mapped Value          |
| :------------ | :-------------------- |
| `0b00`        | `"None"`              |
| `0b01`        | `"Pointer"`           |
| `0b10`        | `"Receivers"`         |
| `0b11`        | `"ReceiversWithKeys"` |


<a name="routing-header-sender"></a>
### 9.2.2 Sender

| Field                                                    | Size     | Type   |
| :------------------------------------------------------- | :------- | :----- |
| <a name="sender-endpoint-type">Endpoint Type</a>         | 1 byte   | -      |
| <a name="sender-endpoint-id">Endpoint ID</a>             | 18 bytes | string |
| <a name="sender-endpoint-instance">Endpoint Instance</a> | 2 bytes  | int16  |



</speck-table>

## 9.3 The Block Header

<speck-table level="2" file="./assets/structures/dxb.json" section="Block Header">

| Field                                                         | Size     | Type     |
| :------------------------------------------------------------ | :------- | :------- |
| <a name="block-header-context-id">Context ID</a>              | 4 bytes  | uint32   |
| <a name="block-header-section-index">Section Index</a>        | 2 bytes  | uint16   |
| <a name="block-header-block-number">Block Number</a>          | 2 bytes  | uint16   |
| <a name="block-header-flags--timestamp">Flags & Timestamp</a> | 8 bytes  | -        |
| <a name="block-header-lifetime">Lifetime</a>                  | 4 bytes  | uint32   |
| <a name="block-header-repr">Repr</a>                          | 21 bytes | endpoint |
| <a name="block-header-iv">IV</a>                              | 16 bytes | -        |



</speck-table>

## 9.4 The Encrypted Header

<speck-table level="2" file="./assets/structures/dxb.json" section="Encrypted Header">

| Field                                                    | Size     | Type     | Condition (for optional fields) |
| :------------------------------------------------------- | :------- | :------- | :------------------------------ |
| <a name="encrypted-header-flags">Flags</a>               | 1 byte   | bitmask  | -                               |
| <a name="encrypted-header-on-behalf-of">On Behalf Of</a> | 21 bytes | endpoint | Has On Behalf Of equals `true`  |


<a name="encrypted-header-flags"></a>
### 9.4.1 Flags

| Field                                                 | Size   | Type    |
| :---------------------------------------------------- | :----- | :------ |
| <a name="flags-user-agent">User Agent</a>             | 4 bits | -       |
| <a name="flags-has-on-behalf-of">Has On Behalf Of</a> | 1 bit  | boolean |



</speck-table>

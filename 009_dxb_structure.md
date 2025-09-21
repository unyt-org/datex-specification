# 9 Structure of a DATEX Block

## 9.1 Overview

A DATEX Block consists of 4 main sections:

- A **Routing Header**, which mainly contains information about the sender and
  receivers of the block, and important information about the block (e.g. block
  size)
- A **Signature**, if the block is signed. Everything after this section (Header
  and Body) is signed by the sender and can also optionally be encrypted
- A **Block Header**, which contains meta data about the current block (type,
  timestamp, id, flags)
- A **Body**, which contains executable DATEX instructions

<DXBProtocolViewer speck="./assets/structures/dxb.json"></DXBProtocolViewer>

## 9.2 The Routing Header {#id}

<speck-table file="./assets/structures/dxb.json" section="Routing Header">

| Field                                                           | Size                                                             | Type                          | Condition (for optional fields)                                           |
| :-------------------------------------------------------------- | :--------------------------------------------------------------- | :---------------------------- | :------------------------------------------------------------------------ |
| Magic Number                                                    | 2 bytes                                                          | -                             | -                                                                         |
| Version                                                         | 1 byte                                                           | uint8                         | -                                                                         |
| Block Size                                                      | 2 bytes                                                          | uint16                        | -                                                                         |
| Flags                                                           | 1 byte                                                           | bitmask                       | -                                                                         |
| - Signature Type                                                | 2 bits                                                           | enum (0b00, 0b10, 0b11, 0b01) | -                                                                         |
| - Encryption Type                                               | 1 bits                                                           | enum (0, 1)                   | -                                                                         |
| - Receiver Type                                                 | 2 bits                                                           | enum (0b00, 0b01, 0b10, 0b11) | -                                                                         |
| - Is Bounce Back                                                | 1 bits                                                           | boolean                       | -                                                                         |
| - Has Checksum                                                  | 1 bits                                                           | boolean                       | -                                                                         |
| Checksum                                                        | 4 bytes                                                          | uint32                        | -                                                                         |
| Distance                                                        | 1 byte                                                           | uint8                         | -                                                                         |
| TTL                                                             | 1 byte                                                           | uint8                         | -                                                                         |
| Sender                                                          | 21 bytes                                                         | endpoint                      | -                                                                         |
| Receivers Pointer ID                                            | 26 bytes                                                         | pointer                       | [Receiver Type](#routing-header-receiver-type) equals "Pointer"           |
| <a name="routing-header-receiver-count">Number of Receivers</a> | 1 byte                                                           | uint8                         | receiver-type in ("Receivers","ReceiversWithKeys")                        |
| Receivers                                                       | 21 bytes x [Number of Receivers](#routing-header-receiver-count) | endpoint                      | receiver-type in ("Receivers","ReceiversWithKeys")                        |
| Receivers with Keys                                             | 21 bytes x [Number of Receivers](#routing-header-receiver-count) | endpoint                      | [Receiver Type](#routing-header-receiver-type) equals "ReceiversWithKeys" |
| Signature                                                       | 255 bytes                                                        | string                        | [Signature Type](#routing-header-signature-type) equals "Unencrypted"     |
| Encrypted Signature                                             | 300 bytes                                                        | string                        | [Signature Type](#routing-header-signature-type) equals "Encrypted"       |


<a name="routing-header-magic-number"></a>
## 9.3 Magic Number


<a name="routing-header-version"></a>
## 9.4 Version


<a name="routing-header-block-size"></a>
## 9.5 Block Size


<a name="routing-header-flags"></a>
## 9.6 Flags


<a name="routing-header-checksum"></a>
## 9.7 Checksum


<a name="routing-header-distance"></a>
## 9.8 Distance


<a name="routing-header-ttl"></a>
## 9.9 TTL


<a name="routing-header-sender"></a>
## 9.10 Sender


<a name="routing-header-receivers-pointer-id"></a>
## 9.11 Receivers Pointer ID


<a name="routing-header-receiver-count"></a>
## 9.12 Number of Receivers


<a name="routing-header-receivers"></a>
## 9.13 Receivers


<a name="routing-header-receivers-with-keys"></a>
## 9.14 Receivers with Keys


<a name="routing-header-signature"></a>
## 9.15 Signature


<a name="routing-header-encrypted-signature"></a>
## 9.16 Encrypted Signature



</speck-table>

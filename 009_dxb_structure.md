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
</speck-table>

## 9.3 The Block Header

<speck-table level="2" file="./assets/structures/dxb.json" section="Block Header">
</speck-table>

## 9.4 The Encrypted Header

<speck-table level="2" file="./assets/structures/dxb.json" section="Encrypted Header">
</speck-table>

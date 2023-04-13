# Structure of a DATEX Block

## Overview

A DATEX Block consists of 4 main sections: 
 * A **Routing Header**, which mainly contains information about the sender and receivers of the block, and important information about the block (e.g. block size)
 * A **Signature**, if the block is signed. Everything after this section (Header and Body) is signed by the sender and can also optionally be encrypted
 * A **Block Header**, which contains meta data about the current block (type, timestamp, id, flags)
 * A **Body**, which contains executable DATEX instructions


<img src="dx_block.png" style="max-width:700px">


## The Routing Header

The Routing Header is not encrypted or signed, the content always needs to be parseable by all nodes.

|Name               | Start      |  End       | Size   | Content                                                     |    Description                      |
|-------------------|:----------:|:----------:|:------:|-------------------------------------------------------------|-------------------------------------|
|Magic Number       | 0          | 2          | 2      | 01 64                                                       | Fixed value (0x01 and 'd')          |
|Version Number     | 2          | 3          | 1      | <pre class="language-yaml">VERSION: Uint8&#10;</pre>        | Version number starting from 0x01   |
|Block Size         | 3          | 5          | 2      | <pre class="language-yaml">SIZE: Uint16&#10;</pre>          | Total block size in bytes           |
|TTL                | 5          | 6          | 1      | <pre class="language-yaml">TTL: Uint8&#10;</pre>            | Time-to-live for this block, get decremented with each node redirection           |
|Priority           | 6          | 7          | 1      | <pre class="language-yaml">PRIORITY: Uint8&#10;</pre>       | Routing priority of this block      |
|Signed / Encrypted | 7          | 8          | 1      | <pre class="language-yaml">SIGN_ENCRYPT: Uint8&#10;</pre>   | 0x00: not signed or encrypted, 0x01: signed, 0x02: signed and encrypted, 0x03: encrypted |

## The Block Header


The Block Header is part of the signed and encrypted part.
If the block is signed, the header cannot be altered, and it can't be read by non-receiving parties if the block is encrypted.

|Name               | Start      |  End       | Size   | Content                                                     |    Description                      |
|-------------------|:----------:|:----------:|:------:|-------------------------------------------------------------|-------------------------------------|
|Scope ID           | 0          | 4          | 4      | <pre class="language-yaml">SID: Uint32&#10;</pre>           | Scope ID, unique for a certain sender for a certain period of time |
|Scope Block Index  | 4          | 6          | 2      | <pre class="language-yaml">BLOCK_INDEX: Uint16&#10;</pre>   | Index of the block within the current scope  |
|Scope Block Inc    | 6          | 8          | 2      | <pre class="language-yaml">SIZE: Uint16&#10;</pre>          | Incremented for each block of a scope          |
|Type               | 8          | 9          | 1      | <pre class="language-yaml">TYPE: Uint8&#10;</pre>           | Block type. See *Block Types*         |
|Flags              | 9          | 10         | 1      | <pre class="language-yaml">FLAGS: Uint8&#10;</pre>          | executable, end of scope, device type     |
|Timestamp          | 10         | 18         | 8      | <pre class="language-yaml">TIME: Uint64&#10;</pre>          | Time in ms since 2022-01-22 (to be changed)    |

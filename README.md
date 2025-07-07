# DATEX Specification

## Introduction

This is the official specification for the DATEX Protocol Language.
You can find this document on [github.com](https://github.com/unyt-org/datex-specification) and [docs.unyt.org](https://docs.unyt.org/datex).

DATEX is a communication protocol and language that provides realtime data exchange and synchronization for distributed applications.

The DATEX specification is an open standard focused on web-based technology with support for other systems like IoT and mobile devices.

DATEX is a flexible protocol that combines the Application, Session, Transport, and Network layer of the OSI Model.
The protocol offers encryption, signatures and authentication functionality.

DATEX introduces the concept of endpoints that form a peer-to-peer network, replacing the common server-client architecture.

DATEX incorporates a global shared memory that enables data synchronization between network participants (endpoints).
In addition, DATEX includes a general-purpose type system which is designed to interface with common programming languages.

This specification describes
 * the *DATEX Binary Format* (**DXB**) - the machine-readable bytecode format for DATEX
 * the *DATEX Script Language* (**DATEX Script** or **DX**) - human-readable representation of DATEX that gets compiled to DXB

<!--TODO: change/remove?-->
<!--The DATEX Script Language is a superset of the JSON format.-->


## Applications of DATEX

1. DATEX can be used as a protocol for communication between two or more parties
2. DATEX can be used to store structured signed and/or encrypted data for platform-independent usage
3. DATEX can be used to write scripts that can be executed locally or on remote endpoints
4. DATEX can be used as an interface to develop reactive full-stack applications (UIX)
5. DATEX enables permission handling for resources on a network level

All these applications serve as the backbone for the [unyt.org supranet](./020_terms.md#supranet).

## Specification

1. [Conformance](./010_conformance.md)
2. [Terms and Definitions](./020_terms.md)
3. [Introduction to DATEX Script](./030_DATEX_Introduction.md)
4. [Binary Instruction Codes](./040_dxb_binary.md)
4. [DATEX Execution](./050_dxb_execution.md)
4. [Instructions](./060_runtime_instructions.md)
4. [Structure of a DATEX Block](./070_dxb_structure.md)
4. [Types](./080_types.md)
4. [Endpoints](./082_endpoints.md)
4. [Bibliography](./900_bibliography.md)



## Copyright and Software License

```text
MIT License

Copyright (c) 2025 unyt.org

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

## Contributors
Editors

 * Benedikt Strehle
 * Jonas Strehle
 * Tim Köhler

This document was last updated on May 30, 2023.

<b>This is not the final version of the specification. It is still subject to change. Many sections still need to be transferred from the DATEX Documentation.</b>


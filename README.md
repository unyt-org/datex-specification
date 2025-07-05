# DATEX Specification

## Introduction

This is the official specification for the DATEX Protocol Language.
You can find this document on [github.com](https://github.com/unyt-org/datex-specification) and [docs.unyt.org](https://docs.unyt.org/datex).

DATEX is a communication protocol and language that provides realtime data exchange and synchronization for distributed applications.

The DATEX specification is an open standard that is designed to be implemented for various platforms, including
 * embedded devices
 * web applications
 * mobile application
 * desktop applications

DATEX is a flexible protocol that combines the Application, Session, Transport, and Network layer of the OSI Model.
The protocol offers encryption, signatures and authentication functionality.

DATEX introduces the concept of endpoints that form a peer-to-peer network, replacing the common server-client architecture.

DATEX incorporates a global shared memory that enables data synchronization between network participants (endpoints).
In addition, DATEX includes a general-purpose type system which is designed to interface with common programming languages.

This specification describes
 * the *DATEX Binary Format* (**DXB**) - the machine-readable bytecode format for DATEX
 * the *DATEX Script Language* (**DX** or just **DATEX**) - a human-readable representation of DATEX that gets compiled to DXB, designed
   as a full-featured programming language while still being a superset of JSON.

## Applications of DATEX

1. DATEX can be used as a protocol for communication between two or more parties
2. DATEX can be used to store structured signed and/or encrypted data for platform-independent usage
3. DATEX can be used to write scripts that can be executed locally or on remote endpoints
4. DATEX can be used as an interface to develop reactive full-stack applications
5. DATEX enables permission handling for resources on a network level

All these applications form the backbone of the [unyt.org supranet](./02_terms.md#supranet).

## Specification

1. [Conformance](./01_conformance.md)
2. [Terms and Definitions](./02_terms.md)
3. [Introduction to DATEX Script](./03_DATEX_Introduction.md)
4. [Binary Instruction Codes](./04_dxb_binary.md)
4. [DATEX Execution](./05_dxb_execution.md)
4. [Instructions](./06_runtime_instructions.md)
4. [Structure of a DATEX Block](./07_dxb_structure.md)
4. [Types](./08_types.md)
4. [Endpoints](./09_endpoints.md)
4. [Bibliography](./10_bibliography.md)


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

> [NOTE]
> This is a working draft of the DATEX specification and still subject to change.
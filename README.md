# DATEX Specification

## Introduction

This is the official specification for the DATEX Protocol Language.
You can find this document on [github.com](https://github.com/unyt-org/datex-specification) and [datex.unyt.org](https://datex.unyt.org/).

DATEX is a modern communication protocol and language optimized for encrypted realtime data exchange and synchronization between multiple endpoints.

The DATEX specification is an open standard focused on web-based technology, but with support for other systems like IoT or mobile devices in mind.

The specification includes the *Datex Binary Format* (**DXB**) and the *DATEX Script Language* (**DATEX Script** or **DX**), which gets compiled to DXB and serves as a human-readable version of the DATEX Binary Format. The DATEX Script Language is a superset of the JSON format.

The DATEX protocol is a flexible multi-layer protocol that provides at least the functionality of an Application layer, but can also provide a Session, Transport, and Network layer  if needed, depending on the type of the actual underlying channel used for communication.

DATEX includes a cross-network pointer system and a extendable type system which is designed to support object-oriented approaches and helps with synchronization of object states between multiple clients. 
In addition, DATEX supports common primitive types (e.g. different sized integers), as well as binary streams.

## Applications of DATEX

The primary purpose of DATEX as a protocol is real-time communication between two or more parties via a direct channel or over the **DATEX Cloud**.<br>

Furthermore, DATEX can be used to store structured signed and/or encrypted data and scripts. 

DATEX can also be used to write reactive full-stack applications. DATEX can be extended with interfaces for specific use cases.

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

Copyright (c) 2022 unyt.org

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

This document was last updated on April 14, 2023.

<b>This is not the final version of the specification. It is still subject to change. Many sections still need to be transferred from the DATEX Documentation.</b>


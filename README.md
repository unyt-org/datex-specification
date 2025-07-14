# Datex Specification

> [!WARNING]
> This is a working draft of the Datex specification and still subject to change.


## Introduction

This is the official specification for Datex. You can browse this document on [Datex.unyt.org](https://Datex.unyt.org).

Datex is a communication protocol and language that provides realtime data exchange and synchronization for distributed applications.

The Datex specification is an open standard that is designed to be implemented for various platforms, including
 * embedded devices
 * web applications
 * mobile application
 * desktop applications

Datex is a flexible protocol that combines the Application, Session, Transport, and Network layer of the OSI Model.
The protocol offers encryption, signatures and authentication functionality.

Datex introduces the concept of endpoints that form a peer-to-peer network, replacing the common server-client architecture.

Datex incorporates a global shared memory that enables data synchronization between network participants (endpoints).
In addition, Datex includes a general-purpose type system which is designed to interface with common programming languages.

This specification describes
 * the *Datex Binary Format* (**DXB**) - the machine-readable bytecode format for Datex
 * the *Datex Language* (**DX** or just **Datex**) - a human-readable representation of Datex that gets compiled to DXB, designed
   as a full-featured programming language while still being a superset of JSON.

## Applications of Datex

1. Datex can be used as a protocol for communication between two or more parties
2. Datex can be used to store structured signed and/or encrypted data for platform-independent usage
3. Datex can be used to write scripts that can be executed locally or on remote endpoints
4. Datex can be used as an interface to develop reactive full-stack applications
5. Datex enables permission handling for resources on a network level

All these applications serve as the backbone for the [unyt.org supranet](./002_terms.md#supranet).

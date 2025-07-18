# DATEX Specification

> [!WARNING]
> This is a working draft of the DATEX specification and still subject to
> change.

## Introduction

This is the official specification for DATEX. You can browse this document on
[datex.unyt.org](https://datex.unyt.org).

DATEX is a communication protocol and language that provides realtime data
exchange and synchronization for distributed applications.

The DATEX specification is an open standard that is designed to be implemented
for various platforms, including

- embedded devices
- web applications
- mobile application
- desktop applications

DATEX is a flexible protocol that combines the Application, Session, Transport,
and Network layer of the OSI Model. The protocol offers encryption, signatures
and authentication functionality.

DATEX introduces the concept of endpoints that form a peer-to-peer network,
replacing the common server-client architecture.

DATEX incorporates a global shared memory that enables data synchronization
between network participants (endpoints). In addition, DATEX includes a
general-purpose type system which is designed to interface with common
programming languages.

This specification describes

- the _DATEX Binary Format_ (**DXB**) - the machine-readable bytecode format for
  DATEX
- the _DATEX Language_ (**DX** or just **DATEX**) - a human-readable
  representation of DATEX that gets compiled to DXB, designed as a full-featured
  programming language while still being a superset of JSON.

## Applications of DATEX

1. DATEX can be used as a protocol for communication between two or more parties
2. DATEX can be used to store structured signed and/or encrypted data for
   platform-independent usage
3. DATEX can be used to write scripts that can be executed locally or on remote
   endpoints
4. DATEX can be used as an interface to develop reactive full-stack applications
5. DATEX enables permission handling for resources on a network level

All these applications serve as the backbone for the
[unyt.org supranet](./003_conformance.md#supranet).

# DATEX Specification

> [!WARNING]
> This is a working draft of the DATEX specification and still subject to
> change.

## Table of Contents

- [Functionality](#functionality)
- [Introduction](#introduction)

## Functionality

| Workflow Name            | Description                                                                       | How to Execute (Console)                                             | Input Parameters                                                                                                     |
| ------------------------ | --------------------------------------------------------------------------------- | -------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| **Create Chapter**       | Creates a new chapter file with an optional index (position).                     | `deno run -A /scripts/create-chapter.ts <title> <index>`             | - `title`: Title (required) <br> - `index`: Position (optional)                                                      |
| **Deploy Specification** | Automatically builds and deploys the specification on push to `main` or manually. | `gh workflow run deploy.yml` (manual trigger)                        | None (auto-triggered on push)                                                                                        |
| **Move Chapter**         | Moves an existing chapter to a new index (position).                              | `deno run -A ./scripts/move-chapter.ts <filename> <index>`           | - `filename`: Exact filename (required) <br> - `index`: New position (required)                                      |
| **Rename Chapter**       | Renames a chapter file and optionally updates its heading.                        | `deno run -A ./scripts/rename-chapter.ts  <index> <title> <heading>` | - `index`: Chapter index (required) <br> - `title`: New filename (required) <br> - `heading`: New heading (optional) |

---

## Introduction

This is the official specification for DATEX. You can browse this document on
[datex.unyt.org](https://datex.unyt.org).

DATEX is a communication protocol and language that provides realtime data
exchange and synchronization for distributed applications.

The DATEX specification is an open standard that is designed to be implemented
for various platforms, including

- Embedded devices
- Web applications
- Mobile application
- Desktop applications

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

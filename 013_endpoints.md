# 13 Endpoints

## 13.1 Endpoints and endpoint instances

A network participant is called an endpoint. Endpoints are uniquely identified
by a 20 byte address (Endpoint ID). An endpoint can have multiple instances. All
instances of an endpoint have the same 12(16) byte base address, followed by a
8(4) byte instance identifier.

In the following, the term "endpoint instance" refers to a specific endpoint
participating in the network. The term "endpoint" refers to the virtual entity
that holds all endpoint instances (which can also just be a single instance).

## 13.2 Cryptographic Keys

An endpoint can generate two permanent key pairs:

- Signing keys:
  - Ed25519
- Key-exchange keys:
  - X25519

Those key pairs are the identical for all instances of the endpoint.

## 13.3 Registering an endpoint

An endpoint instance can announce itself by sending a HELLO broadcast message
containing the public key-exchange and signing keys.

...

A non-temporary endpoint should put a permanent record in the blockchain,
containing the Endpoint ID and the public keys (See BLOCKCHAIN RECORDS)

## 13.4 Verified and named endpoints

Individuals and institutions can verify with a trusted authority to get a custom
name (alias) linked to a particular endpoint. Each individual or institution can
get exactly one alias. An endpoint cannot be referenced by multiple aliases. The
references are stored in the blockchain and signed by the referenced endpoint
and the trusted authority.

## 13.5 Address syntax

Syntax for aliases:

```datex
@person
@+institution
```

Syntax for IDs:

```datex
@@00E6736E427C7D65D2AC0000
```

Endpoint instances:

```datex
@@00E6736E427C7D65D2AC0000/143
@person/mobile1
@person/mobile2
@person/* # targets all instances
@+institution/be334e
```

If no instance is specified, the routing network decides which endpoint instance
is targeted.

## 13.6 Broadcasts

The special `@*` address resolves to `@@FFFFFFFFFFFFFFFFFFFFFFFF` and represents
a broadcast address targeting all endpoints.

## 13.7 Anonymous endpoint ID

TODO: explain generation of endpoint ID

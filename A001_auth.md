# A1 Endpoint Authentication & Authorization

## A1.1 Authorization Processes

### A1.1.1 Endpoint Creation

TODO: introduction

#### A1.1.1.1 Trust Levels

- **Trust Level 3** (Authorities): Endpoints with Trust Level 3 are directly
  selected through a democratic election. Only Organisation endpoints (TL2) can
  become TL3 endpoints. Every TL2 endpoint can vote in favor or against each
  nominated endpoint. TL3 endpoints are elected for an indefinite period of
  time. If a TL3 endpoint is no longer trusted by the majority, ... (TODO:
  discuss election stuff)

  Example: @+unyt
- **Trust Level 2**: (Personal + Organisation endpoints): Trust Level 2
  endpoints are verified by a Trust Level 3 endpoint. They are directly linked
  to existing people or legal entities.

  Example: @max, @+uniulm
- **Trust Level 1**: (Application-specific Personal + Organisation endpoints):
  Trust Level 1 endpoints are created and verified by Trust Level 2 endpoints
  and serve as proxy endpoints for specific applications (e.g. "user accounts"
  for specific apps, bots, apps provided by the TL2 endpoint). Those entities
  can be verified and untracably signed as TL1 using ring signatures (Personal
  endpoint and a selection of random endpoints sign).

  Example: @max.twitter -> @@1234567, @max.myCoolApp -> @@12345678
- **Trust Level 0**: (Anonymous endpoints) Trust Level 0 endpoints are not
  verified by another endpoint. They are not linked to an organisation or
  person.

  Example: @@565787980

(Endpoints can also ignore the public trust chain of the Supranet and create
their own trusted networks with root endpoints. This can be useful for private
DATEX networks.)

**Process flow**:

1. A new endpoint is created with a _random_ generated endpoint identifier
   (anonymous endpoint) or a custom endpoint identifier (must be validated by
   [trusted authority](https://auth.unyt.org/redeem)).
2. A sign and encryption key pair are created
   ([Cryptographic Keys](./012_endpoints.md#cryptographic-keys)).
3. Both public keys and the endpoint identifier are distributed to the Supranet
   (HELLO message)
4. A endpoint public key entry is optionally added to the HELIX blockchain
5. Persistence:
   - The endpoint identifier, public and private keys can be stored and exported
     in a .dx file
   - Private keys can be securely stored in an analog format or cold wallet

#### A1.1.1.2 Trusted Endpoint Creation

TODO: introduction

A trusted endpoint is part of a chain of endpoints. Trusted endpoints can
designate other trusted endpoints which are trusted by themselves.

**Process flow**: The process of creating trusted endpoints can be derived from
[Creating anonymous endpoint](#creating-anonymous-endpoint).

1. no change
2. The block includes an additional signature and identifier of a trusted
   endpoint
3. no change

### A1.1.2 Joining the Supranet

An existing endpoint can be recreated with the stored private keys and endpoint
identifier. A HELLO-message is distributed to the Supranet (see
[Registering an endpoint](./012_endpoints.md#registering-an-endpoint)).

## A1.2 Applications

### A1.2.1 Identity Data Storage

TODO: add datex type explanation

An endpoint can hold (more or less persistent) data fields as seen below. All
data can be optionally signed by an other endpoint (authority endpoint). If data
changes (name, nationality), a signed application including verified documents
by a state authority coming from the applier shall be validated.

Data can additionally be stored in the HELIX blockchain for data availability
purposes.

#### A1.2.1.1 Personal

**optionally validated data**:

- title: `text`
- pre names: `text[]`
- pre name: `text`
- last name: `text`
- date of birth: `time`
- address: `Address`
- nationality: `text[]`
- gender?: `"m" | "f" | "d"`
- image?: `image`
- fingerprint?: `Buffer`
- paymentMethods?: `Payment[]`

#### A1.2.1.2 Organization

- dunsId: `text` (Data Universal Numbering System)
- name: `text`
- domain: `text`
- address: `Address`
- web?: `URL`
- mail?: `text`
- phone?: `text`
- paymentMethods?: `Payment[]`

### A1.2.2 Creating sub endpoints

An endpoint can create sub endpoints that are publicy linked to itself. They are
still regarded as trusted endpoints, but they only have trust level 3.

**Process flow**:

- A new trusted anonymous endpoint is created (see
  [Creating endpoint](./A019_Auth.md#creating-trusted-endpoint)) and the block
  is signed by the local endpoint
- The local endpoint creates an endpoint property that points to the subendpoint
  (DATEX type: Endpoint): `@example::#public.mySubEndpoint` or short form
  `@example.mySubEndpoint`

### A1.2.3 Authentication

Trust is established through authentication authorities trusted by the network.
The default authority is **unyt.org**.

#### A1.2.3.1 Authentication via eID

A trusted personal endpoint can be created using sign application from
electronical passports or ids.

Personal data can be retrieved from machine readeable documents (EU passport /
eID) and validated and signed by authority.

## A1.3 Service: unyt Auth

All of the functions described above are provided by the **unyt Auth** service.

### A1.3.1 Endpoint identifiers

As a trusted endpoint authority, unyt can assign custom endpoint identifiers.

**Personal identifiers**

Format: `@username`

unyt allows custom identifiers for personal endpoints according to the prinicple
of first-come first-serve. Users must provide trust using eID or another method
of providing their signed personal data.

Restrictions of endpoint identifiers are:

- 3-18 bytes
- names must be parsed as UTF8
- must be represented as ASCII characters
- blacklist of bad words

**Organization identifiers**:

Format: `@+organizationName`

unyt is in charge of verifying organizations. To avoid naming colissions, unyt
makes public announcements about recent name reservations of organizations for
up to 10 bussiness days to handle complains.

TODO

### A1.3.2 Interfaces

All of the above functionality is provided through the interfaces descibed
below... UI is optionally provided within our service.

### A1.3.3 Key Storage

unyt provides a service to store users encrypted private keys that are not
accesible by unyt.

The keys (2x private) for the main endpoint can be decrypted via the master
password. Sub endpoint keys are encrypted with the main endpoint public keys and
can be decrypted with the main endpoint private keys.

If a sub endpoint key is lost, the user needs to log in with the master endpoint
and request the keys from unyt.

**Storing Process flow (main endpoint)**:

- user enters password
- password gets hashed
- private keys are encrypted with password and send to unyt
- unyt stores encrypted keys and password hash

**Storing Process flow (sub endpoint)**:

- perform **Restoring Process flow (main endpoint)**
- encrypt subendpoint private keys with master endpoint public keys
- send encrypted keys along endpoint id and subendpoint id to unyt

| (PK) sub endpoint id | master endpoint id | keys |
| -------------------- | ------------------ | ---- |

**Restoring Process flow (main endpoint)**:

- user enters password and endpoint identifier
- password gets hashed
- hashed password and endpoint identifier are send to unyt by temporary endpoint
- unyt sends back encrypted private key that is linked to endpoint identififer
  if hashed password matches
- temporary endpoint decrypts keys and creates endpoint with keys

| master endpoint id | keys | password hash |
| ------------------ | ---- | ------------- |

**Restoring Process flow (sub endpoint)**:

- perform **Restoring Process flow (main endpoint)**
- request encrypted subendpoint key via endpoint id from unyt
- decrypt key with master private key

#### A1.3.3.1 Key propagation

Private keys are explicitly not exposed to applications. Only unyt Auth
(unyt.org) on client side is responsible for keys (see
[integrity checks](https://github.com/guybedford/import-maps-extensions#integrity)).

**Process flow**:

1. temporary endpoint loads auth.unyt.org in iFrame
2. Endpoint login on unyt.org
3. temporary endpoint gets endpoint identifier (and public keys TODO?)
4. to sign / encrypt and decrypt data the inter-process communication with
   iFrame can be used
5. data is send back to application not via proxy of unyt Auth

#### A1.3.3.2 Endpoint login on unyt.org

**Process flow**:

This processs follows the **Restoring Process flow**. Optionally, a QR-Code
including the endpoint ID can be scanned to log in from an external device
(mobile).

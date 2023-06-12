# Endpoint Authentication & Authorization

## Authorization Processes

### Creating endpoint
TODO: introduction

**Process flow**:
1. Local endpoint assigns itself either a *random* generated endpoint identifier (anonymous endpoint) or a custom endpoint identifier (must be validated by [trusted authority](unyt_Auth)) and creates two key pairs. Please refer to [Cryptographic Keys](./09_endpoints.md#cryptographic-keys).
	- encryption key pair (RSA-OAEP)
	- sign key pair (ECDSA)
2. Both public keys along the endpoint identifier are distributed as block to Supranet
	- Network storage
	- optional storage option in HELIX blockchain
3. Endpoint identifier, public keys and private keys shall be locally stored in a common format
	- Data can be stored in .dx-format (TODO refer)
	- Private keys can be securely stored analog (print / cold wallet)

#### Creating trusted endpoint
TODO: introduction

**Process flow**:
The process of creating trusted endpoints can be derived from [Creating anonymous endpoint](#creating-anonymous-endpoint).

1. no change
2. Block includes additional signature by trusted endpoint and endpoint identifier of signer. A trusted endpoint can be
	- an auth-authority
	- any other endpoint
3. no change

### Joining Supranet as existing endpoint
The existing endpoint can be recreated using stored data *(private / public keys + endpoint identifier)*.
A HELLO-message is distributed to the Supranet (see [Registering an endpoint](./09_endpoints.md#registering-an-endpoint)).


## Applications

### Identity Data Storage
TODO: add datex type explanation

A endpoint can hold (more or less persistent) data fields as seen below. 
All data can be optionally signed by an authority. 
If data changes (name, nationality) an signed application including verified documents by a state authority coming from the applier shall be validated.

Data may be stored in HELIX blockchain for data availability purposes.

#### Personal
**optionally validated data**:
- title: `text`
- pre names: `text[]`
- pre name: `text`
- last name: `text`
- date of birth: `time`
- address: `Address`
- nationality: `text[]`
- gender?: `m | f | d`
- image?: `Image`
- fingerprint?: `Buffer`
- paymentMethods?: `Payment[]`

#### Organization
- dunsId: `text` (Data Universal Numbering System)
- name: `text`
- domain: `text`
- address: `Address`
- web?: `URL`
- mail?: `text`
- phone?: `text`
- paymentMethods?: `Payment[]`

### Creating subendpoint
A local endpoint can create subendpoints that are publicy assigned to itself.

**Process flow**:
* A new trusted anonymous endpoint is created (see [Creating endpoint](./A1_Auth.md#creating-trusted-endpoint)) and the block is signed by local endpoint
* Local endpoint may store a property that links to subendpoint (Datex type: Endpoint)
	- Property can be a entry in a map (`TODO`)
	- Property can be in the public slot (`@example::#public.mySubEndpoint`)

### Authentication
Trust is established trought authentication authorities trusted by the network. The default authority is **unyt.org**.

#### Authentication via eID
A trusted personal endpoint can be created using sign application from electronical passports or ids.

Personal data can be retrieved from machine readeable documents (EU passport / eID) and validated and signed by authority.


#### Authentication via *Mail*
-



## Service: unyt Auth
All of above applications are merged in our service **unyt Auth**.

### Endpoint identifier
As a trusted endpoint authority unyt can assign custom endpoint identifier.

**Personal identifier**

Format: `@username`

unyt allows custom identifiers for personal endpoints according to the prinicple of first-come first-serve. Users must provide trust using eID or another method of providing their signed personal data.


Restrictions of endpoint identifiers are:
- 3-18 bytes
- names must be parsed as UTF8
- must be represented as ASCII characters
- blacklist of bad words

**Organization identifier**:

Format: `@+organizationName`

unyt is in charge of verifying organizations. To avoid name colissions unyt makes public announcements about recent name reservations of organizations for up to 10 bussiness days to handle complains.

TODO

### Interfaces
All of the above functionality is provided throught those Interfaces descibed below... UI is optionally provided within our service.

### Key Storage
unyt provides a service to store users encrypted private keys that are not accesible by unyt.

The keys (2x private) for the main endoint can be decrypted via master password. Subendpoints keys are encrypted with the main endpoint public keys and can be decrypted by the main endpoint's private keys.

If a subendpoint key is lost (e.g. access to Twitter) the user needs to login with the master endpoint and request the keys from unyt.


**Storing Process flow (main endpoint)**:
* user enters password
* password gets hashed
* private keys are encrypted with password and send to unyt
* unyt stores encrypted keys and password hash

**Storing Process flow (sub endpoint)**:
* perform **Restoring Process flow (main endpoint)**
* encrypt subendpoint private keys with master endpoint public keys
* send encrypted keys along endpoint id and subendpoint id to unyt


| (PK) sub endpoint id | master endpoint id | keys |
-- | -- | --

**Restoring Process flow (main endpoint)**:
* user enters password and endpoint identifier
* password gets hashed
* hashed password and endpoint identifier are send to unyt by temporary endpoint
* unyt sends back encrypted private key that is linked to endpoint identififer if hashed password matches
* temporary endpoint decrypts keys and creates endpoint with keys

| master endpoint id | keys | password hash
-- | -- | --

**Restoring Process flow (sub endpoint)**:
* perform **Restoring Process flow (main endpoint)**
* request encrypted subendpoint key via endpoint id from unyt
* decrypt key with master private key


#### Key propagation
Private keys are explicitly not exposed to applications. Only unyt Auth (unyt.org) on client side is responsible for keys (see [integrity checks](https://github.com/guybedford/import-maps-extensions#integrity)).


**Process flow**:
1. temporary endpoint loads auth.unyt.org in iFrame
2. Endpoint login on unyt.org
3. temporary endpoint gets endpoint identifier (and public keys TODO?)
4. to sign / encrypt and decrypt data the inter-process communication with iFrame can be used
5. data is send back to application not via proxy of unyt Auth


#### Endpoint login on unyt.org

**Process flow**:

Follow the **Restoring Process flow**. Optionally a QR-Code including the endpoint ID can be scanned to login from an external device (mobile).
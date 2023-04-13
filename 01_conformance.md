# Conformance

## Conformance with the DATEX Binary Format

A conforming implementation of the DATEX Binary Format (DXB) must provide and support all the instruction codes, values and types described in this specification.
In particular, a conforming implementation of DXB must support all types of the `std` namespace.

A conforming implementation of DXB may provide additional types, values, and scope variables beyond those described in this specification. 
However, a conforming implementation of DXB must not implement additional instructions which are not described in this specification.

A conforming implementation of DXB must provide RSA and AES encryption as described in this specification.


## Conformance with DXB-Lite

A conforming implementation of DXB-Lite may choose not to implement RSA and AES encryption.

A conforming implementation of DXB-Lite may choose not to implement all types of the `std` namespace. Hovever, a conforming implementation of DXB-Lite must at least implement all primitive types, objects, arrays, tuples and records.



## Conformance with DATEX Script

A conforming implementation of a DATEX Script compiler must be able to generate conforming DXB code.

A conforming implementation of a DATEX Script compiler must be able to parse all DATEX Script syntax described in this specification. In particular, a conforming implementation of a DATEX Script compiler must be able to parse JSON.

A conforming implementation of a DATEX Script compiler must not support any additional syntax.

A conforming implementation of a DATEX Script compiler may optimize the generated DXB code, as long as no noticable side-effects are added or removed.

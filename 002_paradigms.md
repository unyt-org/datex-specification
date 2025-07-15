# 2 Paradigms

> **Every design aspect of DATEX should respect the following design paradigms
> and constraints:**

1. Interoperability
   1. DATEX should be a superset of JSON. This means that all valid JSON
      documents should also be valid DATEX script files, and that DATEX should
      be able to represent all common JSON data types. This is important for
      interoperability with existing systems and for ease of use in applications
      that already use JSON.
   2. DATEX should be able to be implemented in a wide range of programming
      languages and platforms. This means that the core types and features of
      DATEX should be designed to be easily mapped to the most common
      programming languages. The goal is to make it easy for developers to use
      DATEX in their applications without having to learn a new language or
      framework.
2. Compact Language Design
   1. The set of core types should be as small as possible, but still be able to
      represent all common data types. All common primitive data types of the
      most common programming languages should be supported natively as core
      types. Complex struct types should be representable as combinations of
      core types.
   2. Stay as compact as possible and maximise the usefulness of a feature,
      don't implement features for a narrow use case

# Appendix: DATEX Types JavaScript Mapping

| JavaScript type | DATEX type | support | bijective | update propagation | limitations | futher information |
|---|---|---|---|---|---|---|
| [`string`]() | [`text`]() | full | yes<sup>*</sup> | yes | | |
| [`number`]() | [`decimal`]() | full | yes<sup>*</sup> | yes | | |
| [`boolean`]() | [`boolean`]() | full | yes<sup>*</sup> | yes | | |
| [`bigint`]() | [`integer/big`]() | full | no | yes<sup>*</sup> | [`integer/64`]() is always mapped to [`bigint`](). [`bigint`]() is always mapped to `bigint` |
| [`String`]() | [`text & js:String`]() | full | yes<sup>*</sup> | yes | | |
| [`Number`]() | [`decimal & js:Number`]() | full | yes<sup>*</sup> | yes | | |
| [`Boolean`]() | [`boolean & js:Boolean`]() | full | yes<sup>*</sup> | yes | | |
| [`symbol`]() | [`text & js:symbol/named`]() | full | yes | no | | For registered and well-known symbols, immutable in JavaScript | 
|              | [`text & js:symbol/anonymous`]() | full | yes | no | | For default usage of symbols without names |
| [`null`]() | [`void`]() | full | yes | yes<sup>*</sup> | | |
| [`undefined`]() | [`void & js:undefined`]() | full | yes | yes<sup>*</sup> | | |
| [`empty`]() | [`void & js:empty`]() | full | yes | yes<sup>*</sup> | | |
| [`Error`]() | | | | | | |
| [`RegExp`]() | | | | | | |
| [`Array`]() | | | | | | |
| [`Int8Array`]() | | | | | | |
| [`Uint8Array`]() | | | | | | |
| [`Uint8ClampedArray`]() | | | | | | |
| [`Int16Array`]() | | | | | | |
| [`Uint16Array`]() | | | | | | |
| [`Int32Array`]() | | | | | | |
| [`Uint32Array`]() | | | | | | |
| [`Float32Array`]() | | | | | | |
| [`Float64Array`]() | | | | | | |
| [`BigInt64Array`]() | | | | | | |
| [`BigUint64Array`]() | | | | | | |
| [`Array`]() | | | | | | |
| [`Map`]() | | | | | | |
| [`Set`]() | | | | | | |
| [`WeakMap`]() | | | | | | |
| [`WeakSet`]() | | | | | | |
| [`Object`]() | | | | | | |
| [`ArrayBuffer`]() | | | | | | |
| [`SharedArrayBuffer`]() | | | | | | |
| [`DataView`]() | | | | | | |
| [`Atomics`]() | | | | | | |
| [`WeakRef`]() | | | | | | |
| [`FinalizationRegistry`]() | | | | | | |
| [`Iterator`]() | | | | | | |
| [`AsyncIterator`]() | | | | | | |
| [`Promise`]() | | | | | | |
| [`GeneratorFunction`]() | | | | | | |
| [`AsyncGeneratorFunction`]() | | | | | | |
| [`Generator`]() | | | | | | |
| [`AsyncGenerator`]() | | | | | | |
| [`Function`]() | | | | | | |
| [`AsyncFunction`]() | | | | | | |
| [`Reflect`]() | | | | | | |
| [`Proxy`]() | | | | | | |
| [`Date`]() | | | | | | |

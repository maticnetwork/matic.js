---
'@maticnetwork/maticjs': patch
---

Give every built-in error type a message. `ErrorHelper`'s `default` branch read `this.message`, which is only assigned _from_ that same switch, so it was still `undefined` when used. Three thrown errors therefore carried no text at all: the non-object transaction-option guard (`validateTxOption_`, hit by every read/write call), the non-native-token guard (`checkForNonNative`) and the missing-bridge-adapter guard (`checkAdapterPresent`). Each now describes the problem and names the calling method, and unknown types fall back to a generic message instead of `undefined`.

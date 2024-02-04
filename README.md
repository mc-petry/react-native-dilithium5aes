<p align="center">
  <img height="120" src="./dilithium.png">
  <h1 align="center">react-native-dilithium5aes</h1>
</p>

A high-performance native implementation of the crypto Dilithium algorithm for React Native.

## Features

- ⚡ **High performance**: Native C implementation. (**[JSI](https://reactnative.dev/docs/next/the-new-architecture/cxx-cxxturbomodules)**).
- 📱 Supports **Expo**.

## Installation

```sh
npm install react-native-dilithium5aes
```

## Usage

```js
import { keyPair, sign, verify } from 'react-native-dilithium5aes'

// ...

const { publicKey, secretKey } = await keyPair()
const { signature } = await sign(message, secretKey)
const verified = await verify(signature, message, publicKey)
```

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

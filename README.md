<p align="center">
  <img height="120" src="./dilithium.png">
  <h1 align="center">react-native-dilithium5aes</h1>
</p>

A high-performance native implementation of the **[Dilithium](https://www.pq-crystals.org/dilithium/)** cryptographic signing algorithm for React Native, providing secure digital signatures with the efficiency of native C code.

## Features

- ⚡ **High Performance**: Leverages a native C implementation for maximum efficiency, utilizing the (**[JSI](https://reactnative.dev/docs/next/the-new-architecture/cxx-cxxturbomodules)**) (JavaScript Interface) for seamless React Native integration.
- 📱 **Cross-Platform Support**: Compatible with both iOS and Android platforms, ensuring a broad reach for your application.
- 🚀 **Expo Compatibility**: Supports Expo projects with easy setup via [prebuild configuration](https://docs.expo.dev/workflow/prebuild/), streamlining the development process.

## Installation

```sh
npm install react-native-dilithium5aes
```

## Usage

```js
import { keyPair, sign, verify } from 'react-native-dilithium5aes'

// Generate a new key pair
const { publicKey, secretKey } = await keyPair()

// Sign a message
const { signature } = await sign(message, secretKey)

// Verify a signature
const verified = await verify(signature, message, publicKey)
```

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

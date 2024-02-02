<p align="center" width="100%">
  <img src="./dilithium.png">
</p>

# react-native-dilithium5aes

A high-performance native implementation of the crypto Dilithium algorithm for React Native, with built-in AES encryption.

## Key Features

- High Performance: Leveraging C++ for all core functionality to ensure top-notch performance.
- Uses JSI.

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

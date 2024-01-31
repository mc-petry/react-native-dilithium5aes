import { NativeModules } from 'react-native'

interface Dilithium5aes {
  keyPair(): Promise<{ publicKey: Uint8Array; secretKey: Uint8Array }>
  sign(
    message: Uint8Array,
    secretKey: Uint8Array
  ): Promise<{ signature: Uint8Array }>
  verify(
    signature: Uint8Array,
    message: Uint8Array,
    publicKey: Uint8Array
  ): Promise<boolean>
}

const Dilithium = NativeModules.Dilithium5aes

// Call the synchronous blocking install() function
try {
  if (Dilithium.install() !== true) {
    throw new Error('Dilithium5aes JSI bindings installation failed!')
  }
} catch (e) {
  throw new Error('Dilithium5aes install error!')
}

export const { keyPair, sign, verify } = global as unknown as Dilithium5aes

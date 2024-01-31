import * as React from 'react'

import { StyleSheet, View, Text, Pressable, Alert } from 'react-native'
import { keyPair, sign, verify } from 'react-native-dilithium5aes'
import { atob } from 'react-native-quick-base64'

function _base64ToArrayBuffer(base64: string) {
  const binary_string = atob(base64)
  const len = binary_string.length
  const bytes = new Uint8Array(len)
  for (let i = 0; i < len; i++) {
    bytes[i] = binary_string.charCodeAt(i)
  }
  return bytes
}

function _utf8ToArrayBuffer(s: string) {
  const bytes = new Uint8Array(s.length)
  for (let i = 0; i < bytes.length; i++) {
    bytes[i] = s.charCodeAt(i)
  }
  return bytes
}

export default function App() {
  /**
   * https://dashlane.github.io/pqc.js/#
   */
  const testPqc = async () => {
    const publicKeyStr =
      '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'
    const signatureStr =
      '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'
    const messageStr = 'The message I want to sign.'
    console.log('x')

    const publicKey = _base64ToArrayBuffer(publicKeyStr)
    console.log('x1: ', publicKey.length)
    const signature = _base64ToArrayBuffer(signatureStr)
    console.log('x2', signature.length)
    const message = _utf8ToArrayBuffer(messageStr)
    console.log('x3')

    // const { signature } = await sign(Uint8Array.from(message), secretKey)
    const verified = await verify(signature, message, publicKey)
    console.log('x4')

    Alert.alert(verified ? '1' : '2')
  }

  return (
    <View style={styles.container}>
      <Pressable onPress={testPqc}>
        <Text>Test PQC verification</Text>
      </Pressable>
      <Pressable
        onPress={async () => {
          console.log('-----------')
          const message = [1, 3, 2, 4, 2, 3, 5, 2, 1, 3, 3, 4, 5, 0]
          const { publicKey, secretKey } = await keyPair()
          console.log('generated keypair')
          const { signature } = await sign(Uint8Array.from(message), secretKey)
          console.log('signed')
          const verified = await verify(
            signature,
            Uint8Array.from([1, 3, 2, 4, 2, 3, 5, 2, 1, 3, 3, 4, 5, 0]),
            publicKey
          )

          console.log(verified ? 'verified' : 'not verified')
        }}
      >
        <Text>Press me</Text>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
})

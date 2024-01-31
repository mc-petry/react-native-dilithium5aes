/* eslint-disable @typescript-eslint/no-shadow */
import * as React from 'react'

import { StyleSheet, View, Alert } from 'react-native'
import { keyPair, sign, verify } from 'react-native-dilithium5aes'
import { Buffer } from '@craftzdog/react-native-buffer'
import { Card } from './components/card'
import { TextField } from './components/text-field'
import { useState } from 'react'
import { Button } from './components/button'

function toBase64(value: Uint8Array) {
  return Buffer.from(value).toString('base64')
}

function fromBase64(value: string) {
  return Buffer.from(value, 'base64')
}

function fromUtf8(value: string) {
  return Buffer.from(value, 'utf8')
}

async function measure(codeBlock: () => Promise<void>) {
  const start = performance.now()
  await codeBlock()
  const end = performance.now()
  const elapsedMilliseconds = end - start
  console.log(`executed in: ${elapsedMilliseconds}ms`)
  return elapsedMilliseconds
}

const defaultMessage = 'The message I want to sign.'

/**
 * You can compare results with: https://dashlane.github.io/pqc.js/#
 */
export default function App() {
  const [publicKey, setPublicKey] = useState('')
  const [secretKey, setSecretKey] = useState('')
  const [signature, setSignature] = useState('')
  const [message, setMessage] = useState(defaultMessage)
  const clear = () => {
    setPublicKey('')
    setSecretKey('')
    setSignature('')
    setMessage(defaultMessage)
  }

  const generateKeyPair = async () => {
    const { publicKey, secretKey } = await keyPair()
    setPublicKey(toBase64(publicKey))
    setSecretKey(toBase64(secretKey))
  }

  const signMessage = async () => {
    const { signature } = await sign(fromUtf8(message), fromBase64(secretKey))
    setSignature(toBase64(signature))
  }

  const verifyMessage = async () => {
    const verified = await verify(
      fromBase64(signature),
      Buffer.from(message, 'utf8'),
      fromBase64(publicKey)
    )
    if (verified) {
      Alert.alert('Verified!')
    } else {
      Alert.alert('Wrong!')
    }
  }

  const performance100 = async () => {
    const n = 100
    const message = defaultMessage
    const result = await measure(async () => {
      for (let i = 0; i < n; i++) {
        const { publicKey, secretKey } = await keyPair()
        const { signature } = await sign(fromUtf8(message), secretKey)
        await verify(signature, fromUtf8(message), publicKey)
      }
    })
    Alert.alert(`Finished ${n} iterations in ${result}ms`)
  }

  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <Card title="Dilithium5aes">
          <TextField
            label="Public key"
            value={publicKey}
            onChangeText={setPublicKey}
          />
          <TextField
            label="Private key"
            value={secretKey}
            onChangeText={setSecretKey}
          />

          <TextField
            label="Message"
            value={message}
            onChangeText={setMessage}
          />
          <TextField
            label="Signature"
            value={signature}
            onChangeText={setSignature}
          />
          <View style={styles.actions}>
            <Button onPress={clear}>{'Clear'}</Button>
            <Button onPress={generateKeyPair}>{'Keypair'}</Button>
            <Button onPress={signMessage} disabled={!message || !secretKey}>
              {'Sign'}
            </Button>
            <Button
              onPress={verifyMessage}
              disabled={!message || !signature || !publicKey}
            >
              {'Verify'}
            </Button>
          </View>
        </Card>
        <Card title="Performance">
          <View style={styles.actions}>
            <Button onPress={performance100}>{'100 passes'}</Button>
          </View>
        </Card>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#f8f8f8',
  },
  box: {
    gap: 20,
    margin: 20,
  },
  actions: {
    flexDirection: 'row',
    gap: 20,
    justifyContent: 'space-between',
  },
})

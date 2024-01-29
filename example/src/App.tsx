import * as React from 'react'
import { useState } from 'react'

import { StyleSheet, View, Text, Pressable } from 'react-native'
import { keyPair, sign, verify } from 'react-native-dilithium5aes'

// const result = multiply(3, 7);

export default function App() {
  const [a, setA] = useState('a')

  return (
    <View style={styles.container}>
      <Text>Result: {a}</Text>
      <Pressable
        onPress={async () => {
          const message = [1, 3, 2, 4, 2, 3, 5, 2, 1, 3, 3, 4, 5, 0]
          const { secretKey, publicKey } = await keyPair()
          const { signature } = await sign(message, secretKey)

          try {
            await verify(signature, message, publicKey)
            setA('verified!')
          } catch {
            setA('not verified!')
          }
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

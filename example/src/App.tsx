import * as React from 'react';
import { useState } from 'react';

import { StyleSheet, View, Text, Pressable } from 'react-native';
import { generateKeyPair, sign } from 'react-native-dilithium5aes';

// const result = multiply(3, 7);

export default function App() {
  const [a, setA] = useState('a');

  return (
    <View style={styles.container}>
      <Text>Result: {a}</Text>
      <Pressable
        onPress={async () => {
          const { secretKey } = await generateKeyPair();
          const { signature } = await sign(
            [1, 3, 2, 4, 2, 3, 5, 2, 1, 3, 3, 4, 5, 0],
            secretKey
          );

          setA('signature: ' + signature.toString().substring(0, 10));
        }}
      >
        <Text>Press me</Text>
      </Pressable>
    </View>
  );
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
});

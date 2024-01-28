import * as React from 'react';
import { useState } from 'react';

import { StyleSheet, View, Text, Pressable, Alert } from 'react-native';
import { generateKeyPair } from 'react-native-dilithium5aes';

// const result = multiply(3, 7);

export default function App() {
  const [a, setA] = useState('a');

  return (
    <View style={styles.container}>
      <Text>Result: {a}</Text>
      <Pressable
        onPress={() => {
          generateKeyPair()
            .then(({ publicKey, secretKey }) => {
              Alert.alert('yolo');
              setA('publicKey: ' + publicKey + ' secretKey: ' + secretKey);
            })
            .catch(() => {
              console.log('catch');
              Alert.alert('catch');
              setA('c');
            });
          setA('loading');
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

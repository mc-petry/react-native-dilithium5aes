import React from 'react'
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import Clipboard from '@react-native-clipboard/clipboard'

interface Props {
  label: string
  value: string
  onChangeText: (value: string) => void
}

export function TextField({ label, ...props }: Props) {
  return (
    <View style={styles.field}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.inputWrapper}>
        <TextInput {...props} style={styles.input} />
        <TouchableOpacity
          style={styles.copy}
          onPress={() => Clipboard.setString(props.value)}
          activeOpacity={0.5}
        >
          <Image
            source={{
              uri: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAACXBIWXMAAAsTAAALEwEAmpwYAAADLklEQVR4nO2dy2oUQRSGy426cCU26f/v7gniEDHPoIIa9Ul0LS6MbyD6BF7eQwQvqFvdqgHBnSsvILoJWZS0ExGDo0736a7L/B+c7amu+qbOqS5CxzkhhBBCCCGEEEL8AwDnSd4DsEXyG0n/l9ipquqMQR7fJ7KQSnKN5LNFJg7gikUeDiRgOp0ecClQluVpAJ8XnPgL59w+gzx+KAEk70cvof3Fdlk0ABcs8nBYAT56CR3LxRujPH4EAfFK2G2UXSZ90yiPH0lAnBLaU0rHSW8Y5fEjCohPwu4Rscuk14zy+JEFxCWB5NcuEy6K4pBFHoYR0MaD1dXVgy40VhMOufjsJiAOCUsuwAeXIAEMK0ECGHYnSADDliMJYNieIAEM25glgGFPRxLAsEdUCWDY9wQJYFgJEsCwEnIRUOy5HPwJgPdRS8hFAMnjc+Z3w3gc26vsXAQAuPSn+a2vr+9vJRjvBDsJGQl46FIkFwEkfVVVZ11q5CSA5DsAR1xKZCbAk3xe1/VhlwoZCvAA3s77e9XoyFEAf4l4BOByWZYn5r0nBCdnARwhJIASoB3QB5UgqgQxglquHsDwi6kmzPALqlMQ04peDVhNmBLACH7F2gH8cW2wDeBa0zR0A9OOAWCzHVMCOPsFtgviRqYdUwI4EzCZTDC2gKIoSgngTMAYpWcvdV1XEsCgJei6BPC3JrypJtzxBST0cZA6hoZfDOo9YPnC9cVq4NALQQkIvxjUDli+cCpBlAD1gB5Ybb0Yb0Mbw1vP7EsQBryKsLj1zF7AZMDbUItbz+wFNAPehlrcemYvAMOWoN63nssgYNv6NlRNmPlHNjuAiYYEUAK0A/qgEkSVIEZQy9UDuLxNOItPFzNMfOktIJePdzNMvO4tgORdo8/Xd83jUw0Aty0EbHQc/JZFHiYcZh8HIfm0g4AtizxMNAA8dlasrKwcJfmhw0NctMjDxALAp7qup84SAKfaxAs+zMu9/8aqYx6fSgD4COCkG4LWKoAnCz7UVaM8PoWy0zTNMTc0JM+RvNMes/7jfL8zrxlxsTwxRvvMr9rTTpJf4xJCCCGEEEIIIdzYfAdG8FecfHHUZgAAAABJRU5ErkJggg==',
            }}
            style={styles.copyIcon}
          />
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  field: {},
  label: {
    marginBottom: 6,
  },
  inputWrapper: {
    flexDirection: 'row',
    // position: 'relative',
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderRightWidth: 0,
    borderColor: '#e1e1e1',
    borderRadius: 6,
    fontSize: 14,
    paddingVertical: 8,
    paddingLeft: 6,
    paddingRight: 12,
    backgroundColor: '#eee',
  },
  copy: {
    width: 36,
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#f8f8f8',
    borderTopEndRadius: 6,
    borderBottomEndRadius: 6,
    marginLeft: -6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  copyIcon: {
    width: 20,
    height: 20,
  },
})

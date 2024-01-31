import React, { type ReactNode } from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'

interface Props {
  children: ReactNode
  onPress: () => void
  disabled?: boolean
}

export function Button({ children, disabled, ...props }: Props) {
  return (
    <TouchableOpacity
      {...props}
      style={[styles.button, disabled && styles.disabled]}
      activeOpacity={0.85}
    >
      <Text style={styles.text}>{children}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    elevation: 3,
    backgroundColor: '#27d',
  },
  disabled: {
    opacity: 0.4,
  },
  text: {
    fontSize: 14,
    lineHeight: 21,
    fontWeight: '600',
    letterSpacing: 0.25,
    color: 'white',
  },
})

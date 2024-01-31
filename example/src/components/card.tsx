import type { ReactNode } from 'react'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

interface Props {
  title: string
  children?: ReactNode
}

export function Card({ title, children }: Props) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.content}>{children}</View>
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#e1e1e1',
    padding: 20,
    shadowRadius: 20,
    shadowColor: '#000',
    shadowOpacity: 0.05,
  },
  title: {
    fontSize: 20,
    fontWeight: '500',
    marginBottom: 20,
  },
  content: {
    gap: 20,
  },
})

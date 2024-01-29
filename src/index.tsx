import type DilithiumType from './NativeDilithium5aes'
const Dilithium = require('./NativeDilithium5aes')
  .default as typeof DilithiumType

export function keyPair(): Promise<{
  publicKey: number[]
  secretKey: number[]
}> {
  return Dilithium.keyPair()
}

export function sign(message: number[], sk: number[]) {
  return Dilithium.sign(message, sk)
}

export function verify(signature: number[], message: number[], pk: number[]) {
  return Dilithium.verify(signature, message, pk)
}

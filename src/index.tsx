// import type * as Dilithium from './NativeDilithium5aes'
import type Dilithium from './NativeDilithium5aes';
const Dilithium5aes = require('./NativeDilithium5aes')
  .default as typeof Dilithium;

export function generateKeyPair(): Promise<{
  publicKey: number[];
  secretKey: number[];
}> {
  return Dilithium5aes.generateKeyPair();
}

export function sign(message: number[], sk: number[]) {
  return Dilithium5aes.signMessage(message, sk);
}

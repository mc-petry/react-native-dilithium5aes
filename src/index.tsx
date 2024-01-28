const Dilithium5aes = require('./NativeDilithium5aes').default;

export function generateKeyPair(): Promise<{
  publicKey: number[];
  secretKey: number[];
}> {
  return Dilithium5aes.generateKeyPair();
}

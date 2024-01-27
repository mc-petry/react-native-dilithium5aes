const Dilithium5aes = require('./NativeDilithium5aes').default;

export function multiply(a: number, b: number): number {
  return Dilithium5aes.multiply(a, b);
}

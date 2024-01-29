import type { TurboModule } from 'react-native'
import { TurboModuleRegistry } from 'react-native'

export interface Spec extends TurboModule {
  keyPair(): Promise<{ publicKey: number[]; secretKey: number[] }>
  sign(message: number[], sk: number[]): Promise<{ signature: number[] }>
  verify(signature: number[], message: number[], pk: number[]): Promise<boolean>
}

export default TurboModuleRegistry.getEnforcing<Spec>('Dilithium5aes')

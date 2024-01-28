import type { TurboModule } from 'react-native';
import { TurboModuleRegistry } from 'react-native';

export interface Spec extends TurboModule {
  generateKeyPair(): Promise<{
    publicKey: number[];
    secretKey: number[];
  }>;
  signMessage(
    message: number[],
    sk: number[]
  ): Promise<{ signature: number[] }>;
}

export default TurboModuleRegistry.getEnforcing<Spec>('Dilithium5aes');

#import "Dilithium5aes.h"
#include "../cpp/headers/api.h"

@implementation Dilithium5aes
RCT_EXPORT_MODULE()

NSArray<NSNumber *> *convertByteArrayToNSNumberArray(const uint8_t *bytes, size_t length) {
    NSMutableArray<NSNumber *> *array = [NSMutableArray arrayWithCapacity:length];
    for (size_t i = 0; i < length; i++) {
        [array addObject:@(bytes[i])];
    }
    return [array copy];
}

// Don't compile this code when we build for the old architecture.
#ifdef RCT_NEW_ARCH_ENABLED
- (void)generateKeyPair:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject {
    NSLog(@"[Dilithium5aes] Generating key pair...");
    
    uint8_t pk[pqcrystals_dilithium5_ref_PUBLICKEYBYTES];
    uint8_t sk[pqcrystals_dilithium5_ref_SECRETKEYBYTES];

    int result = -1;

    if (dilithium5aes::generateKeyPair(pk, sk) == 0) {
        result = 0;
        
        NSArray<NSNumber *> *publicKeyArray = convertByteArrayToNSNumberArray(pk, pqcrystals_dilithium5_ref_PUBLICKEYBYTES);
        NSArray<NSNumber *> *secretKeyArray = convertByteArrayToNSNumberArray(sk, pqcrystals_dilithium5_ref_SECRETKEYBYTES);

        NSDictionary *keyPair = @{
            @"publicKey": publicKeyArray,
            @"secretKey": secretKeyArray
        };
        resolve(keyPair);
    } else {
        NSString *error = [NSString stringWithFormat:@"Key pair generation failed with error code: %d", result];
        reject(@"KEY_PAIR_ERROR", @"Error generating key pair", [NSError errorWithDomain:@"Dilithium5aesErrorDomain" code:result userInfo:@{ NSLocalizedDescriptionKey: error }]);
    }
}

- (std::shared_ptr<facebook::react::TurboModule>)getTurboModule:
    (const facebook::react::ObjCTurboModule::InitParams &)params
{
    return std::make_shared<facebook::react::NativeDilithium5aesSpecJSI>(params);
}
#endif

@end

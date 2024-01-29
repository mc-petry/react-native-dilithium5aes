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

uint8_t *convertNSArrayToUInt8Array(NSArray<NSNumber *> *array) {
    size_t arrayLength = [array count];
    uint8_t *result = (uint8_t *)malloc(arrayLength * sizeof(uint8_t));
    
    for (size_t i = 0; i < arrayLength; i++) {
        result[i] = (uint8_t)[array[i] unsignedCharValue];
    }
    
    return result;
}

// Don't compile this code when we build for the old architecture.
#ifdef RCT_NEW_ARCH_ENABLED
- (void)keyPair:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject {
    NSLog(@"[Dilithium5aes] Generating key pair...");
    
    uint8_t pk[pqcrystals_dilithium5_ref_PUBLICKEYBYTES];
    uint8_t sk[pqcrystals_dilithium5_ref_SECRETKEYBYTES];

    int result = -1;

    if (dilithium5aes::keyPair(pk, sk) == 0) {
        result = 0;
        
        NSArray<NSNumber *> *publicKeyArray = convertByteArrayToNSNumberArray(pk, pqcrystals_dilithium5_ref_PUBLICKEYBYTES);
        NSArray<NSNumber *> *secretKeyArray = convertByteArrayToNSNumberArray(sk, pqcrystals_dilithium5_ref_SECRETKEYBYTES);

        NSDictionary *keyPairValue = @{
            @"publicKey": publicKeyArray,
            @"secretKey": secretKeyArray
        };
        resolve(keyPairValue);
    } else {
        NSString *error = [NSString stringWithFormat:@"Key pair generation failed with error code: %d", result];
        reject(@"KEY_PAIR_ERROR", @"Error generating key pair", [NSError errorWithDomain:@"Dilithium5aesErrorDomain" code:result userInfo:@{ NSLocalizedDescriptionKey: error }]);
    }
}

- (void)sign:(NSArray<NSNumber *> *)message sk:(NSArray<NSNumber *> *)sk resolve:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject {
    NSLog(@"[Dilithium5aes] Signing message...");
    
    uint8_t sig[pqcrystals_dilithium5aes_ref_BYTES];
    size_t siglen = pqcrystals_dilithium5aes_ref_BYTES;
    
    // Convert NSArray to uint8_t array for message
    size_t messageDataLength = [message count];
    uint8_t *messageData = convertNSArrayToUInt8Array(message);

    // Convert NSArray to uint8_t array for sk
    size_t skDataLength = [sk count];
    uint8_t *skData = convertNSArrayToUInt8Array(sk);
    
    int result = dilithium5aes::sign(sig, &siglen, messageData, messageDataLength, skData);
    
    if (result == 0) {
        NSArray<NSNumber *> *signatureArray = convertByteArrayToNSNumberArray(sig, siglen);
        
        NSDictionary *signature = @{
            @"signature": signatureArray,
        };
        resolve(signature);
    } else {
        NSString *error = [NSString stringWithFormat:@"Signature generation failed with error code: %d", result];
        reject(@"SIGNATURE_ERROR", @"Error generating signature", [NSError errorWithDomain:@"Dilithium5aesErrorDomain" code:result userInfo:@{ NSLocalizedDescriptionKey: error }]);
    }
}

- (void)verify:(NSArray<NSNumber *> *)signature message:(NSArray<NSNumber *> *)message pk:(NSArray<NSNumber *> *)pk resolve:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject {
    NSLog(@"[Dilithium5aes] Verifying signature...");

    // Convert NSArray to uint8_t arrays
    size_t siglen = [signature count];
    uint8_t *sig = convertNSArrayToUInt8Array(signature);

    size_t messageDataLength = [message count];
    uint8_t *messageData = convertNSArrayToUInt8Array(message);

    size_t pkDataLength = [pk count];
    uint8_t *pkData = convertNSArrayToUInt8Array(pk);

    int result = dilithium5aes::verify(sig, siglen, messageData, messageDataLength, pkData);

    free(sig);
    free(messageData);
    free(pkData);

    if (result == 0) {
        resolve(@(YES)); // Signature verification successful
    } else {
        resolve(@(NO)); // Signature verification failed
    }
}

- (std::shared_ptr<facebook::react::TurboModule>)getTurboModule:
    (const facebook::react::ObjCTurboModule::InitParams &)params
{
    return std::make_shared<facebook::react::NativeDilithium5aesSpecJSI>(params);
}
#endif

@end

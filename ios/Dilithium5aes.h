#ifdef __cplusplus
#import "react-native-dilithium5aes.h"
#endif

#ifdef RCT_NEW_ARCH_ENABLED
#import "RNDilithium5aesSpec.h"

@interface Dilithium5aes : NSObject <NativeDilithium5aesSpec>
#else
#import <React/RCTBridgeModule.h>

@interface Dilithium5aes : NSObject <RCTBridgeModule>
#endif

@end

#import "Dilithium5aes.h"
#import <React/RCTBridge+Private.h>
#import <React/RCTUtils.h>
#import "react-native-dilithium5aes.h"

using namespace facebook;

@implementation Dilithium5aes
@synthesize bridge = _bridge;
@synthesize methodQueue = _methodQueue;

RCT_EXPORT_MODULE()

RCT_EXPORT_BLOCKING_SYNCHRONOUS_METHOD(install)
{
  NSLog(@"Installing Dilithium5aes bindings...");
  RCTBridge *bridge = [RCTBridge currentBridge];
  RCTCxxBridge *cxxBridge = (RCTCxxBridge *) bridge;
  if (cxxBridge == nil) {
    return @false;
  }
  if (cxxBridge.runtime == nil) {
    return @false;
  }
  installDilithium5aes(*(jsi::Runtime *)cxxBridge.runtime);
  return @true;
}

@end

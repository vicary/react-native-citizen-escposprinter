
#ifdef RCT_NEW_ARCH_ENABLED
#import "RNCitizenEscposprinterSpec.h"

@interface CitizenEscposprinter : NSObject <NativeCitizenEscposprinterSpec>
#else
#import <React/RCTBridgeModule.h>

@interface CitizenEscposprinter : NSObject <RCTBridgeModule>
#endif

- (void)getVersionCode:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject;
- (void)getVersionName:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject;

@end

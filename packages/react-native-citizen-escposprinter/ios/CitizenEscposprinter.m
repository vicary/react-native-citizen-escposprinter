#import <React/RCTBridgeModule.h>
//#import <CSJPOSLibSwift/CSJPOSPrinter.h>#import <React/RCTBridgeModule.h>

/* Argument types cheatsheet
 * | NSString                                      | string, ?string    |
 * |-----------------------------------------------|--------------------|
 * | BOOL                                          | boolean            |
 * | NSNumber                                      | ?boolean           |
 * | double                                        | number             |
 * | NSNumber                                      | ?number            |
 * | NSArray                                       | Array, ?Array      |
 * | NSDictionary                                  | Object, ?Object    |
 * | RCTResponseSenderBlock                        | Function (success) |
 * | RCTResponseSenderBlock, RCTResponseErrorBlock | Function (failure) |
 * | RCTPromiseResolveBlock, RCTPromiseRejectBlock | Promise            |
 */

#ifdef RCT_NEW_ARCH_ENABLED
#import "RNCitizenEscposprinterSpec.h"
@interface RCT_EXTERN_MODULE(CitizenEscposprinter, NSObject<NativeCitizenEscposprinterSpec>)
#else
@interface RCT_EXTERN_MODULE(CitizenEscposprinter, NSObject<RCTBridgeModule>)
#endif

//ESCPOSPrinter *printer = [[ESCPOSPrinter alloc] init];
//
//// Example method
//// See // https://reactnative.dev/docs/native-modules-ios
//RCT_EXPORT_METHOD(multiply:(double)a withB:(double)b
//                  resolver:(RCTPromiseResolveBlock)resolve
//                  rejecter:(RCTPromiseRejectBlock)reject)
//{
//    NSNumber *result = @(a * b);
//
//    resolve(result);
//}

RCT_EXTERN_METHOD(getVersionCode
                  :(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(getVersionName
                  :(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject);

// Don't compile this code when we build for the old architecture.
#ifdef RCT_NEW_ARCH_ENABLED
- (std::shared_ptr<facebook::react::TurboModule>)getTurboModule:
    (const facebook::react::ObjCTurboModule::InitParams &)params
{
    return std::make_shared<facebook::react::NativeCitizenEscposprinterSpecJSI>(params);
}
#endif

@end

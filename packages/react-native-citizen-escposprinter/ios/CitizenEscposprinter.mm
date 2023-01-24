#import "CitizenEscposprinter.h"
#import "ESCPOSPrinter.h"

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

@implementation CitizenEscposprinter
RCT_EXPORT_MODULE()

RCT_EXPORT_METHOD(getVersionCode
                 :(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject)
{
    resolve(@([[ESCPOSPrinter alloc] getVersionCode]));
}

RCT_EXPORT_METHOD(getVersionName
                 :(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject)
{
    resolve([[ESCPOSPrinter alloc] getVersionName]);
}

// Example method
// See // https://reactnative.dev/docs/native-modules-ios
RCT_EXPORT_METHOD(multiply:(double)a withB:(double)b
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
    NSNumber *result = @(a * b);

    resolve(result);
}

// Don't compile this code when we build for the old architecture.
#ifdef RCT_NEW_ARCH_ENABLED
- (std::shared_ptr<facebook::react::TurboModule>)getTurboModule:
    (const facebook::react::ObjCTurboModule::InitParams &)params
{
    return std::make_shared<facebook::react::NativeCitizenEscposprinterSpecJSI>(params);
}
#endif

@end

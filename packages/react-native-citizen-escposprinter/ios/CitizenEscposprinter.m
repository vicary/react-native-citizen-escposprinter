#import <React/RCTBridgeModule.h>
#include <sys/wait.h>

/* Argument types cheatsheet
 * | Objective C                                   | JavaScript         |
 * |-----------------------------------------------|--------------------|
 * | NSString                                      | string, ?string    |
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

+ (BOOL)requiresMainQueueSetup { return NO; }

RCT_EXTERN_METHOD(connect
                  :          (double)                 type
                  toAddress: (NSString *)             address
                  withPort:  (double)             port
                  waitFor:   (double)             timeout
                  resolver:  (RCTPromiseResolveBlock) resolve
                  rejecter:  (RCTPromiseRejectBlock)  reject)

RCT_EXTERN_METHOD(disconnect
                  :         (RCTPromiseResolveBlock) resolve
                  rejecter: (RCTPromiseRejectBlock)  reject)

RCT_EXTERN_METHOD(setEncoding
                  :         (NSString *)             charset
                  resolver: (RCTPromiseResolveBlock) resolve
                  rejecter: (RCTPromiseRejectBlock)  reject)

RCT_EXTERN_METHOD(printerCheck
                  :         (RCTPromiseResolveBlock) resolve
                  rejecter: (RCTPromiseRejectBlock)  reject)

RCT_EXTERN_METHOD(status
                  :         (RCTPromiseResolveBlock) resolve
                  rejecter: (RCTPromiseRejectBlock)  reject)

RCT_EXTERN_METHOD(printText
                  :              (NSString *)             data
                  alignedTo:     (double)                 side
                  withFontStyle: (double)                 attr
                  ofSize:        (double)                 size
                  resolver:      (RCTPromiseResolveBlock) resolve
                  rejecter:      (RCTPromiseRejectBlock)  reject)

RCT_EXTERN_METHOD(printPaddingText
                  :              (NSString *)             data
                  withFontStyle: (double)                 attr
                  ofSize:        (double)                 size
                  paddedTo:      (double)                 length
                  alignedTo:     (double)                 side
                  resolver:      (RCTPromiseResolveBlock) resolve
                  rejecter:      (RCTPromiseRejectBlock)  reject)

RCT_EXTERN_METHOD(printTextLocalFont
                  :              (NSString *)             data
                  alignedTo:     (double)                 side
                  withTypeface:  (NSString *)             typeface
                  ofSize:        (double)                 size
                  withFontStyle: (double)                 attr
                  withHRatio:    (double)                 hRatio
                  withVRatio:    (double)                 vRatio
                  resolver:      (RCTPromiseResolveBlock) resolve
                  rejecter:      (RCTPromiseRejectBlock)  reject)

RCT_EXTERN_METHOD(printBitmap
                  :              (NSString *)             data
                  inWidth:       (double)                 size
                  alignedTo:     (double)                 side
                  withBlendMode: (double)                 mode
                  resolver:      (RCTPromiseResolveBlock) resolve
                  rejecter:      (RCTPromiseRejectBlock)  reject)

RCT_EXTERN_METHOD(printNVBitmap
                  :         (double)                 imageId
                  resolver: (RCTPromiseResolveBlock) resolve
                  rejecter: (RCTPromiseRejectBlock)  reject)

RCT_EXTERN_METHOD(printBarcode
                  :                 (NSString *)             data
                  withSymbology:    (double)                 symbology
                  inHeight:         (double)                 height
                  inWidth:          (double)                 width
                  alignedTo:        (double)                 side
                  withTextPosition: (double)                 textPosition
                  resolver:         (RCTPromiseResolveBlock) resolve
                  rejecter:         (RCTPromiseRejectBlock)  reject)

RCT_EXTERN_METHOD(printPDF417
                  :                (NSString *)             data
                  withDigits:      (double)                 digits
                  withSteps:       (double)                 steps
                  withModuleWidth: (double)                 width
                  withStepHeight:  (double)                 height
                  withECLevel:     (double)                 ecLevel
                  alignedTo:       (double)                 side
                  resolver:        (RCTPromiseResolveBlock) resolve
                  rejecter:        (RCTPromiseRejectBlock)  reject)

RCT_EXTERN_METHOD(printQRCode
                  :               (NSString *)             data
                  withModuleSize: (double)                 size
                  withECLevel:    (double)                 ecLevel
                  alignedTo:      (double)                 side
                  resolver:       (RCTPromiseResolveBlock) resolve
                  rejecter:       (RCTPromiseRejectBlock)  reject)

RCT_EXTERN_METHOD(printGS1DataBarStacked
                  :               (NSString *)             data
                  withSymbology:  (double)                 symbology
                  withModuleSize: (double)                 size
                  withMaxWidth:   (double)                 maxWidth
                  alignedTo:      (double)                 side
                  resolver:       (RCTPromiseResolveBlock) resolve
                  rejecter:       (RCTPromiseRejectBlock)  reject)

RCT_EXTERN_METHOD(cutPaper
                  :         (double)                 percentage
                  resolver: (RCTPromiseResolveBlock) resolve
                  rejecter: (RCTPromiseRejectBlock)  reject)

RCT_EXTERN_METHOD(unitFeed
                  :         (double)                 dots
                  resolver: (RCTPromiseResolveBlock) resolve
                  rejecter: (RCTPromiseRejectBlock)  reject)

RCT_EXTERN_METHOD(markFeed
                  :         (double)                 type
                  resolver: (RCTPromiseResolveBlock) resolve
                  rejecter: (RCTPromiseRejectBlock)  reject)

RCT_EXTERN_METHOD(openDrawer
                  :                (double)                 drawer
                  withPulseLength: (double)                 pulseLength
                  resolver:        (RCTPromiseResolveBlock) resolve
                  rejecter:        (RCTPromiseRejectBlock)  reject)

RCT_EXTERN_METHOD(transactionPrint
                  :         (double)                 control
                  resolver: (RCTPromiseResolveBlock) resolve
                  rejecter: (RCTPromiseRejectBlock)  reject)

RCT_EXTERN_METHOD(rotatePrint
                  :         (double)                 rotation
                  resolver: (RCTPromiseResolveBlock) resolve
                  rejecter: (RCTPromiseRejectBlock)  reject)

RCT_EXTERN_METHOD(pageModePrint
                  :         (double)                 control
                  resolver: (RCTPromiseResolveBlock) resolve
                  rejecter: (RCTPromiseRejectBlock)  reject)

RCT_EXTERN_METHOD(clearPrintArea
                  :         (RCTPromiseResolveBlock) resolve
                  rejecter: (RCTPromiseRejectBlock)  reject)

RCT_EXTERN_METHOD(clearOutput
                  :         (RCTPromiseResolveBlock) resolve
                  rejecter: (RCTPromiseRejectBlock)  reject)

RCT_EXTERN_METHOD(printData
                  :           (NSString *)             data
                  withLength: (double)                 size
                  resolver:   (RCTPromiseResolveBlock) resolve
                  rejecter:   (RCTPromiseRejectBlock)  reject)

RCT_EXTERN_METHOD(printNormal
                  :         (NSString *) data
                  resolver: (RCTPromiseResolveBlock)       resolve
                  rejecter: (RCTPromiseRejectBlock)        reject)

RCT_EXTERN_METHOD(watermarkPrint
                  :                  (double)                 start
                  withNVImageNumber: (double)                 imageId
                  withPass:          (double)                 pass
                  withFeed:          (double)                 feed
                  withRepeat:        (double)                 repeat
                  resolver:          (RCTPromiseResolveBlock) resolve
                  rejecter:          (RCTPromiseRejectBlock)  reject)

RCT_EXTERN_METHOD(searchCitizenPrinter
                  :               (double)                 connectType
                  withSearchTime: (double)                 time
                  resolver:       (RCTPromiseResolveBlock) resolve
                  rejecter:       (RCTPromiseRejectBlock)  reject)

RCT_EXTERN_METHOD(searchESCPOSPrinter
                  :               (double)                 connectType
                  withSearchTime: (double)                 time
                  resolver:       (RCTPromiseResolveBlock) resolve
                  rejecter:       (RCTPromiseRejectBlock)  reject)

RCT_EXTERN_METHOD(printerCheckEx
                  :          (double)                 connectType
                  toAddress: (NSString *)             address
                  withPort:  (double)             port
                  waitFor:   (double)             timeout
                  resolver:  (RCTPromiseResolveBlock) resolve
                  rejecter:  (RCTPromiseRejectBlock)  reject)

RCT_EXTERN_METHOD(openDrawerEx
                  :                (double)                 drawer
                  withPulseLength: (double)                 pulseLength
                  connectType:     (double)                 type
                  toAddress:       (NSString *)             address
                  withPort:        (double)             port
                  waitFor:         (double)             timeout
                  resolver:        (RCTPromiseResolveBlock) resolve
                  rejecter:        (RCTPromiseRejectBlock)  reject)

RCT_EXTERN_METHOD(setPrintCompletedTimeout
                  :         (double)                 timeout
                  resolver: (RCTPromiseResolveBlock) resolve
                  rejecter: (RCTPromiseRejectBlock)  reject)

RCT_EXTERN_METHOD(setLog
                  :         (double)                 mode
                  withPath: (NSString *)             path
                  limitTo:  (double)                 size
                  resolver: (RCTPromiseResolveBlock) resolve
                  rejecter: (RCTPromiseRejectBlock)  reject)

RCT_EXTERN_METHOD(getVersionCode
                  :         (RCTPromiseResolveBlock) resolve
                  rejecter: (RCTPromiseRejectBlock)  reject)

RCT_EXTERN_METHOD(getVersionName
                  :         (RCTPromiseResolveBlock) resolve
                  rejecter: (RCTPromiseRejectBlock)  reject)

RCT_EXTERN_METHOD(getPageModeArea
                  :         (RCTPromiseResolveBlock) resolve
                  rejecter: (RCTPromiseRejectBlock)  reject)

RCT_EXTERN_METHOD(setPageModeArea
                  :         (NSString *)             area
                  resolver: (RCTPromiseResolveBlock) resolve
                  rejecter: (RCTPromiseRejectBlock)  reject)

RCT_EXTERN_METHOD(getPageModePrintDirection
                  :         (RCTPromiseResolveBlock) resolve
                  rejecter: (RCTPromiseRejectBlock)  reject)

RCT_EXTERN_METHOD(setPageModePrintDirection
                  :         (double)                 direction
                  resolver: (RCTPromiseResolveBlock) resolve
                  rejecter: (RCTPromiseRejectBlock)  reject)

RCT_EXTERN_METHOD(getPageModeHorizontalPosition
                  :         (RCTPromiseResolveBlock) resolve
                  rejecter: (RCTPromiseRejectBlock)  reject)

RCT_EXTERN_METHOD(setPageModeHorizontalPosition
                  :         (double)                 position
                  resolver: (RCTPromiseResolveBlock) resolve
                  rejecter: (RCTPromiseRejectBlock)  reject)

RCT_EXTERN_METHOD(getPageModeVerticalPosition
                  :         (RCTPromiseResolveBlock) resolve
                  rejecter: (RCTPromiseRejectBlock)  reject)

RCT_EXTERN_METHOD(setPageModeVerticalPosition
                  :         (double)                 position
                  resolver: (RCTPromiseResolveBlock) resolve
                  rejecter: (RCTPromiseRejectBlock)  reject)

RCT_EXTERN_METHOD(getRecLineSpacing
                  :         (RCTPromiseResolveBlock) resolve
                  rejecter: (RCTPromiseRejectBlock)  reject)

RCT_EXTERN_METHOD(setRecLineSpacing
                  :         (double)                 spacing
                  resolver: (RCTPromiseResolveBlock) resolve
                  rejecter: (RCTPromiseRejectBlock)  reject)

RCT_EXTERN_METHOD(getMapMode
                  :         (RCTPromiseResolveBlock) resolve
                  rejecter: (RCTPromiseRejectBlock)  reject)

RCT_EXTERN_METHOD(setMapMode
                  :         (double)                 mode
                  resolver: (RCTPromiseResolveBlock) resolve
                  rejecter: (RCTPromiseRejectBlock)  reject)

// Don't compile this code when we build for the old architecture.
#ifdef RCT_NEW_ARCH_ENABLED
- (std::shared_ptr<facebook::react::TurboModule>)getTurboModule:(const facebook::react::ObjCTurboModule::InitParams &)params {
    return std::make_shared<facebook::react::NativeCitizenEscposprinterSpecJSI>(params);
}
#endif

@end

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
                  withPort:  (double)                 port
                  waitFor:   (double)                 timeout
                  resolver:  (RCTPromiseResolveBlock) resolve
                  rejecter:  (RCTPromiseRejectBlock)  reject)

RCT_EXTERN_METHOD(disconnect
                  :         (double)                 printerId
                  resolver: (RCTPromiseResolveBlock) resolve
                  rejecter: (RCTPromiseRejectBlock)  reject)

RCT_EXTERN_METHOD(setEncoding
                  :         (double)                 printerId
                  to:       (NSString *)             charset
                  resolver: (RCTPromiseResolveBlock) resolve
                  rejecter: (RCTPromiseRejectBlock)  reject)

RCT_EXTERN_METHOD(printerCheck
                  :         (double)                 printerId
                  resolver: (RCTPromiseResolveBlock) resolve
                  rejecter: (RCTPromiseRejectBlock)  reject)

RCT_EXTERN_METHOD(status
                  :         (double)                 printerId
                  ofType:   (double)                 status
                  resolver: (RCTPromiseResolveBlock) resolve
                  rejecter: (RCTPromiseRejectBlock)  reject)

RCT_EXTERN_METHOD(printText
                  :              (double)                 printerId
                  withData:      (NSString *)             data
                  alignedTo:     (double)                 side
                  withFontStyle: (double)                 attr
                  ofSize:        (double)                 size
                  resolver:      (RCTPromiseResolveBlock) resolve
                  rejecter:      (RCTPromiseRejectBlock)  reject)

RCT_EXTERN_METHOD(printPaddingText
                  :              (double)                 printerId
                  withData:      (NSString *)             data
                  withFontStyle: (double)                 attr
                  ofSize:        (double)                 size
                  paddedTo:      (double)                 length
                  alignedTo:     (double)                 side
                  resolver:      (RCTPromiseResolveBlock) resolve
                  rejecter:      (RCTPromiseRejectBlock)  reject)

RCT_EXTERN_METHOD(printTextLocalFont
                  :              (double)                 printerId
                  withData:      (NSString *)             data
                  alignedTo:     (double)                 side
                  withTypeface:  (NSString *)             typeface
                  ofSize:        (double)                 size
                  withFontStyle: (double)                 attr
                  withHRatio:    (double)                 hRatio
                  withVRatio:    (double)                 vRatio
                  resolver:      (RCTPromiseResolveBlock) resolve
                  rejecter:      (RCTPromiseRejectBlock)  reject)

RCT_EXTERN_METHOD(printBitmap
                  :              (double)                 printerId
                  withData:      (NSString *)             data
                  inWidth:       (double)                 size
                  alignedTo:     (double)                 side
                  withBlendMode: (double)                 mode
                  resolver:      (RCTPromiseResolveBlock) resolve
                  rejecter:      (RCTPromiseRejectBlock)  reject)

RCT_EXTERN_METHOD(printNVBitmap
                  :            (double)                 printerId
                  withImageId: (double)                 imageId
                  resolver:    (RCTPromiseResolveBlock) resolve
                  rejecter:    (RCTPromiseRejectBlock)  reject)

RCT_EXTERN_METHOD(printBarcode
                  :                 (double)                 printerId
                  withData:         (NSString *)             data
                  withSymbology:    (double)                 symbology
                  inHeight:         (double)                 height
                  inWidth:          (double)                 width
                  alignedTo:        (double)                 side
                  withTextPosition: (double)                 textPosition
                  resolver:         (RCTPromiseResolveBlock) resolve
                  rejecter:         (RCTPromiseRejectBlock)  reject)

RCT_EXTERN_METHOD(printPDF417
                  :                (double)                 printerId
                  withData:        (NSString *)             data
                  withDigits:      (double)                 digits
                  withSteps:       (double)                 steps
                  withModuleWidth: (double)                 width
                  withStepHeight:  (double)                 height
                  withECLevel:     (double)                 ecLevel
                  alignedTo:       (double)                 side
                  resolver:        (RCTPromiseResolveBlock) resolve
                  rejecter:        (RCTPromiseRejectBlock)  reject)

RCT_EXTERN_METHOD(printQRCode
                  :               (double)                 printerId
                  withData:       (NSString *)             data
                  withModuleSize: (double)                 size
                  withECLevel:    (double)                 ecLevel
                  alignedTo:      (double)                 side
                  resolver:       (RCTPromiseResolveBlock) resolve
                  rejecter:       (RCTPromiseRejectBlock)  reject)

RCT_EXTERN_METHOD(printGS1DataBarStacked
                  :               (double)                 printerId
                  withData:       (NSString *)             data
                  withSymbology:  (double)                 symbology
                  withModuleSize: (double)                 size
                  withMaxWidth:   (double)                 maxWidth
                  alignedTo:      (double)                 side
                  resolver:       (RCTPromiseResolveBlock) resolve
                  rejecter:       (RCTPromiseRejectBlock)  reject)

RCT_EXTERN_METHOD(cutPaper
                  :         (double)                 printerId
                  to:       (double)                 percentage
                  resolver: (RCTPromiseResolveBlock) resolve
                  rejecter: (RCTPromiseRejectBlock)  reject)

RCT_EXTERN_METHOD(unitFeed
                  :         (double)                 printerId
                  forDots:  (double)                 dots
                  resolver: (RCTPromiseResolveBlock) resolve
                  rejecter: (RCTPromiseRejectBlock)  reject)

RCT_EXTERN_METHOD(markFeed
                  :         (double)                 printerId
                  ofType:   (double)                 type
                  resolver: (RCTPromiseResolveBlock) resolve
                  rejecter: (RCTPromiseRejectBlock)  reject)

RCT_EXTERN_METHOD(openDrawer
                  :                (double)                 printerId
                  at:              (double)                 drawer
                  withPulseLength: (double)                 pulseLength
                  resolver:        (RCTPromiseResolveBlock) resolve
                  rejecter:        (RCTPromiseRejectBlock)  reject)

RCT_EXTERN_METHOD(transactionPrint
                  :         (double)                 printerId
                  at:       (double)                 control
                  resolver: (RCTPromiseResolveBlock) resolve
                  rejecter: (RCTPromiseRejectBlock)  reject)

RCT_EXTERN_METHOD(rotatePrint
                  :         (double)                 printerId
                  to:       (double)                 rotation
                  resolver: (RCTPromiseResolveBlock) resolve
                  rejecter: (RCTPromiseRejectBlock)  reject)

RCT_EXTERN_METHOD(pageModePrint
                  :         (double)                 printerId
                  at:       (double)                 control
                  resolver: (RCTPromiseResolveBlock) resolve
                  rejecter: (RCTPromiseRejectBlock)  reject)

RCT_EXTERN_METHOD(clearPrintArea
                  :         (double)                 printerId
                  resolver: (RCTPromiseResolveBlock) resolve
                  rejecter: (RCTPromiseRejectBlock)  reject)

RCT_EXTERN_METHOD(clearOutput
                  :         (double)                 printerId
                  resolver: (RCTPromiseResolveBlock) resolve
                  rejecter: (RCTPromiseRejectBlock)  reject)

RCT_EXTERN_METHOD(printData
                  :           (double)                 printerId
                  withData:   (NSString *)             data
                  withLength: (double)                 size
                  resolver:   (RCTPromiseResolveBlock) resolve
                  rejecter:   (RCTPromiseRejectBlock)  reject)

RCT_EXTERN_METHOD(printNormal
                  :         (double)                   printerId
                  withData: (NSString *)               data
                  resolver: (RCTPromiseResolveBlock)   resolve
                  rejecter: (RCTPromiseRejectBlock)    reject)

RCT_EXTERN_METHOD(watermarkPrint
                  :                  (double)                 printerId
                  at:                (double)                 start
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
                  :          (double)                 printerId
                  ofType:    (double)                 connectType
                  toAddress: (NSString *)             address
                  withPort:  (double)             port
                  waitFor:   (double)             timeout
                  resolver:  (RCTPromiseResolveBlock) resolve
                  rejecter:  (RCTPromiseRejectBlock)  reject)

RCT_EXTERN_METHOD(openDrawerEx
                  :                (double)                 printerId
                  at:              (double)                 drawer
                  withPulseLength: (double)                 pulseLength
                  connectType:     (double)                 type
                  toAddress:       (NSString *)             address
                  withPort:        (double)             port
                  waitFor:         (double)             timeout
                  resolver:        (RCTPromiseResolveBlock) resolve
                  rejecter:        (RCTPromiseRejectBlock)  reject)

RCT_EXTERN_METHOD(setPrintCompletedTimeout
                  :         (double)                 printerId
                  to:       (double)                 timeout
                  resolver: (RCTPromiseResolveBlock) resolve
                  rejecter: (RCTPromiseRejectBlock)  reject)

RCT_EXTERN_METHOD(setLog
                  :         (double)                 printerId
                  toMode:   (double)                 mode
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
                  :         (double)                 printerId
                  resolver: (RCTPromiseResolveBlock) resolve
                  rejecter: (RCTPromiseRejectBlock)  reject)

RCT_EXTERN_METHOD(getPageModePrintDirection
                  :         (double)                 printerId
                  resolver: (RCTPromiseResolveBlock) resolve
                  rejecter: (RCTPromiseRejectBlock)  reject)

RCT_EXTERN_METHOD(setPageModePrintDirection
                  :         (double)                 printerId
                  to:       (double)                 direction
                  resolver: (RCTPromiseResolveBlock) resolve
                  rejecter: (RCTPromiseRejectBlock)  reject)

RCT_EXTERN_METHOD(getPageModeHorizontalPosition
                  :         (double)                 printerId
                  resolver: (RCTPromiseResolveBlock) resolve
                  rejecter: (RCTPromiseRejectBlock)  reject)

RCT_EXTERN_METHOD(setPageModeHorizontalPosition
                  :         (double)                 printerId
                  to:       (double)                 position
                  resolver: (RCTPromiseResolveBlock) resolve
                  rejecter: (RCTPromiseRejectBlock)  reject)

RCT_EXTERN_METHOD(getPageModeVerticalPosition
                  :         (double)                 printerId
                  resolver: (RCTPromiseResolveBlock) resolve
                  rejecter: (RCTPromiseRejectBlock)  reject)

RCT_EXTERN_METHOD(setPageModeVerticalPosition
                  :         (double)                 printerId
                  to:       (double)                 position
                  resolver: (RCTPromiseResolveBlock) resolve
                  rejecter: (RCTPromiseRejectBlock)  reject)

RCT_EXTERN_METHOD(getRecLineSpacing
                  :         (double)                 printerId
                  resolver: (RCTPromiseResolveBlock) resolve
                  rejecter: (RCTPromiseRejectBlock)  reject)

RCT_EXTERN_METHOD(setRecLineSpacing
                  :         (double)                 printerId
                  to:       (double)                 spacing
                  resolver: (RCTPromiseResolveBlock) resolve
                  rejecter: (RCTPromiseRejectBlock)  reject)

RCT_EXTERN_METHOD(getMapMode
                  :         (double)                 printerId
                  resolver: (RCTPromiseResolveBlock) resolve
                  rejecter: (RCTPromiseRejectBlock)  reject)

RCT_EXTERN_METHOD(setMapMode
                  :         (double)                 printerId
                  to:       (double)                 mode
                  resolver: (RCTPromiseResolveBlock) resolve
                  rejecter: (RCTPromiseRejectBlock)  reject)

// Don't compile this code when we build for the old architecture.
#ifdef RCT_NEW_ARCH_ENABLED
- (std::shared_ptr<facebook::react::TurboModule>)getTurboModule:(const facebook::react::ObjCTurboModule::InitParams &)params {
    return std::make_shared<facebook::react::NativeCitizenEscposprinterSpecJSI>(params);
}
#endif

@end

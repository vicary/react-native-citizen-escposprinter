
#ifdef RCT_NEW_ARCH_ENABLED
#import "RNCitizenEscposprinterSpec.h"

@interface CitizenEscposprinter : NSObject <NativeCitizenEscposprinterSpec>
#else
#import <React/RCTBridgeModule.h>

@interface CitizenEscposprinter : NSObject <RCTBridgeModule>
#endif

@end

//
//  LineDisplay.h
//  CSJTSOLib_iOS
//
//  Created by CITIZEN SYSTEMS on 2017/12/27.
//

#ifndef LineDisplay_h
#define LineDisplay_h

// ///////////////////////////////////////////////////////////////////
// ErrorCode Constants
// ///////////////////////////////////////////////////////////////////
#define CDP_SUCCESS                 0
#define CDP_E_CONNECTED             1001
#define CDP_E_DISCONNECT            1002
#define CDP_E_NOTCONNECT            1003
#define CDP_E_CONNECT_NOTFOUND      1004
#define CDP_E_CONNECT_OFFLINE       1005
#define CDP_E_ILLEGAL               1101
#define CDP_E_OFFLINE               1102
#define CDP_E_NOEXIST               1103
#define CDP_E_FAILURE               1104
#define CDP_E_TIMEOUT               1105
#define CDP_E_NO_LIST               1106
#define CDP_EPTR_COVER_OPEN         1201
#define CDP_EPTR_REC_EMPTY          1202
#define CDP_EPTR_BADFORMAT          1203
#define CDP_EPTR_TOOBIG             1204

// ///////////////////////////////////////////////////////////////////
// "connect" Method: "connectType" Parameter Constants
// ///////////////////////////////////////////////////////////////////
#define CDP_PORT_WiFi               0
#define CDP_PORT_BLUETOOTH          1
#define CDP_PORT_USB                3


// ///////////////////////////////////////////////////////////////////
// "clearDisplay"Method: "displayArea" Parameter Constants
// ///////////////////////////////////////////////////////////////////
#define CDP_AREA_ALL                0
#define CDP_AREA_CURSORLINE         1

// ///////////////////////////////////////////////////////////////////
// "setDisplayMode"Method: "displayMode" Parameter Constants
// ///////////////////////////////////////////////////////////////////
#define CDP_OVERWRITE               1
#define CDP_VERTICALSCROLL          2
#define CDP_HORIZONTALSCROLL        3

// ///////////////////////////////////////////////////////////////////
// "setCursorType"Method: "sursorType" Parameter Constants
// ///////////////////////////////////////////////////////////////////
#define CDP_TYPE_NONE               0
#define CDP_TYPE_UNDERLINE          1

@interface CSJLineDisplay : NSObject

- (int) connect:(int)connectType withAddrress:(NSString*)addr;
- (int) connect:(int)connectType withAddrress:(NSString*)addr withPort:(int)port;
- (int) connect:(int)connectType withAddrress:(NSString*)addr withPort:(int)port withTimeout:(int)timeout;
- (int) disconnect;
- (int) displayText:(NSString*)data;
- (int) displayText:(NSString*)data reverseFlag:(Boolean)flag;
- (int) clearDisplay:(int)displayArea;
- (int) blinkDisplay:(unsigned int)intervalBlinkg;
- (int) setDisplayMode:(int)displayMode;
- (int) setDisplayConfig:(unsigned int)brightness;
- (int) setCursorPosition:(unsigned int)x y:(unsigned int)y;
- (int) moveCursor:(int)dx y:(int)dy;
- (int) setCursorType;
- (int) setCursorType:(unsigned int)sursorType;
- (int) initializeDisplay;
- (int) displayData:(unsigned char*)data withLength:(unsigned long)length;
- (int) displayByteData:(NSData*)data withLength:(unsigned long)length;
- (int) setEncoding:(NSStringEncoding)charset;
- (int) setEncoding2:(NSString*)encode;
- (int) setCodePage:(unsigned int)codePage;
- (int) setInternationalCharacterset:(unsigned int)characterset;
- (int) getVersionCode;
- (NSString *) getVersionName;
- (int) displayCheck;

- (int) setLog:(int)mode withPath:(NSString*)path withMaxSize:(int)maxSize;    // Added v2.10

@end

#endif /* LineDisplay_h */

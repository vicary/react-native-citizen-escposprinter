//
//  Scanner.h
//  CSJTSOLib_iOS
//
//  Created by CITIZEN SYSTEMS on 2017/12/27.
//

#ifndef Scanner_h
#define Scanner_h

// ///////////////////////////////////////////////////////////////////
// ErrorCode Constants
// ///////////////////////////////////////////////////////////////////
#define CSC_SUCCESS                     0
#define CSC_E_CONNECTED                 1001
#define CSC_E_DISCONNECT                1002
#define CSC_E_NOTCONNECT                1003
#define CSC_E_CONNECT_NOTFOUND          1004
#define CSC_E_CONNECT_OFFLINE           1005
#define CSC_E_ILLEGAL                   1101
#define CSC_E_OFFLINE                   1102
#define CSC_E_NOEXIST                   1103
#define CSC_E_FAILURE                   1104
#define CSC_E_TIMEOUT                   1105
#define CSC_E_NO_LIST                   1106
#define CSC_EPTR_COVER_OPEN             1201
#define CSC_EPTR_REC_EMPTY              1202
#define CSC_EPTR_BADFORMAT              1203
#define CSC_EPTR_TOOBIG                 1204

// ///////////////////////////////////////////////////////////////////
// ErrorCode Extended Constants (Added v2.10.6)
// ///////////////////////////////////////////////////////////////////
#define CSC_EX_DEV_NO_PRINTER       62000   // プリンター未接続(SNMP応答無し/Lightning未認識)
#define CSC_EX_DEV_NO_DEVICE        62001   // 周辺機器デバイス未接続
#define CSC_EX_DEV_USING            62002   // 周辺機器デバイス使用中
#define CSC_EX_DEV_CONFIRM          62003   // 周辺機器デバイス接続後確認失敗(WiFiのみ)
#define CSC_EX_DEV_NO_STREAMNO      62011   // ストリーム番号一致なし(Lightningのみ)
#define CSC_EX_DEV_NO_SERIALNO      62012   // プリンターシリアル番号一致なし(Lightningのみ)
#define CSC_EX_DEV_STATUS_GET_ERROR 62013   // 周辺機器デバイス情報取得失敗(v2.10.5追加)
#define CSC_EX_DEV_OPEN_ERROR       62100   // ソケットまたはストリーム接続失敗

// ///////////////////////////////////////////////////////////////////
// "connect" Method: "connectType" Parameter Constants
// ///////////////////////////////////////////////////////////////////
#define CSC_PORT_WiFi                   0
#define CSC_PORT_BLUETOOTH              1
#define CSC_PORT_USB                    3

// ///////////////////////////////////////////////////////////////////
// Status change event
// ///////////////////////////////////////////////////////////////////
#define CSC_SUE_POWER_ONLINE            2001
#define CSC_SUE_POWER_OFF               2002

//@protocol ScannerEventDelegate <NSObject>
@protocol CSJScannerEventDelegate <NSObject>
@optional
- (void) dataEventCallback:(NSData*)data;
- (void) statusUpdateEventCallback:(int)status;
@end

typedef void (^DataListener)(NSData* data);
typedef void (^StatusUpdateListener)(int status);

@interface CSJScanner : NSObject

- (int) connect:(int)connectType withAddrress:(NSString*)addr;
- (int) connect:(int)connectType withAddrress:(NSString*)addr withPort:(int)port;
- (int) connect:(int)connectType withAddrress:(NSString*)addr withPort:(int)port withTimeout:(int)timeout;
- (int) disconnect;
- (int) setDataEventCallback:(id)callback;
- (int) setDataEventCallback:(id)callback terminator:(NSString*)terminator;
- (int) setDataEventCallback:(id)callback selector:(NSString*)selector;
- (int) setDataEventCallback2:(DataListener)listener;
- (int) setDataEventCallback2:(DataListener)listener terminator:(NSString*)terminator;
- (int) setDataEventCallback2:(DataListener)listener selector:(NSString*)selector;
- (int) setStatusUpdateEventCallback:(id)callback;
- (int) setStatusUpdateEventCallback2:(StatusUpdateListener)listener;
- (int) getVersionCode;
- (NSString *) getVersionName;
- (int) getErrorCodeExtended;               // Add v2.10.6

- (int) setLog:(int)mode withPath:(NSString*)path withMaxSize:(int)maxSize;    // Added v2.10

@end

#endif /* Scanner_h */

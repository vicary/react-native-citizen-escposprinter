//
//  CSJCashChangerBase.h
//
//  Created by CITIZEN SYSTEMS on 2019/10/24.
//

#ifndef CSJCashChangerBase_h
#define CSJCashChangerBase_h

// ///////////////////////////////////////////////////////////////////
// ConnectPort Constants
// ///////////////////////////////////////////////////////////////////
#define CCH_PORT_WiFi       0
#define CCH_PORT_Bluetooth  1
//#define CCH_PORT_Bluetooth_Insecure = 2; //Androidのみ
#define CCH_PORT_USB        3
//#define CCH_PORT_COM = 4;                //Printerのみ
//#define CCH_PORT_LPT = 5;                //Printerのみ
//#define CCH_PORT_SNMP = 6;               //Printerのみ

// ///////////////////////////////////////////////////////////////////
// ErrorCode Constants
// ///////////////////////////////////////////////////////////////////
#define CCH_SUCCESS                 0
#define CCH_E_CONNECTED             1001
#define CCH_E_DISCONNECT            1002
#define CCH_E_NOTCONNECT            1003
#define CCH_E_CONNECT_NOTFOUND      1004
#define CCH_E_CONNECT_OFFLINE       1005
//#define CCH_E_NOCONTEXT           1006    //Androidのみ
#define CCH_E_BT_DISABLE            1007
#define CCH_E_BT_NODEVICE           1008
//#define CCH_E_CONNECT_TIMEOUT     1009    //OFSC拡張
//#define CCH_E_USB_BIDIRECTIONAL   1010    //Windowsのみ
#define CCH_E_ILLEGAL               1101
#define CCH_E_OFFLINE               1102
//#define CCH_E_NOEXIST             1103    //Printerのみ
#define CCH_E_FAILURE               1104
#define CCH_E_TIMEOUT               1105
//#define CCH_E_NO_LIST             1106    //Printerのみ
//#define CCH_EPTR_COVER_OPEN       1201    //Printerのみ
//#define CCH_EPTR_REC_EMPTY        1202    //Printerのみ
//#define CCH_EPTR_BADFORMAT        1203    //Printerのみ
//#define CCH_EPTR_TOOBIG           1204    //Printerのみ

#define CCH_ECHAN_ERROR             1301    //CashChangerのみ
#define CCH_ECHAN_IMPOSSIBLE        1302    //CashChangerのみ
#define CCH_ECHAN_OVERDISPENSE      1303    //CashChangerのみ
#define CCH_ECHAN_CASSETTEWAIT      1304    //CashChangerのみ
#define CCH_ECHAN_SETERROR          1305    //CashChangerのみ
//#define CCH_ECHAN_BUSY            1306    //CashChangerのみ(未対応)
//#define CCH_ECHAN_IFERROR         1306    //CashChangerのみ(未対応)
//#define CCH_ECHAN_FULL            1308    //CashChangerのみ(未対応)
//#define CCH_ECHAN_CHARGING        1309    //CashChangerのみ(未対応)

// ///////////////////////////////////////////////////////////////////
// ErrorCode Extended Constants (Added v2.10.3)
// ///////////////////////////////////////////////////////////////////
#define CCH_EX_DEV_NO_PRINTER       62000   // プリンター未接続(SNMP応答無し/Lightning未認識)
#define CCH_EX_DEV_NO_DEVICE        62001   // 周辺機器デバイス未接続
#define CCH_EX_DEV_USING            62002   // 周辺機器デバイス使用中
#define CCH_EX_DEV_CONFIRM          62003   // 周辺機器デバイス接続後確認失敗(WiFiのみ)
#define CCH_EX_DEV_NO_STREAMNO      62011   // ストリーム番号一致なし(Lightningのみ)
#define CCH_EX_DEV_NO_SERIALNO      62012   // プリンターシリアル番号一致なし(Lightningのみ)
#define CCH_EX_DEV_STATUS_GET_ERROR 62013   // 周辺機器デバイス情報取得失敗(v2.10.5追加)
#define CCH_EX_DEV_OPEN_ERROR       62100   // ソケットまたはストリーム接続失敗
#define CCH_EX_DEV_SEND_ERROR       62101   // コマンド送信失敗
#define CCH_EX_DEV_NO_RESPONSE      62102   // コマンド無応答
#define CCH_EX_DEV_IMPOSSIBLE       62103   // コマンド実行エラー

// ///////////////////////////////////////////////////////////////////
// StatusCode Constants
// ///////////////////////////////////////////////////////////////////
#define CCH_SUE_POWER_ONLINE        2001    // OPOS_SUE_POWER_ONLINE 電源オンでかつレディ状態です。
#define CCH_SUE_POWER_OFF           2002    // OPOS_SUE_POWER_OFF 電源オフまたは本体に接続されていません。
#define CCH_SUE_POWER_OFFLINE       2003    // OPOS_SUE_POWER_OFFLINE 電源オンですがノットレディ状態です。

#define CCH_CHAN_STATUS_OK          0   // DeviceStatus, FullStatus
#define CCH_CHAN_STATUS_EMPTY       11  // DeviceStatus, StatusUpdateEvent エンプティの金種があります。
#define CCH_CHAN_STATUS_NEAREMPTY   12  // DeviceStatus, StatusUpdateEvent ニアエンプティの金種があります。
#define CCH_CHAN_STATUS_EMPTYOK     13  // StatusUpdateEvent エンプティ，ニアエンプティの状態が解除されました。
#define CCH_CHAN_STATUS_FULL        21  // FullStatus, StatusUpdateEvent フルの金種があります。
#define CCH_CHAN_STATUS_NEARFULL    22  // FullStatus, StatusUpdateEvent ニアフルの金種があります。
#define CCH_CHAN_STATUS_FULLOK      23  // StatusUpdateEvent フル，ニアフルの状態が解除されました。
#define CCH_CHAN_STATUS_JAM         31  // DeviceStatus, StatusUpdateEvent 機器障害が生じました。
#define CCH_CHAN_STATUS_JAMOK       32  // StatusUpdateEvent 機器障害が解消しました。
//#define CHAN_STATUS_ASYNC         91  // StatusUpdateEvent 非同期動作が終了しました。（非対応）

#define CCH_CHAN_STATUS_CASSETTEWAIT    101     // 独自：StatusUpdateEvent 紙幣抜き取り待ちイベント
#define CCH_CHAN_STATUS_PULLOUT         102     // 独自：StatusUpdateEvent 紙幣抜き取り完了イベント


// ///////////////////////////////////////////////////////////////////
//  "DepositStatus" Property Constants
// ///////////////////////////////////////////////////////////////////
#define CCH_CHAN_STATUS_DEPOSIT_START   1       // 入金可能状態です。
#define CCH_CHAN_STATUS_DEPOSIT_END     2       // 入金終了状態です。
#define CCH_CHAN_STATUS_DEPOSIT_PAUSE   3       // 入金停止状態です（OPOSとは異なる独自使用）
#define CCH_CHAN_STATUS_DEPOSIT_COUNT   4       // 入金計数中または返却中です。
#define CCH_CHAN_STATUS_DEPOSIT_JAM     5       // 機器障害が発生しました。

// ///////////////////////////////////////////////////////////////////
//  "endDeposit" Method: "Success" Parameter Constants (Add V2.09)
// ///////////////////////////////////////////////////////////////////
#define CCH_CHAN_DEPOSIT_CHANGE         1
#define CCH_CHAN_DEPOSIT_NOCHANGE       2
#define CCH_CHAN_DEPOSIT_REPAY          3

// ///////////////////////////////////////////////////////////////////
// ConnectModel Constants (v2.08.1追加)
// ///////////////////////////////////////////////////////////////////
#define CCH_MODEL_GLORY                 0
#define CCH_MODEL_AKATSUKI              1
#define CCH_MODEL_LAUREL                2

@protocol CSJCashChangerEventDelegate <NSObject>
@optional
- (void) dataEventCallbackCashChanger:(int)amount counts:(NSString*)counts;
- (void) statusUpdateEventCallback:(int)status;
@end


typedef void (^DataListenerCashChanger)(int amount, NSString* counts);
typedef void (^StatusUpdateListener)(int status);


@interface CSJCashChangerBase : NSObject {
    int mModelCode;
}

- (id) initWithModel:(int)model;

- (int) getVersionCode;
- (NSString *) getVersionName;
- (int) connect:(int)connectType withAddrress:(NSString*)addr;
- (int) connect:(int)connectType withAddrress:(NSString*)addr withPort:(int)port;
- (int) connect:(int)connectType withAddrress:(NSString*)addr withPort:(int)port withTimeout:(int)timeout;
- (int) connect:(int)connectType withAddrress:(NSString*)addr withPort:(int)port withTimeout:(int)timeout withVcomPort:(int)vcomport;   // Support VCOM# (Add V2.07)
- (int) disconnect;
- (int) beginDeposit;
- (int) fixDeposit;                     // Add V2.09
- (int) pauseDeposit;
- (int) endDeposit;
- (int) endDeposit:(int)success;        // Add V2.09
- (int) restartDeposit;
- (int) readCashCounts:(NSString **)cashCounts :(BOOL *)discrepancy;
- (int) readCashCounts:(NSString **)cashCounts :(NSString **)cashCounts2 :(BOOL *)discrepancy;  // Add V2.09
- (int) dispenseCash:(NSString *)cashCounts;
- (int) dispenseChange:(int)Amount;
- (int) reset;
- (int) memoryClear:(int)mode;
- (int) changeMode:(int)mode;
- (int) timeSet:(NSString *)DateTime;
- (int) collect:(int)siheimode :(int)koukamode;
- (int) collectCount:(NSString *)cashCounts;
- (int) depositDataRead:(NSString **)depositCounts;
- (int) setDepositMode:(int)mode;
- (int) readDepositMode:(int *)mode;
- (int) childLock:(int)mode;
- (int) openDrawer:(int)mode;
- (int) supply;
- (int) beginDepositOutside;
- (int) dispenseChangeOutside:(int)Amount;
- (int) dispenseCashOutside:(NSString *)cashCounts;
- (int) beginCashReturn;
- (int) supplyCounts:(int)mode :(NSString **)counts;
- (int) close:(int)mode :(int)ID :(unsigned char*)recvData :(unsigned long*)receiveLength;
- (int) closeDataRead:(int)dataNo :(unsigned char*)recvData :(unsigned long*)receiveLength;
- (int) sswSet:(int)mode :(int)sswNo :(int)setData;
- (int) salesRegister:(int)Amount;      // Add v2.09
- (int) sendCommand:(unsigned char*)sendData :(unsigned long)length :(unsigned char*)receiveData :(unsigned long*)receiveLength;

- (int) setDataEventCallback:(id)callback;
- (int) setDataEventCallback2:(DataListenerCashChanger)listener;
- (int) setStatusUpdateEventCallback:(id)callback;
- (int) setStatusUpdateEventCallback2:(StatusUpdateListener)listener;

- (int) getPowerState;
- (int) getDepositAmount;
- (NSString *) getDepositCounts;
- (int) getDepositStatus;
- (int) getDeviceStatus;
- (int) getFullStatus;
- (Boolean) getCassetteWait;                // Add V2.10-2022.03.16
- (int) getDeviceFunction;
- (int) setDeviceFunction:(int)function;
- (int) getChangeSetting;                   // Add v2.09
- (int) setChangeSetting:(int)changer;      // Add v2.09
- (int) getEmptyCondition;
- (int) setEmptyCondition:(int)condition;
- (int) getNearEmptyCondition;
- (int) setNearEmptyCondition:(int)condition;
- (int) getErrorCodeExtended;               // Add v2.10.3

- (int) setLog:(int)mode withPath:(NSString*)path withMaxSize:(int)maxSize;    // Added v2.10

- (int) connectTop:(int)connectType withAddrress:(NSString*)addr withPort:(int)port withTimeout:(int)timeout withVcomPort:(int)vcomport;
@end

#endif /* CashChanger_h */

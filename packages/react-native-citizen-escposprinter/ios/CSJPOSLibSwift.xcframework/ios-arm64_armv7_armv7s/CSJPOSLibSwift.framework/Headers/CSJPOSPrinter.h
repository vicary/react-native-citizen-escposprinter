//
//  CSJPOSPrinter.h
//  CSJTSOLib_iOS
//
//  Created by CITIZEN SYSTEMS on 2015/05/27.
//  Copyright 2015 CITIZEN SYSTEMS JAPAN CO., LTD. All rights reserved.
//
#import <Foundation/Foundation.h>

// ///////////////////////////////////////////////////////////////////
// ErrorCode Constants
// ///////////////////////////////////////////////////////////////////
#define CMP_SUCCESS                     0
#define CMP_E_CONNECTED                 1001
#define CMP_E_DISCONNECT                1002
#define CMP_E_NOTCONNECT                1003
#define CMP_E_CONNECT_NOTFOUND          1004
#define CMP_E_CONNECT_OFFLINE           1005
#define CMP_E_ILLEGAL                   1101
#define CMP_E_OFFLINE                   1102
#define CMP_E_NOEXIST                   1103
#define CMP_E_FAILURE                   1104
#define CMP_E_TIMEOUT                   1105
#define CMP_E_NO_LIST                   1106
#define CMP_EPTR_COVER_OPEN             1201
#define CMP_EPTR_REC_EMPTY              1202
#define CMP_EPTR_BADFORMAT              1203
#define CMP_EPTR_TOOBIG                 1204

// ///////////////////////////////////////////////////////////////////
// "connect" Method: "connectType" Parameter Constants
// ///////////////////////////////////////////////////////////////////
#define CMP_PORT_WiFi                   0
#define CMP_PORT_BLUETOOTH              1
#define CMP_PORT_USB                    3
// ///////////////////////////////////////////////////////////////////
// "status" Method: return Code Constants
// ///////////////////////////////////////////////////////////////////
#define CMP_STS_NORMAL                  0
#define CMP_STS_BATTERY_LOW             8       // for CMP printers
#define CMP_STS_COVER_OPEN              16
#define CMP_STS_PAPER_EMPTY             32
#define CMP_STS_MSR_READ                64      // for CMP printers
#define CMP_STS_PRINTEROFF              128

// ///////////////////////////////////////////////////////////////////
// "printText,printBitmap,printBarcode,printPDF417,printQRCode" Method: "alignment" Parameter Constants
// ///////////////////////////////////////////////////////////////////
#define CMP_ALIGNMENT_LEFT              0
#define CMP_ALIGNMENT_CENTER            1
#define CMP_ALIGNMENT_RIGHT             2

// ///////////////////////////////////////////////////////////////////
// "printText" Method: "attribute" Parameter Constants
// ///////////////////////////////////////////////////////////////////
#define CMP_FNT_DEFAULT                 0
#define CMP_FNT_FONTB                   1
#define CMP_FNT_FONTC                   2
#define CMP_FNT_BOLD                    8
#define CMP_FNT_REVERSE                 16
#define CMP_FNT_UNDERLINE               128
#define CMP_FNT_ITALIC                  256
#define CMP_FNT_STRIKEOUT               512

// ///////////////////////////////////////////////////////////////////
// "printText" Method: "textSize" Parameter Constants
// ///////////////////////////////////////////////////////////////////
#define CMP_TXT_1WIDTH                  0
#define CMP_TXT_2WIDTH                  16
#define CMP_TXT_3WIDTH                  32
#define CMP_TXT_4WIDTH                  48
#define CMP_TXT_5WIDTH                  64
#define CMP_TXT_6WIDTH                  80
#define CMP_TXT_7WIDTH                  96
#define CMP_TXT_8WIDTH                  112
#define CMP_TXT_1HEIGHT                 0
#define CMP_TXT_2HEIGHT                 1
#define CMP_TXT_3HEIGHT                 2
#define CMP_TXT_4HEIGHT                 3
#define CMP_TXT_5HEIGHT                 4
#define CMP_TXT_6HEIGHT                 5
#define CMP_TXT_7HEIGHT                 6
#define CMP_TXT_8HEIGHT                 7

// ///////////////////////////////////////////////////////////////////
// "printPaddingText" Method: "Side" Parameter Constants
// ///////////////////////////////////////////////////////////////////
#define CMP_SIDE_RIGHT                  0
#define CMP_SIDE_LEFT                   1

// ///////////////////////////////////////////////////////////////////
// "printBitmap" Method: "width" Parameter Constants
// ///////////////////////////////////////////////////////////////////
#define CMP_BM_ASIS                     (-11)

// ///////////////////////////////////////////////////////////////////
// "printBitmap" Method: "mode" Parameter Constants
// ///////////////////////////////////////////////////////////////////
#define CMP_BM_MODE_HT_THRESHOLD        16
#define CMP_BM_MODE_HT_DITHER           32
#define CMP_BM_MODE_CMD_RASTER          1
#define CMP_BM_MODE_CMD_BITIMAGE        2
#define CMP_BM_MODE_CMD_MONO            4
#define CMP_BM_MODE_CMD_GRAY16          8
#define CMP_BM_MODE_CMD_GRAY16DOWNLOAD  256     // Added v2.08

// ///////////////////////////////////////////////////////////////////
// "printBarCode" Method: "symbology" Parameter Constants
// ///////////////////////////////////////////////////////////////////
#define CMP_BCS_UPCA                    101
#define CMP_BCS_UPCE                    102
#define CMP_BCS_EAN8                    103
#define CMP_BCS_EAN13                   104
#define CMP_BCS_JAN8                    105
#define CMP_BCS_JAN13                   106
#define CMP_BCS_ITF                     107
#define CMP_BCS_Codabar                 108
#define CMP_BCS_Code39                  109
#define CMP_BCS_Code93                  110
#define CMP_BCS_Code128                 111
#define CMP_BCS_Code128_Parsed          112
#define CMP_BCS_RSS14                   131
#define CMP_BCS_RSS_EXPANDED            132
#define CMP_BCS_GS1DATABAR              131
#define CMP_BCS_GS1DATABAR_E            132
#define CMP_BCS_GS1DATABAR_S            133
#define CMP_BCS_GS1DATABAR_E_S          134
#define CMP_BCS_GS1DATABAR_T            135
#define CMP_BCS_GS1DATABAR_L            136
#define CMP_BCS_GS1DATABAR_S_O          137

// ///////////////////////////////////////////////////////////////////
// "printBarCode" Method: "textPosition" Parameter Constants
// ///////////////////////////////////////////////////////////////////
#define CMP_HRI_TEXT_NONE               0
#define CMP_HRI_TEXT_ABOVE              1
#define CMP_HRI_TEXT_BELOW              2

// ///////////////////////////////////////////////////////////////////
// "printPDF417" Method: "ECLevel" Parameter Constants
// ///////////////////////////////////////////////////////////////////
#define CMP_PDF417_EC_LEVEL_0           48
#define CMP_PDF417_EC_LEVEL_1           49
#define CMP_PDF417_EC_LEVEL_2           50
#define CMP_PDF417_EC_LEVEL_3           51
#define CMP_PDF417_EC_LEVEL_4           52
#define CMP_PDF417_EC_LEVEL_5           53
#define CMP_PDF417_EC_LEVEL_6           54
#define CMP_PDF417_EC_LEVEL_7           55
#define CMP_PDF417_EC_LEVEL_8           56

// ///////////////////////////////////////////////////////////////////
// "printQRCode" Method: "ECLevel" Parameter Constants
// ///////////////////////////////////////////////////////////////////
#define CMP_QRCODE_EC_LEVEL_L           48
#define CMP_QRCODE_EC_LEVEL_M           49
#define CMP_QRCODE_EC_LEVEL_Q           50
#define CMP_QRCODE_EC_LEVEL_H           51

// ///////////////////////////////////////////////////////////////////
// "cutPaper" Method: "option" Parameter Constants
// ///////////////////////////////////////////////////////////////////
#define CMP_CUT_FULL                    (-1)
#define CMP_CUT_PARTIAL                 (-2)
#define CMP_CUT_FULL_PREFEED            (-3)
#define CMP_CUT_PARTIAL_PREFEED         (-4)

// ///////////////////////////////////////////////////////////////////
// "markFeed" Method: "type" Parameter Constants
// ///////////////////////////////////////////////////////////////////
#define CMP_MF_TO_CUTTER                2
#define CMP_MF_TO_NEXT_TOF              8

// ///////////////////////////////////////////////////////////////////
// "mapMode" Method: "MapMode" Parameter Constants (2016.10.17)
// ///////////////////////////////////////////////////////////////////
#define CMP_MM_DOTS                     1
#define CMP_MM_TWIPS                    2
#define CMP_MM_ENGLISH                  3
#define CMP_MM_METRIC                   4

// ///////////////////////////////////////////////////////////////////
// "openDrawer" Method: "drawer" Parameter Constants
// ///////////////////////////////////////////////////////////////////
#define CMP_DRAWER_1                    1
#define CMP_DRAWER_2                    2

// ///////////////////////////////////////////////////////////////////
// "transactionPrint" Method: "control" Parameter Constants
// ///////////////////////////////////////////////////////////////////
#define CMP_TP_TRANSACTION              11
#define CMP_TP_NORMAL                   12

// ///////////////////////////////////////////////////////////////////
// "rotatePrint" Method: "rotation" Parameter Constants
// ///////////////////////////////////////////////////////////////////
#define CMP_RP_NORMAL                   0x0001
#define CMP_RP_ROTATE180                0x0103

#define CMP_RP_BARCODE                  0x1000
#define CMP_RP_BITMAP                   0x2000

// ///////////////////////////////////////////////////////////////////
// "pageModePrint" Method: "control" Parameter Constants
// ///////////////////////////////////////////////////////////////////
#define CMP_PM_PAGE_MODE                1
#define CMP_PM_PRINT_SAVE               2
#define CMP_PM_NORMAL                   3
#define CMP_PM_CANCEL                   4

// ///////////////////////////////////////////////////////////////////
// "PageModePrintDirection" Method: "direction" Parameter Constants
// ///////////////////////////////////////////////////////////////////
#define CMP_PD_LEFT_TO_RIGHT            1
#define CMP_PD_BOTTOM_TO_TOP            2
#define CMP_PD_RIGHT_TO_LEFT            3
#define CMP_PD_TOP_TO_BOTTOM            4

// ///////////////////////////////////////////////////////////////////
// "watermarkPrint" Method: "start" Parameter Constants
// ///////////////////////////////////////////////////////////////////
#define CMP_WM_STOP                     0
#define CMP_WM_START                    1


@interface CSJPOSPrinter : NSObject
{
}

- (int) connect:(int)connectType withAddrress:(NSString*)addr;
- (int) connect:(int)connectType withAddrress:(NSString*)addr withPort:(int)port;
- (int) connect:(int)connectType withAddrress:(NSString*)addr withPort:(int)port withTimeout:(int)timeout;
- (int) disconnect;
- (int) setEncoding:(NSStringEncoding)charset;
- (int) setEncoding2:(NSString*)encode;
- (int) setPrintCompletedTimeout:(int)timeout;
- (int) printerCheck;
- (int) status;
- (int) printText:(NSString *)data withAlignment:(int)alignment withAttribute:(int)attribute withTextSize:(int)textSize;
- (int) printPaddingText:(NSString *)data withAttribute:(int)attribute withTextSize:(int)textSize withLength:(int)length withSide:(int)side;
- (int) printTextLocalFont:(NSString *)data withAlignment:(int)alignment withFontName:(NSString*)fontName withPoint:(int)point withStyle:(int)style withHRatio:(int)hRatio withVRatio:(int)vRatio;
- (int) printBitmap:(NSString *)fileName withAlignment:(int)alignment;
- (int) printBitmap:(NSString *)fileName withWidth:(int)width withAlignment:(int)alignment;
- (int) printBitmap:(NSString *)fileName withWidth:(int)width withAlignment:(int)alignment withMode:(int)mode;
- (int) printBitmapData:(UIImage *)imageData withAlignment:(int)alignment;
- (int) printBitmapData:(UIImage *)imageData withWidth:(int)width withAlignment:(int)alignment;
- (int) printBitmapData:(UIImage *)imageData withWidth:(int)width withAlignment:(int)alignment withMode:(int)mode;
- (int) printNVBitmap:(int)nvImageNumber;
- (int) setNVBitmap:(int)number withFileName:(NSString *)fileName withWidth:(int)width;
- (int) setNVBitmap:(int)number withFileName:(NSString *)fileName withWidth:(int)width withMode:(int)mode;
- (int) printBarCode:(NSString*)data withSymbology:(int)symbology withHeight:(int)height withWidth:(int)width withAlignment:(int)alignment withTextPosition:(int)textPosition;
- (int) printPDF417:(NSString *)data withDigits:(int)digits withSteps:(int)steps withModuleWidth:(int)moduleWidth withStepHeight:(int)stepHeight withECLevel:(int)ECLevel withAlignment:(int)alignment;
- (int) printQRCode:(NSString*)data withModuleSize:(int)moduleSize withECLevel:(int)ECLevel withAlignment:(int)alignment;
- (int) printGS1DataBarStacked:(NSString*)data withSymbology:(int)symbology withModuleSize:(int)moduleSize withMaxWidth:(int)maxWidth withAlignment:(int)alignment;
- (int) cutPaper:(int)percentage;
- (int) unitFeed:(int)lfConunt;
- (int) markFeed:(int)type;
- (int) openDrawer:(int)drawer withPulseLength:(int)pulsLen;
- (int) transactionPrint:(int)control;
- (int) rotatePrint:(int)rotation;
- (int) pageModePrint:(int)control;
- (int) clearPrintArea;
- (int) clearOutput;
- (int) getVersionCode;
- (NSString *) getVersionName;
- (int) printData:(char*)data;
- (int) printData:(char*)data withLength:(unsigned long)length;
- (int) printByteData:(NSData*)data;
- (int) printByteData:(NSData*)data withLength:(unsigned long)length;
- (int) printNormal:(NSString*)data;
- (int) watermarkPrint:(int)start withNVImageNumber:(int)nvImageNumber withPass:(int)pass withFeed:(int)feed withRepeat:(int)repeat;
//#ifdef V115_SUPORT_UTILITY
- (int) writeData:(unsigned char*)data withLength:(unsigned long)length;
- (int) readData:(unsigned char*)data withLength:(unsigned long)length withTimeout:(unsigned long)timeout withReadSize:(unsigned long*)readSize;
//#endif

- (int) setLog:(int)mode withPath:(NSString*)path withMaxSize:(int)maxSize;    // Added v2.10


- (NSString *) getPageModeArea;
- (NSString *) getPageModePrintArea;
- (int) setPageModePrintArea:(NSString*)area;
- (int) getPageModePrintDirection;
- (int) setPageModePrintDirection:(int)direction;
- (int) getPageModeHorizontalPosition;
- (int) setPageModeHorizontalPosition:(int)position;
- (int) getPageModeVerticalPosition;
- (int) setPageModeVerticalPosition:(int)position;
- (int) getRecLineSpacing;
- (int) setRecLineSpacing:(int)spacing;
- (int) getMapMode;             // Added 2016.10.17
- (int) setMapMode:(int)number; // Added 2016.10.17

+ (NSArray *)searchCitizenPrinter:(int)ifType withSearchTime:(int)searchTime result:(int *)result;
+ (NSArray *)searchESCPOSPrinter:(int)ifType withSearchTime:(int)searchTime result:(int *)result;
- (NSArray *)searchCitizenPrinter:(int)ifType withSearchTime:(int)searchTime result:(int *)result;
- (NSArray *)searchESCPOSPrinter:(int)ifType withSearchTime:(int)searchTime result:(int *)result;
//#ifdef V116_ADDFUNC_001
+ (NSArray *)searchCitizenPrinterEx1:(int)ifType withSearchTime:(int)searchTime result:(int *)result;
//#endif
// for Bonjour ......................................
//#ifdef V209_SUPPORT_BONJOUR
+ (BOOL) isMoveBonjour_IF1_ES01;
- (BOOL) isMoveBonjour_IF1_ES01;
+ (void) setMoveBonjour_IF1_ES01:(BOOL)mode;
- (void) setMoveBonjour_IF1_ES01:(BOOL)mode;
//#endif
// ..................................................

@end

@interface CitizenPrinterInfo : NSObject

-(id)initWithIPAddr:(NSString*)ipAddr withMACAddr:(NSString*)macAddr withDevName:(NSString*)devName withBDAddr:(NSString*)bdAddr;
-(id)initWithIPAddr:(NSString*)ipAddr withMACAddr:(NSString*)macAddr withDevName:(NSString*)devName withBDAddr:(NSString*)bdAddr withUSBSerialNo:(NSString*)serialNo;

@property (nonatomic, copy, readonly) NSString *ipAddress;
@property (nonatomic, copy, readonly) NSString *macAddress;
@property (nonatomic, copy, readonly) NSString *deviceName;
@property (nonatomic, copy, readonly) NSString *bdAddress;
@property (nonatomic, copy, readonly) NSString *usbSerialNo;

@end

//#ifdef V116_ADDFUNC_001
@interface CitizenPrinterInfoEx1 : NSObject

-(id)initWithIPAddr:(NSString*)ipAddr withMACAddr:(NSString*)macAddr withDevName:(NSString*)devName withBDAddr:(NSString*)bdAddr withInterfaceType:(NSInteger)ifType withSerialNumber:(NSString*)serinum withHostIPAddr:(NSString*)hostIpAddr withHostMACAddr:(NSString*)hostMacAddr;
-(id)initWithIPAddr:(NSString*)ipAddr withMACAddr:(NSString*)macAddr withDevName:(NSString*)devName withBDAddr:(NSString*)bdAddr withInterfaceType:(NSInteger)ifType withSerialNumber:(NSString*)serinum withHostIPAddr:(NSString*)hostIpAddr withHostMACAddr:(NSString*)hostMacAddr withUSBSerialNo:(NSString*)serialNo;

@property (nonatomic, copy, readonly) NSString *ipAddress;
@property (nonatomic, copy, readonly) NSString *macAddress;
@property (nonatomic, copy, readonly) NSString *deviceName;
@property (nonatomic, copy, readonly) NSString *bdAddress;
@property (nonatomic, assign, readonly) NSInteger interfaceType;
//#ifdef V116_ADDFUNC_002
@property (nonatomic, copy, readonly) NSString *serialNumber;
@property (nonatomic, copy, readonly) NSString *hostIpAddress;
@property (nonatomic, copy, readonly) NSString *hostMacAddress;
//#endif
@property (nonatomic, copy, readonly) NSString *usbSerialNo;
@end
//#endif

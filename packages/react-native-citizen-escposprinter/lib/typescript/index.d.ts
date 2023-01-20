import { CitizenPrinerInfo, ESCPOSConst, ESCPOSPrinterBarcodeType, ESCPOSPrinterConnectType, ESCPOSPrinterCutType, ESCPOSPrinterDrawer, ESCPOSPrinterGS1DatabarType, ESCPOSPrinterMarkFeedType, ESCPOSPrinterPageModeControl, ESCPOSPrinterPDF417ECLevel, ESCPOSPrinterPrintAlignment, ESCPOSPrinterQRCodeECLevel, ESCPOSPrinterRotation, ESCPOSPrinterSearchType, ESCPOSPrinterTextPosition, ESCPOSPrinterTransactionControl, ESCPOSPrinterTypeface } from "./ESCPOSConst";
export { ESCPOSConst };
/**
 * This method is used to connect the printer. Please specify the type and
 * address/UsbDevice of the printer connection.
 *
 * Bluetooth device address letters, please specify in uppercase.
 *
 * If the Bluetooth Device name is specified, the device that was paired is
 * detected automatically. If you omit the Device name, the supported model
 * device that was paired is detected automatically.
 *
 * If you want to use the Bluetooth device insecure communications provided
 * by the Android 2.3.3 or later, please specify the connection type
 * CMP_PORT_Bluetooth_Insecure.
 *
 * If you want to use the USB device, must execute the setContext method before
 * the execution of this method.
 *
 * Connection port number is valid only if you specify the connection type
 * CMP_PORT_WiFi. If it is omitted, you connected with number 9100.
 *
 * Timeout is gives the maximum number of milliseconds to connect printer.
 * Timeout is invalid if you specify the connection type CMP_PORT_USB. If it is
 * omitted, you connected with 4000 milliseconds when using WiFi and connected
 * with 8000 milliseconds when using Bluetooth.
 *
 * When connecting to the printer, this SDK also checks the status of the
 * printer and the supporting models.
 *
 * When communication with the printer is not necessary, must execute the
 * dissconnect method to disconnect the printer connection. When not disconnect,
 * the next connection will be an error.
 *
 * Note:
 * When you first connect with USB, a dialog asking permission to access the USB
 * device on the Android terminal will be displayed, please tap the OK button.
 */
export declare function connect(connectType: ESCPOSPrinterConnectType, address: string, port?: number, timeout?: number): Promise<void>;
/**
 * This method is used to disconnect the printer connection.
 *
 * When the end of the print or some kind of errors occurs, please disconnect
 * the connection by the execution of this method.
 */
export declare function disconnect(): Promise<void>;
/**
 * This method is used to set the encoding of the send data to the printer.
 *
 * When you create an instance, it is initialized to the default character set
 * of the OS.
 *
 * Please set the encoding by the setting of the memory switch of the printer.
 * (Please refer to "1.4 Supported models (Printers)")
 *
 * This SDK supports printing UTF-8 encoded characters. Please refer to "2.5.2
 * About printing UTF-8 encode characters" for the detail.
 */
export declare function setEncoding(encoding: string): Promise<void>;
/**
 * This method is used to send the command to get the status of the printer.
 *
 * If the result of this method is successful, you can get the status of the
 * printer by status method.
 *
 * If the result of this method is failure, there is a possibility that the
 * connection or the printer abnormality has occurred. In this case, please
 * reconnect using the disconnect method and the connect method.
 *
 * If you want to print after the connected and some time passed, please
 * check the status of the printer bythe execution of this method and the
 * status method beforehand.
 *
 * In the case of network connection, it is automatically disconnected when
 * passed a long time. If you want to keep a connection, please execute this
 * method regularly.
 */
export declare function printerCheck(): Promise<void>;
/**
 * This method is used to get the status of the printer obtained by the
 * printerCheck method.
 *
 * Before the execution of this method, you must run the printerCheck method.
 *
 * When there is not a parameter, return the logical sum of the status
 * (CMP_STS_COVER_OPEN, CMP_STS_PAPER_EMPTY, CMP_STS_PRINTEROFF) indicating
 * the error of the printer.
 *
 * When the status type is specified, return the status that matches. Status
 * type can be specified in combination. If you want to combine, please specify
 * the logical sum.
 */
export declare function status(
/** ESCPOSPrinterStatus */
type?: number): Promise<number>;
/**
 * This method is used to print text which specifies alignment and attribute
 * and size.
 *
 * Text attribute can be specified in combination font B, font C, bold, reverse,
 * and underline. If you want to combine, please specify the logical sum.
 *
 * Text size can be specified in combination with the width and height. If you
 * want to combine, please specify the logical sum.
 */
export declare function printText(data: string, alignment?: ESCPOSPrinterPrintAlignment, 
/** ESCPOSPrinterTextAttribute */
attribute?: ESCPOSConst, 
/** ESCPOSPrinterTextSize */
textSize?: number): Promise<void>;
/**
 * This method is used to print text with space padding which specifies
 * attribute and size and length of the single-byte character equivalent and
 * side where space is added.
 *
 * Cannot use the combining characters in the text data.
 *
 * Text attribute can be specified in combination font B, font C, bold, reverse,
 * and underline. If you want to combine, please specify the logical sum.
 *
 * Text size can be specified in combination with the width and height. If you
 * want to combine, please specify the logical sum.
 */
export declare function printPaddingText(data: string, 
/** ESCPOSPrinterTextAttribute */
attribute: number, 
/** ESCPOSPrinterTextSize */
textSize: number, length: number, side: ESCPOSConst.CMP_SIDE_RIGHT | ESCPOSConst.CMP_SIDE_LEFT): Promise<void>;
/**
 * This method is used to print text by using a font installed in the computer,
 * which specifies alignment, font, size, style, and ratio.
 *
 * What this method does internally is to generate a graphic image based on the
 * given parameters, to print the graphic image.
 *
 * Font style can be specified in combination bold, reverse, underline, italic
 * and strikeout. If you want to combine, please specify the logical sum.
 */
export declare function printTextLocalFont(data: string, alignment: ESCPOSPrinterPrintAlignment, fontType: ESCPOSPrinterTypeface, point: number, 
/** ESCPOSPrinterFontStyle */
style: number, 
/** 1-1000 */
hRatio: number, 
/** 1-1000 */
vRatio: number): Promise<void>;
/**
 * This method is used to print bitmap which specifies base64 encoded bitmap
 * data, along with width, alignment and mode.
 */
export declare function printBitmap(
/** base64 encoded bitmap data */
data: string, width?: number, alignment?: ESCPOSPrinterPrintAlignment, 
/** ESCPOSPrinterBitmapMode */
mode?: number): Promise<void>;
/**
 * **THIS METHOD IS NOT IMPLEMENTED**
 *
 * This method is used to store bitmap which specifies number and file name and
 * width and mode. The stored bitmap can print using printNVBitmap method or
 * watermarkPrint method.
 *
 * The fileName parameter sets the full path of the bitmap file to store.
 *
 * The bitmap formats that can be stored are BMP / JPG / PNG / GIF.
 *
 * If the width parameter is omitted, it is in CMP_BM_ASIS to store.
 *
 * The mode parameter can be specified in combination with the halftone and
 * store method. To use of the combination, please specify the logical sum.
 * If the mode parameter is omitted, it is in `CMP_BM_MODE_HT_THRESHOLD` |
 * `CMP_BM_MODE_CMD_MONO` to store.
 *
 * For more information on the mode parameter is as follows.
 */
export declare function setNVBitmap(): Promise<void>;
/**
 * This method is used to print bitmap image (Logo) that is stored in the flash
 * memory of the printer.
 *
 * To use this method, you need to register of the logo in advance. Logo
 * registration, please store it using `setNVBitmap` method or use the
 * "POS Printer utility" of utility software for the printer.
 *
 * Registration mode varies among the model of the printer. Please register as follows.
 *
 * **[CT-S281, PMU3300, CMP-20/30 Series]**
 *
 * Please register the logo with "Unused key code mode".
 *
 * To the image number to use, it is necessary to register the logo sequentially.
 *
 *
 * **[CT-D101/150/151, CT-E301/351/601/651, CT-S251/281II/310II/601/651/801/851/601II/651II/801II/851II/751/2000/4000/4500 Series]**
 *
 * Please register the logo with "Key code mode".
 *
 * To the image number to use, it is necessary to register the logo that
 * specifies the key code.
 */
export declare function printNVBitmap(
/** 1 - 20 */
nvImageNumber: number): Promise<void>;
/**
 * This method is used to print one-dimensional barcode.
 *
 * GS1 DataBar (CMP_BCS_GS1DATABAR, CMP_BCS_GS1DATABAR_E, CMP_BCS_GS1DATABAR_T,
 * CMP_BCS_GS1DATABAR_L) can use only the printers of CT-D101/150/151,
 * CT-E301/351/601/651, CT-S251/310II/601/651/801/851/601II/651II/801II/851II/751/4500
 * series.
 *
 * The designation of CMP_ALIGNMENT_CENTER and CMP_ALIGNMENT_RIGHT of the
 * Barcode alignment on the page mode is ignored.
 */
export declare function printBarCode(data: string, symbology: ESCPOSPrinterBarcodeType, 
/**
 * 1 - 255 (dots)
 *
 * Expressed in the unit of measure given by MapMode (default dots).
 */
height: number, 
/**
 * 2 - 6 (dots)
 *
 * Expressed in the unit of measure given by MapMode (default dots).
 */
width: number, alignment: ESCPOSPrinterPrintAlignment, textPosition: ESCPOSPrinterTextPosition): Promise<void>;
/**
 * This method is used to print PDF-417 barcode.
 *
 * Please refer to the Command Reference of the printer for details on each
 * parameter.
 *
 * The designation of CMP_ALIGNMENT_CENTER and CMP_ALIGNMENT_RIGHT of the
 * Barcode alignment on the page mode is ignored.
 */
export declare function printPDF417(data: string, 
/** 1 - 30, 0 = automatic */
digits: number, 
/** 3 - 90, 0 = automatic */
steps: number, 
/**
 * 2 - 8 (dots)
 *
 * Expressed in the unit of measure given by MapMode (default dots).
 */
moduleWidth: number, 
/** 2 - 8 */
stepHeight: number, ECLevel: ESCPOSPrinterPDF417ECLevel, alignment: ESCPOSPrinterPrintAlignment): Promise<void>;
/**
 * This method is used to print QRCode barcode.
 *
 * Please refer to the Command Reference of the printer for details on each
 * parameter.
 *
 * The designation of CMP_ALIGNMENT_CENTER and CMP_ALIGNMENT_RIGHT of the
 * Barcode alignment on the page mode is ignored.
 */
export declare function printQRCode(data: string, 
/**
 * 1 - 16 (dots)
 *
 * Expressed in the unit of measure given by MapMode (default dots).
 */
moduleSize: number, ECLevel: ESCPOSPrinterQRCodeECLevel, alignment?: ESCPOSPrinterPrintAlignment): Promise<void>;
/**
 * This method is used to print 2-dimensional GS1 DataBar barcode.
 *
 * This method can use only the printers of CT-D101/150/151, CT-E301/351/601/651,
 * CT-S251/310II/601/651/801/851/601II/651II/801II/851II/751/4500 series.
 *
 * Please refer to the Command Reference of the printer for details on each
 * parameter.
 *
 * The designation of CMP_ALIGNMENT_CENTER and CMP_ALIGNMENT_RIGHT of the
 * Barcode alignment on the page mode is ignored.
 */
export declare function printGS1DataBarStacked(data: string, symbology: ESCPOSPrinterGS1DatabarType, 
/**
 * 2 - 8 (dots)
 *
 * Expressed in the unit of measure given by MapMode (default dots).
 */
moduleSize: number, 
/**
 * 106 - 39528 (dots)
 *
 * Expressed in the unit of measure given by MapMode (default dots).
 */
maxSize: number, alignment: ESCPOSPrinterPrintAlignment): Promise<void>;
/** This method is used to cut the paper. */
export declare function cutPaper(type: ESCPOSPrinterCutType): Promise<void>;
/** This method is used to feed the paper in dot units. */
export declare function unitFeed(
/** Expressed in the unit of measure given by MapMode (default dots). */
ufCount: number): Promise<void>;
/** This method is used to utilize label paper and black mark paper. */
export declare function markFeed(type: ESCPOSPrinterMarkFeedType): Promise<void>;
/** This method is used to open the cash drawer is connected to the printer. */
export declare function openDrawer(drawer: ESCPOSPrinterDrawer, 
/** 1 - 8 (x 100) msec */
pulseLen: number): Promise<void>;
/**
 * This method is used to start or end a transaction mode.
 *
 * If control is CMP_TP_TRANSACTION, then transaction mode is entered.
 * Subsequent methods calls will buffer the print data. The methods applied to a
 * transaction mode are as follows.
 * - printText
 * - printBitmap
 * - printNVBitmap
 * - printBarCode
 * - printPDF417
 * - printQRCode
 * - printGS1DataBarStacked
 * - cutPaper
 * - unitFeed
 * - markFeed
 * - openDrawer
 * - rotatePrint
 * - pageModePrint
 * - clearePrintArea
 * - printData
 * - printNormal
 *
 * If control is CMP_TP_NORMAL, then transaction mode is exited. If some data
 * was buffered, then the buffered data is printed. The entire transaction is
 * treated as one message.
 *
 * Calling the clearOutput method cancels transaction mode. Any buffered print
 * lines are also cleared.
 */
export declare function transactionPrint(control: ESCPOSPrinterTransactionControl): Promise<void>;
/**
 * This method is used to start or end a rotation print mode.
 *
 * If rotation includes `CMP_RP_ROTATE180`, then upside-down print mode is
 * entered. The methods applied to a rotation print mode are as follows.
 * - printText
 * - printNormal
 *
 * If rotation includes `CMP_RP_BARCODE` and/or `CMP_RP_BITMAP`, the following
 * methods are printed also rotated.
 * - printBarcod
 * - printPDF417
 * - printQRCode
 * - printGS1DataBarStacked
 * - printBitmap
 *
 * If rotation is `CMP_RP_NORMAL`, then rotation mode is exited.
 */
export declare function rotatePrint(rotation: ESCPOSPrinterRotation): Promise<void>;
/**
 * This method is used to start or end a Page Mode.
 *
 * If control is `CMP_PM_PAGE_MODE`, then Page Mode is entered. Subsequent methods
 * calls will buffer the print data. The methods applied to a Page Mode are as
 * follows.
 * - printText
 * - printBitmap
 * - printBarCode
 * - printPDF417
 * - printQRCode
 * - printGS1DataBarStacked
 * - printNormal
 *
 * If control is `CMP_PM_PRINT_SAVE`, then Page Mode is not exited. If some data
 * is buffered, then the buffered data is saved and printed. This control is
 * used to print the same page layout with additional print items inside of the
 * page.
 *
 * If control is `CMP_PM_NORMAL`, then Page Mode is exited. If some data is
 * buffered, then the buffered data is printed. The buffered data will not be
 * saved.
 *
 * If control is `CMP_PM_CANCEL`, then Page Mode is exited. If some data is
 * buffered, then the buffered data is not printed and is not saved.
 *
 * Note that when the `pageModePrint` method is called, all of the data that
 * is to be printed in the PageModePrintArea will be printed and the paper is
 * fed to the end of the PageModePrintArea. If more than one PageModePrintArea
 * is defined, then after the pageModePrint method is called, all of the data
 * that is to be printed in the respective PageModePrintArea(s) will be printed
 * and the paper will be fed to the end of the PageModePrintArea located the
 * farthest “down” the sheet of paper.
 *
 * The entire Page Mode transaction is treated as one message. Calling the
 * `clearOutput` method cancels Page Mode. Any buffered print lines are also
 * cleared.
 */
export declare function pageModePrint(control: ESCPOSPrinterPageModeControl): Promise<void>;
/** This method is used to clear the area defined by the PageModePrintArea property. */
export declare function clearPrintArea(): Promise<void>;
/**
 * This method is used to clear all buffered output data by tranzactionPrint
 * method and `pageModePrint` method.
 *
 * Also, when possible, halts outputs that are in progress. At the same time,
 * the command to clear print data on the printer is sent.
 */
export declare function clearOutput(): Promise<void>;
/**
 * This method is used to send data bytes to the printer directly.
 *
 * It is usually not necessary, please use if you want to send ESC commands
 * directly to the printer.
 *
 * If you want to use, please be careful so as not to affect the other methods.
 */
export declare function printData(data: string): Promise<void>;
/**
 * This method is used to print using the escape sequences that are defined in
 * the OPOS.
 *
 * Please refer to "Programming Manual" for more information.
 */
export declare function printNormal(data: string): Promise<void>;
/**
 * **THIS METHOD IS NOT IMPLEMENTED YET.**
 *
 * This method is used to print watermark.
 *
 * This is available with a printer of the CT-D151, CT-E601/651,
 * CT-S251/601II/651II/801II/851II/751 series.
 *
 * The bitmap image stored in the flash memory of the printer is printed out as
 * watermark.
 *
 * To use this method, you need to register of the logo in advance. Logo
 * registration, please store it using `setNVBitmap` method or use the
 * "POS Printer utility" of utility software for the printer.
 *
 * When the printing of watermark was stopped in `CMP_WM_STOP`, all other
 * arguments are ignored.
 */
export declare function watermarkPrint(): Promise<void>;
/**
 * This method is used to search the printer. Please specify the type of the
 * printer connection and the search time. Before the execution of this method,
 * must execute the setContext method. This method cannot be used on the
 * simulator.
 *
 * After search time passed, set a result to the result parameter and return the
 * information of the found printers as array type.
 *
 * In the case of CMP_PORT_WiFi for the connection type, you can search only
 * the printers of CT-D101/150/151, CT-E301/351/601/651,
 * CT-S251/310II/601/651/801/851/601II/651II/801II/851II/751/4500 series.
 * Recommended value of search time is more than 3 seconds. When the search time
 * is shorter than the second, a search may fail by the network situation.
 *
 * In the case of CMP_PORT_Bluetooth or CMP_PORT_Bluetooth_Insecure for the
 * connection type, you can get the paired address when specifying 0 for the
 * search time. When specifying 1 - 30 for the search time you can get the
 * connectable address. Recommended value of search time is more than 10 seconds.
 *
 * When the search time is shorter than the second, a search may fail by the
 * Bluetooth situation.
 */
export declare function searchCitizenPrinter(connectType: ESCPOSPrinterSearchType, timeout: number): Promise<CitizenPrinerInfo[]>;
/**
 * This method is used to search the printer. Please specify the type of the
 * printer connection and the search time. Before the execution of this method,
 * must execute the setContext method. This method cannot be used on the
 * simulator.
 *
 * After search time passed, set a result to the result parameter and return the
 * information of the found printers as String array type.
 *
 * In the case of CMP_PORT_WiFi for the connection type, you can search only the
 * printers of CT-D101/150/151, CT-E301/351/601/651,
 * CT-S251/310II/601/651/801/851/601II/651II/801II/851II/751/4500 series.
 * Recommended value of search time is more than 3 seconds. When the search time
 * is shorter than the second, a search may fail by the network situation.
 *
 * In the case of CMP_PORT_Bluetooth or CMP_PORT_Bluetooth_Insecure for the
 * connection type, you can get the paired address when specifying 0 for the
 * search time. When specifying 1 - 30 for the search time you can get the
 * connectable address. Recommended value of search time is more than 10 seconds.
 *
 * When the search time is shorter than the second, a search may fail by the
 * Bluetooth situation.
 */
export declare function searchESCPOSPrinter(connectType: ESCPOSPrinterSearchType, timeout?: number): Promise<string[]>;
/**
 * This method is used to connect printer and get the status of the printer.
 * After the process is complete, disconnect the connection. (except
 * connection type `CMP_PORT_SNMP`)
 *
 * The `CMP_PORT_SNMP` in the connect type can be used with printers connected
 * to the network. By using this connection type, you can get the status
 * regardless of other connections. In order to use this connection type, the
 * printer supported with this function.
 */
export declare function printerCheckEx(connectType: ESCPOSPrinterConnectType, 
/**
 * WiFi:
 * - 0.0.0.0 ~ 255.255.255.255
 *
 * Bluetooth:
 * - 00:00:00:00:00:00 ~ FF:FF:FF:FF:FF:FF
 * - Device name (Automatic detection)
 */
address: string, port?: number, timeout?: number): Promise<void>;
/**
 * This method is used to connect printer and open the cash drawer is connected
 * to the printer. After the process is complete, disconnect the connection.
 *
 * This method can execute even if the printer error (cover open or paper empty).
 */
export declare function openDrawerEx(drawer: ESCPOSPrinterDrawer, 
/** 1 - 8 (x 100) msec */
pulseLen: number, connectType: ESCPOSPrinterConnectType, 
/**
 * WiFi:
 * - 0.0.0.0 ~ 255.255.255.255
 *
 * Bluetooth:
 * - 00:00:00:00:00:00 ~ FF:FF:FF:FF:FF:FF
 * - Device name (Automatic detection)
 */
address: string, port?: number, timeout?: number): Promise<void>;
/**
 * This method is used to set the timeout to check the print completion
 * notification.
 *
 * When you create an instance, the timeout is initialized to 0.
 *
 * Please refer to "2.5.1. Function to detect the completion of printing"
 * for details of the function to detect the completion of printing.
 */
export declare function setPrintCompletedTimeout(
/**
 * 0: Automatically adjusts the timeout.
 *
 * Other Values: Specify the timeout. Expressed in milliseconds.
 */
timeout: number): Promise<void>;
/** Sets the logging function. See "3.2 Logging function" for more details */
export declare function setLog(
/**
 * 0: None
 *
 * 1: Access logs
 *
 * 2: Error logs
 */
mode: 0 | 1 | 2, 
/** The folder of the external storage path */
path: string, 
/**
 * Maximum size (MB)
 *
 * 0: Unlimited
 */
maxSize: number): Promise<void>;
/**
 * This method is used to get a numerical value for the version number of this SDK.
 *
 * @returns Return a numerical value for the version number of this SDK. (Ver1.00 is 100)
 */
export declare function getVersionCode(): Promise<number>;
/**
 * This method is used to get a string for the version number of this SDK.
 *
 * @returns Return a string for the version number of this SDK. (Ver1.00 is "1.00")
 */
export declare function getVersionName(): Promise<string>;
//# sourceMappingURL=index.d.ts.map
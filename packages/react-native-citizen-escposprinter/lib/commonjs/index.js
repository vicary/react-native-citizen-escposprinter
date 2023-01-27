"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "ESCPOSConst", {
  enumerable: true,
  get: function () {
    return _ESCPOSConst.ESCPOSConst;
  }
});
exports.clearOutput = clearOutput;
exports.clearPrintArea = clearPrintArea;
exports.connect = connect;
exports.cutPaper = cutPaper;
exports.disconnect = disconnect;
exports.getVersionCode = getVersionCode;
exports.getVersionName = getVersionName;
exports.markFeed = markFeed;
exports.openDrawer = openDrawer;
exports.openDrawerEx = openDrawerEx;
exports.pageModePrint = pageModePrint;
exports.printBarCode = printBarCode;
exports.printBitmap = printBitmap;
exports.printData = printData;
exports.printGS1DataBarStacked = printGS1DataBarStacked;
exports.printNVBitmap = printNVBitmap;
exports.printNormal = printNormal;
exports.printPDF417 = printPDF417;
exports.printPaddingText = printPaddingText;
exports.printQRCode = printQRCode;
exports.printText = printText;
exports.printTextLocalFont = printTextLocalFont;
exports.printerCheck = printerCheck;
exports.printerCheckEx = printerCheckEx;
exports.rotatePrint = rotatePrint;
exports.searchCitizenPrinter = searchCitizenPrinter;
exports.searchESCPOSPrinter = searchESCPOSPrinter;
exports.setEncoding = setEncoding;
exports.setLog = setLog;
exports.setNVBitmap = setNVBitmap;
exports.setPrintCompletedTimeout = setPrintCompletedTimeout;
exports.status = status;
exports.transactionPrint = transactionPrint;
exports.unitFeed = unitFeed;
exports.watermarkPrint = watermarkPrint;
var _reactNative = require("react-native");
var _errors = require("./errors");
var _ESCPOSConst = require("./ESCPOSConst");
// @ts-expect-error ts(7017)
const isTurboModuleEnabled = global.__turboModuleProxy != null;
const CitizenEscposprinter = isTurboModuleEnabled ? require("./NativeCitizenEscposprinter").default : _reactNative.NativeModules.CitizenEscposprinter;
if (!CitizenEscposprinter) {
  throw new Error("The package 'react-native-citizen-escposprinter' doesn't seem to be linked. Make sure: \n\n" + _reactNative.Platform.select({
    ios: "- You have run 'pod install'\n",
    default: ""
  }) + "- You rebuilt the app after installing the package\n" + "- You are not using Expo Go\n");
}
const handleRejection = error => {
  throw error instanceof Error && (0, _errors.getPrintError)(+error.message) || error;
};
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
async function connect(connectType, address) {
  let port = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
  let timeout = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
  try {
    return await CitizenEscposprinter.connect(connectType, address, port, timeout);
  } catch (error) {
    return handleRejection(error);
  }
}

/**
 * This method is used to disconnect the printer connection.
 *
 * When the end of the print or some kind of errors occurs, please disconnect
 * the connection by the execution of this method.
 */
async function disconnect() {
  try {
    return await CitizenEscposprinter.disconnect();
  } catch (error) {
    return handleRejection(error);
  }
}

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
async function setEncoding(encoding) {
  try {
    return await CitizenEscposprinter.setEncoding(encoding);
  } catch (error) {
    return handleRejection(error);
  }
}

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
async function printerCheck() {
  try {
    return await CitizenEscposprinter.printerCheck();
  } catch (error) {
    return handleRejection(error);
  }
}

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
async function status() {
  let type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
  try {
    return await CitizenEscposprinter.status(_reactNative.Platform.select({
      android: type
    }));
  } catch (error) {
    return handleRejection(error);
  }
}

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
async function printText(data) {
  let alignment = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _ESCPOSConst.ESCPOSConst.CMP_ALIGNMENT_LEFT;
  let attribute = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : _ESCPOSConst.ESCPOSConst.CMP_FNT_DEFAULT;
  let textSize = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : _ESCPOSConst.ESCPOSConst.CMP_TXT_1WIDTH | _ESCPOSConst.ESCPOSConst.CMP_TXT_1HEIGHT;
  try {
    return await CitizenEscposprinter.printText(data, alignment, attribute, textSize);
  } catch (error) {
    return handleRejection(error);
  }
}

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
async function printPaddingText(data, /** @type import("./ESCPOSConst").ESCPOSPrinterTextAttribute */
attribute, /** @type import("./ESCPOSConst").ESCPOSPrinterTextSize */
textSize, length, side) {
  try {
    return await CitizenEscposprinter.printPaddingText(data, attribute, textSize, length, side);
  } catch (error) {
    return handleRejection(error);
  }
}

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
async function printTextLocalFont(data, alignment, fontType, point, /** @type import("./ESCPOSConst").ESCPOSPrinterFontStyle */
style, /** 1-1000 */
hRatio, /** 1-1000 */
vRatio) {
  try {
    return await CitizenEscposprinter.printTextLocalFont(data, alignment, fontType, point, style, hRatio, vRatio);
  } catch (error) {
    return handleRejection(error);
  }
}

/**
 * This method is used to print bitmap which specifies base64 encoded bitmap
 * data, along with width, alignment and mode.
 */
async function printBitmap( /** base64 encoded bitmap data */
data) {
  let width = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _ESCPOSConst.ESCPOSConst.CMP_BM_ASIS;
  let alignment = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : _ESCPOSConst.ESCPOSConst.CMP_ALIGNMENT_CENTER;
  let mode = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : _ESCPOSConst.ESCPOSConst.CMP_BM_MODE_HT_THRESHOLD | _ESCPOSConst.ESCPOSConst.CMP_BM_MODE_CMD_RASTER;
  try {
    return await CitizenEscposprinter.printBitmap(data, width, alignment, mode);
  } catch (error) {
    return handleRejection(error);
  }
}

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
async function setNVBitmap() {
  // /** 1 - 20 */
  // nvImageNumber: number,
  // fileName: string,
  // /**
  //  * Bitmap width expressed. Expressed in the unit of measure given by MapMode
  //  * (default dots).
  //  */
  // width: number = ESCPOSConst.CMP_BM_ASIS,
  // /**
  //  * **[CT-S281, PMU3300, CMP-20/30 Series]**
  //  *
  //  * It is necessary that the bitmap numbers are contiguous from number 1. If
  //  * you register a new bitmap after the connection, the bitmap that was
  //  * previously registered will be erased. The CMP-20/30 series, please register
  //  * with a USB connection. The CMP-20 series is automatically disconnected
  //  * because the printer is reset when the registration is completed.
  //  *
  //  * **[CT-D101/150/151, CT-E301/351/601/651, CT-S251/281II/310II/601/651/801/851/601II/651II/801II/851II/2000/4000 Series]**
  //  *
  //  * It is not necessary that the bitmap numbers are contiguous. And it is
  //  * possible to remove a registered image by assigning the fileName parameter
  //  * as an empty string.
  //  */
  // mode: ESCPOSPrinterNVImageMode = ESCPOSConst.CMP_BM_MODE_HT_THRESHOLD |
  //   ESCPOSConst.CMP_BM_MODE_CMD_MONO,
  throw new Error("Not implemented");
}

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
async function printNVBitmap( /** 1 - 20 */
nvImageNumber) {
  try {
    return await CitizenEscposprinter.printNVBitmap(nvImageNumber);
  } catch (error) {
    return handleRejection(error);
  }
}

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
async function printBarCode(data, symbology,
/**
 * 1 - 255 (dots)
 *
 * Expressed in the unit of measure given by MapMode (default dots).
 */
height,
/**
 * 2 - 6 (dots)
 *
 * Expressed in the unit of measure given by MapMode (default dots).
 */
width, alignment, textPosition) {
  try {
    return await CitizenEscposprinter.printBarCode(data, symbology, height, width, alignment, textPosition);
  } catch (error) {
    return handleRejection(error);
  }
}

/**
 * This method is used to print PDF-417 barcode.
 *
 * Please refer to the Command Reference of the printer for details on each
 * parameter.
 *
 * The designation of CMP_ALIGNMENT_CENTER and CMP_ALIGNMENT_RIGHT of the
 * Barcode alignment on the page mode is ignored.
 */
async function printPDF417(data, /** 1 - 30, 0 = automatic */
digits, /** 3 - 90, 0 = automatic */
steps,
/**
 * 2 - 8 (dots)
 *
 * Expressed in the unit of measure given by MapMode (default dots).
 */
moduleWidth, /** 2 - 8 */
stepHeight, ECLevel, alignment) {
  try {
    return await CitizenEscposprinter.printPDF417(data, digits, steps, moduleWidth, stepHeight, ECLevel, alignment);
  } catch (error) {
    return handleRejection(error);
  }
}

/**
 * This method is used to print QRCode barcode.
 *
 * Please refer to the Command Reference of the printer for details on each
 * parameter.
 *
 * The designation of CMP_ALIGNMENT_CENTER and CMP_ALIGNMENT_RIGHT of the
 * Barcode alignment on the page mode is ignored.
 */
async function printQRCode(data,
/**
 * 1 - 16 (dots)
 *
 * Expressed in the unit of measure given by MapMode (default dots).
 */
moduleSize, ECLevel) {
  let alignment = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : _ESCPOSConst.ESCPOSConst.CMP_ALIGNMENT_CENTER;
  try {
    return await CitizenEscposprinter.printQRCode(data, moduleSize, ECLevel, alignment);
  } catch (error) {
    return handleRejection(error);
  }
}

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
async function printGS1DataBarStacked(data, symbology,
/**
 * 2 - 8 (dots)
 *
 * Expressed in the unit of measure given by MapMode (default dots).
 */
moduleSize,
/**
 * 106 - 39528 (dots)
 *
 * Expressed in the unit of measure given by MapMode (default dots).
 */
maxSize, alignment) {
  try {
    return await CitizenEscposprinter.printGS1DataBarStacked(data, symbology, moduleSize, maxSize, alignment);
  } catch (error) {
    return handleRejection(error);
  }
}

/** This method is used to cut the paper. */
async function cutPaper(type) {
  try {
    return await CitizenEscposprinter.cutPaper(type);
  } catch (error) {
    return handleRejection(error);
  }
}

/** This method is used to feed the paper in dot units. */
async function unitFeed( /** Expressed in the unit of measure given by MapMode (default dots). */
ufCount) {
  try {
    return await CitizenEscposprinter.unitFeed(ufCount);
  } catch (error) {
    return handleRejection(error);
  }
}

/** This method is used to utilize label paper and black mark paper. */
async function markFeed(type) {
  try {
    return await CitizenEscposprinter.markFeed(type);
  } catch (error) {
    return handleRejection(error);
  }
}

/** This method is used to open the cash drawer is connected to the printer. */
async function openDrawer(drawer, /** 1 - 8 (x 100) msec */
pulseLen) {
  try {
    return await CitizenEscposprinter.openDrawer(drawer, pulseLen);
  } catch (error) {
    return handleRejection(error);
  }
}

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
async function transactionPrint(control) {
  try {
    return await CitizenEscposprinter.transactionPrint(control);
  } catch (error) {
    return handleRejection(error);
  }
}

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
async function rotatePrint(rotation) {
  try {
    return await CitizenEscposprinter.rotatePrint(rotation);
  } catch (error) {
    return handleRejection(error);
  }
}

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
async function pageModePrint(control) {
  try {
    return await CitizenEscposprinter.pageModePrint(control);
  } catch (error) {
    return handleRejection(error);
  }
}

/** This method is used to clear the area defined by the PageModePrintArea property. */
async function clearPrintArea() {
  try {
    return await CitizenEscposprinter.clearPrintArea();
  } catch (error) {
    return handleRejection(error);
  }
}

/**
 * This method is used to clear all buffered output data by tranzactionPrint
 * method and `pageModePrint` method.
 *
 * Also, when possible, halts outputs that are in progress. At the same time,
 * the command to clear print data on the printer is sent.
 */
async function clearOutput() {
  try {
    return await CitizenEscposprinter.clearOutput();
  } catch (error) {
    return handleRejection(error);
  }
}

/**
 * This method is used to send data bytes to the printer directly.
 *
 * It is usually not necessary, please use if you want to send ESC commands
 * directly to the printer.
 *
 * If you want to use, please be careful so as not to affect the other methods.
 */
async function printData(data) {
  try {
    return await CitizenEscposprinter.printData(data);
  } catch (error) {
    return handleRejection(error);
  }
}

/**
 * This method is used to print using the escape sequences that are defined in
 * the OPOS.
 *
 * Please refer to "Programming Manual" for more information.
 */
async function printNormal(data) {
  try {
    return await CitizenEscposprinter.printNormal(data);
  } catch (error) {
    return handleRejection(error);
  }
}

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
async function watermarkPrint(start, /** 1 - 20 */
nvImageNumber,
/**
 * 0 - 65,535 (dots)
 *
 * Expressed in the unit of measure given by MapMode (default dots).
 */
pass,
/**
 * 0 - 65,535 (dots)
 *
 * Expressed in the unit of measure given by MapMode (default dots).
 */
feed,
/**
 * 0: Infinite repetition
 *
 * 1 - 65,535: The repetition number of times
 */
repeat) {
  try {
    return await CitizenEscposprinter.watermarkPrint(start, nvImageNumber, pass, feed, repeat);
  } catch (error) {
    return handleRejection(error);
  }
}

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
async function searchCitizenPrinter(connectType, timeout) {
  try {
    const printers = await CitizenEscposprinter.searchCitizenPrinter(connectType, timeout ?? (connectType === _ESCPOSConst.ESCPOSConst.CMP_PORT_WiFi ? 5 : 10));
    return printers;
  } catch (error) {
    return handleRejection(error);
  }
}

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
async function searchESCPOSPrinter(connectType, timeout) {
  try {
    return await CitizenEscposprinter.searchESCPOSPrinter(connectType, timeout ?? (connectType === _ESCPOSConst.ESCPOSConst.CMP_PORT_WiFi ? 5 : 10));
  } catch (error) {
    return handleRejection(error);
  }
}

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
async function printerCheckEx(connectType,
/**
 * WiFi:
 * - 0.0.0.0 ~ 255.255.255.255
 *
 * Bluetooth:
 * - 00:00:00:00:00:00 ~ FF:FF:FF:FF:FF:FF
 * - Device name (Automatic detection)
 */
address, port, timeout) {
  try {
    return await CitizenEscposprinter.printerCheckEx(connectType, address, port, timeout);
  } catch (error) {
    return handleRejection(error);
  }
}

/**
 * This method is used to connect printer and open the cash drawer is connected
 * to the printer. After the process is complete, disconnect the connection.
 *
 * This method can execute even if the printer error (cover open or paper empty).
 */
function openDrawerEx(drawer, /** 1 - 8 (x 100) msec */
pulseLen, connectType,
/**
 * WiFi:
 * - 0.0.0.0 ~ 255.255.255.255
 *
 * Bluetooth:
 * - 00:00:00:00:00:00 ~ FF:FF:FF:FF:FF:FF
 * - Device name (Automatic detection)
 */
address, port, timeout) {
  try {
    return CitizenEscposprinter.openDrawerEx(drawer, pulseLen, connectType, address, port, timeout);
  } catch (error) {
    return handleRejection(error);
  }
}

/**
 * This method is used to set the timeout to check the print completion
 * notification.
 *
 * When you create an instance, the timeout is initialized to 0.
 *
 * Please refer to "2.5.1. Function to detect the completion of printing"
 * for details of the function to detect the completion of printing.
 */
async function setPrintCompletedTimeout(
/**
 * 0: Automatically adjusts the timeout.
 *
 * Other Values: Specify the timeout. Expressed in milliseconds.
 */
timeout) {
  try {
    return await CitizenEscposprinter.setPrintCompletedTimeout(timeout);
  } catch (error) {
    return handleRejection(error);
  }
}

/** Sets the logging function. See "3.2 Logging function" for more details */
async function setLog(
/**
 * 0: None
 *
 * 1: Access logs
 *
 * 2: Error logs
 */
mode, /** The folder of the external storage path */
path,
/**
 * Maximum size (MB)
 *
 * 0: Unlimited
 */
maxSize) {
  try {
    return await CitizenEscposprinter.setLog(mode, path, maxSize);
  } catch (error) {
    return handleRejection(error);
  }
}

/**
 * This method is used to get a numerical value for the version number of this SDK.
 *
 * @returns Return a numerical value for the version number of this SDK. (Ver1.00 is 100)
 */
async function getVersionCode() {
  try {
    return CitizenEscposprinter.getVersionCode();
  } catch (error) {
    return handleRejection(error);
  }
}

/**
 * This method is used to get a string for the version number of this SDK.
 *
 * @returns Return a string for the version number of this SDK. (Ver1.00 is "1.00")
 */
async function getVersionName() {
  try {
    return CitizenEscposprinter.getVersionName();
  } catch (error) {
    return handleRejection(error);
  }
}

// TODO: Rewrite CONTRIBUTING.md, telling them to implement a function in oldarch, newarch and ios in PRs
// TODO: Connect UsbDevice
//# sourceMappingURL=index.js.map
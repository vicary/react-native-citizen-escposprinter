import { NativeModules, Platform } from "react-native";
import { getPrintError } from "./errors";
import {
  ESCPOSConst,
  type CitizenPrinerInfo,
  type CitizenPrinerWiFiInfo,
  type ESCPOSPrinterBarcodeType,
  type ESCPOSPrinterConnectType,
  type ESCPOSPrinterCutType,
  type ESCPOSPrinterDrawer,
  type ESCPOSPrinterGS1DatabarType,
  type ESCPOSPrinterMapMode,
  type ESCPOSPrinterMarkFeedType,
  type ESCPOSPrinterPageModeControl,
  type ESCPOSPrinterPageModePrintDirection,
  type ESCPOSPrinterPDF417ECLevel,
  type ESCPOSPrinterPrintAlignment,
  type ESCPOSPrinterQRCodeECLevel,
  type ESCPOSPrinterRotation,
  type ESCPOSPrinterSearchType,
  type ESCPOSPrinterSide,
  type ESCPOSPrinterStatus,
  type ESCPOSPrinterTextPosition,
  type ESCPOSPrinterTransactionControl,
  type ESCPOSPrinterTypeface,
  type ESCPOSPrinterWatermarkStart,
} from "./ESCPOSConst";
import type { Spec } from "./NativeCitizenEscposprinter";

// @ts-expect-error ts(7017)
const isTurboModuleEnabled = global.__turboModuleProxy != null;

const CitizenEscposprinter: Spec = isTurboModuleEnabled
  ? // eslint-disable-next-line @typescript-eslint/no-var-requires
    require("./NativeCitizenEscposprinter").default
  : NativeModules.CitizenEscposprinter;

if (!CitizenEscposprinter) {
  throw new Error(
    "The package 'react-native-citizen-escposprinter' doesn't seem to be linked. Make sure: \n\n" +
      Platform.select({ ios: "- You have run 'pod install'\n", default: "" }) +
      "- You rebuilt the app after installing the package\n" +
      "- You are not using Expo Go\n",
  );
}

const handleRejection = (error: unknown) => {
  if (error instanceof Error || (typeof error === "object" && error !== null)) {
    const code = Reflect.get(error, "message") | 0;

    error = getPrintError(code) ?? error;
  }

  throw error;
};

export {
  ESCPOSConst,
  type CitizenPrinerInfo,
  type CitizenPrinerWiFiInfo,
  type ESCPOSPrinterBarcodeType,
  type ESCPOSPrinterConnectType,
  type ESCPOSPrinterCutType,
  type ESCPOSPrinterDrawer,
  type ESCPOSPrinterGS1DatabarType,
  type ESCPOSPrinterMapMode,
  type ESCPOSPrinterMarkFeedType,
  type ESCPOSPrinterPageModeControl,
  type ESCPOSPrinterPageModePrintDirection,
  type ESCPOSPrinterPDF417ECLevel,
  type ESCPOSPrinterPrintAlignment,
  type ESCPOSPrinterQRCodeECLevel,
  type ESCPOSPrinterRotation,
  type ESCPOSPrinterSearchType,
  type ESCPOSPrinterSide,
  type ESCPOSPrinterTextPosition,
  type ESCPOSPrinterTransactionControl,
  type ESCPOSPrinterTypeface,
  type ESCPOSPrinterWatermarkStart,
};

/**
 * This method is used to connect the printer. Please specify the type and
 * address of the printer connection.
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
 * Connection port number is valid only for Wifi or USB, default values are:
 * 1. Android Wifi: 9100
 * 2. iOS Wifi: 9210
 * 3. iOS USB: 2
 *
 * Timeout is gives the maximum number of milliseconds to connect printer,
 * timeout is ignored for USB connections. Default values are:
 * 1. Wifi: 4000
 * 2. Bluetooth: 8000
 *
 * When connecting to the printer, this SDK also checks the status of the
 * printer and the supporting models.
 *
 * When communication with the printer is not necessary, must execute the
 * dissconnect method to disconnect the printer connection. When not disconnect,
 * the next connection will be an error.
 *
 * Note on Android:
 * When you first connect with USB, a dialog asking permission to access the USB
 * device on the Android terminal will be displayed, please tap the OK button.
 */
export async function connect(
  connectType: ESCPOSPrinterConnectType,
  address = "",
  port = 0,
  timeout = 0,
) {
  address = address?.trim();

  if (connectType === ESCPOSConst.CMP_PORT_USB) {
    if (address) {
      throw new Error(`USB connections by serial number is not supported.`);
    }
  } else {
    if (!address) {
      throw new Error(`Device address is required for non-USB connections.`);
    }
  }

  try {
    return await CitizenEscposprinter.connect(
      connectType,
      address,
      port,
      timeout,
    );
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
export async function disconnect() {
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
export async function setEncoding(encoding: string) {
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
export async function printerCheck() {
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
export async function status(
  /** ESCPOSPrinterStatus */
  type = 0,
) {
  try {
    if (Platform.OS === "ios") {
      return await CitizenEscposprinter.status(0);
    } else {
      return await CitizenEscposprinter.status(type);
    }
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
export async function printText(
  data: string,
  alignment: ESCPOSPrinterPrintAlignment = ESCPOSConst.CMP_ALIGNMENT_LEFT,
  /** @type import("./ESCPOSConst").ESCPOSPrinterTextAttribute */
  attribute: number = ESCPOSConst.CMP_FNT_DEFAULT,
  /** @type import("./ESCPOSConst").ESCPOSPrinterTextSize */
  textSize: number = ESCPOSConst.CMP_TXT_1WIDTH | ESCPOSConst.CMP_TXT_1HEIGHT,
) {
  try {
    return await CitizenEscposprinter.printText(
      data,
      alignment,
      attribute,
      textSize,
    );
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
export async function printPaddingText(
  data: string,
  /** @type import("./ESCPOSConst").ESCPOSPrinterTextAttribute */
  attribute: number,
  /** @type import("./ESCPOSConst").ESCPOSPrinterTextSize */
  textSize: number,
  length: number,
  side: ESCPOSPrinterSide,
) {
  try {
    return await CitizenEscposprinter.printPaddingText(
      data,
      attribute,
      textSize,
      length,
      side,
    );
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
export async function printTextLocalFont(
  data: string,
  alignment: ESCPOSPrinterPrintAlignment,
  fontType: ESCPOSPrinterTypeface,
  point: number,
  /** @type import("./ESCPOSConst").ESCPOSPrinterFontStyle */
  style: number,
  /** 1-1000 */
  hRatio: number,
  /** 1-1000 */
  vRatio: number,
) {
  try {
    return await CitizenEscposprinter.printTextLocalFont(
      data,
      alignment,
      fontType,
      point,
      style,
      hRatio,
      vRatio,
    );
  } catch (error) {
    return handleRejection(error);
  }
}

/**
 * This method is used to print bitmap which specifies base64 encoded bitmap
 * data, along with width, alignment and mode.
 */
export async function printBitmap(
  /** base64 encoded bitmap data */
  data: string,
  width: number = ESCPOSConst.CMP_BM_ASIS,
  alignment: ESCPOSPrinterPrintAlignment = ESCPOSConst.CMP_ALIGNMENT_CENTER,
  /** @type import("./ESCPOSConst").ESCPOSPrinterBitmapMode */
  mode: number = ESCPOSConst.CMP_BM_MODE_HT_THRESHOLD |
    ESCPOSConst.CMP_BM_MODE_CMD_RASTER,
) {
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
export async function setNVBitmap() {
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
export async function printNVBitmap(
  /** 1 - 20 */
  nvImageNumber: number,
) {
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
export async function printBarCode(
  data: string,
  symbology: ESCPOSPrinterBarcodeType,
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
  width: number,
  alignment: ESCPOSPrinterPrintAlignment,
  textPosition: ESCPOSPrinterTextPosition,
) {
  try {
    return await CitizenEscposprinter.printBarCode(
      data,
      symbology,
      height,
      width,
      alignment,
      textPosition,
    );
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
export async function printPDF417(
  data: string,
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
  stepHeight: number,
  ECLevel: ESCPOSPrinterPDF417ECLevel,
  alignment: ESCPOSPrinterPrintAlignment,
) {
  try {
    return await CitizenEscposprinter.printPDF417(
      data,
      digits,
      steps,
      moduleWidth,
      stepHeight,
      ECLevel,
      alignment,
    );
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
export async function printQRCode(
  data: string,
  /**
   * 1 - 16 (dots)
   *
   * Expressed in the unit of measure given by MapMode (default dots).
   */
  moduleSize: number,
  ECLevel: ESCPOSPrinterQRCodeECLevel,
  alignment: ESCPOSPrinterPrintAlignment = ESCPOSConst.CMP_ALIGNMENT_CENTER,
) {
  try {
    return await CitizenEscposprinter.printQRCode(
      data,
      moduleSize,
      ECLevel,
      alignment,
    );
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
export async function printGS1DataBarStacked(
  data: string,
  symbology: ESCPOSPrinterGS1DatabarType,
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
  maxSize: number,
  alignment: ESCPOSPrinterPrintAlignment,
) {
  try {
    return await CitizenEscposprinter.printGS1DataBarStacked(
      data,
      symbology,
      moduleSize,
      maxSize,
      alignment,
    );
  } catch (error) {
    return handleRejection(error);
  }
}

/** This method is used to cut the paper. */
export async function cutPaper(type: ESCPOSPrinterCutType) {
  try {
    return await CitizenEscposprinter.cutPaper(type);
  } catch (error) {
    return handleRejection(error);
  }
}

/** This method is used to feed the paper in dot units. */
export async function unitFeed(
  /** Expressed in the unit of measure given by MapMode (default dots). */
  ufCount: number,
) {
  try {
    return await CitizenEscposprinter.unitFeed(ufCount);
  } catch (error) {
    return handleRejection(error);
  }
}

/** This method is used to utilize label paper and black mark paper. */
export async function markFeed(type: ESCPOSPrinterMarkFeedType) {
  try {
    return await CitizenEscposprinter.markFeed(type);
  } catch (error) {
    return handleRejection(error);
  }
}

/** This method is used to open the cash drawer is connected to the printer. */
export async function openDrawer(
  drawer: ESCPOSPrinterDrawer,
  /** 1 - 8 (x 100) msec */
  pulseLen: number,
) {
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
export async function transactionPrint(
  control: ESCPOSPrinterTransactionControl,
) {
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
export async function rotatePrint(rotation: ESCPOSPrinterRotation) {
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
export async function pageModePrint(control: ESCPOSPrinterPageModeControl) {
  try {
    return await CitizenEscposprinter.pageModePrint(control);
  } catch (error) {
    return handleRejection(error);
  }
}

/** This method is used to clear the area defined by the PageModePrintArea property. */
export async function clearPrintArea() {
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
export async function clearOutput() {
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
export async function printData(data: string) {
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
export async function printNormal(data: string) {
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
export async function watermarkPrint(
  start: ESCPOSPrinterWatermarkStart,
  /** 1 - 20 */
  nvImageNumber: number,
  /**
   * 0 - 65,535 (dots)
   *
   * Expressed in the unit of measure given by MapMode (default dots).
   */
  pass: number,
  /**
   * 0 - 65,535 (dots)
   *
   * Expressed in the unit of measure given by MapMode (default dots).
   */
  feed: number,
  /**
   * 0: Infinite repetition
   *
   * 1 - 65,535: The repetition number of times
   */
  repeat: number,
) {
  try {
    return await CitizenEscposprinter.watermarkPrint(
      start,
      nvImageNumber,
      pass,
      feed,
      repeat,
    );
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
export async function searchCitizenPrinter(
  connectType: ESCPOSPrinterSearchType,
  timeout?: number,
) {
  try {
    const printers = await CitizenEscposprinter.searchCitizenPrinter(
      connectType,
      timeout ?? (connectType === ESCPOSConst.CMP_PORT_WiFi ? 5 : 10),
    );

    return printers as CitizenPrinerInfo[];
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
export async function searchESCPOSPrinter(
  connectType: ESCPOSPrinterSearchType,
  timeout?: number,
) {
  try {
    return await CitizenEscposprinter.searchESCPOSPrinter(
      connectType,
      timeout ?? (connectType === ESCPOSConst.CMP_PORT_WiFi ? 5 : 10),
    );
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
export async function printerCheckEx(
  connectType: ESCPOSPrinterConnectType,
  /**
   * WiFi:
   * - 0.0.0.0 ~ 255.255.255.255
   *
   * Bluetooth:
   * - 00:00:00:00:00:00 ~ FF:FF:FF:FF:FF:FF
   * - Device name (Automatic detection)
   */
  address = "",
  port = 0,
  timeout = 0,
): Promise<ESCPOSPrinterStatus> {
  address = address?.trim();

  try {
    return await CitizenEscposprinter.printerCheckEx(
      connectType,
      address,
      port,
      timeout,
    );
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
export function openDrawerEx(
  drawer: ESCPOSPrinterDrawer,
  /** 1 - 8 (x 100) msec */
  pulseLen: number,
  connectType: ESCPOSPrinterConnectType,
  /**
   * WiFi:
   * - 0.0.0.0 ~ 255.255.255.255
   *
   * Bluetooth:
   * - 00:00:00:00:00:00 ~ FF:FF:FF:FF:FF:FF
   * - Device name (Automatic detection)
   */
  address = "",
  port = 0,
  timeout = 0,
) {
  try {
    return CitizenEscposprinter.openDrawerEx(
      drawer,
      pulseLen,
      connectType,
      address,
      port,
      timeout,
    );
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
export async function setPrintCompletedTimeout(
  /**
   * 0: Automatically adjusts the timeout.
   *
   * Other Values: Specify the timeout. Expressed in milliseconds.
   */
  timeout: number,
) {
  try {
    return await CitizenEscposprinter.setPrintCompletedTimeout(timeout);
  } catch (error) {
    return handleRejection(error);
  }
}

/** Sets the logging function. See "3.2 Logging function" for more details */
export async function setLog(
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
  maxSize: number,
) {
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
export async function getVersionCode() {
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
export async function getVersionName() {
  try {
    return CitizenEscposprinter.getVersionName();
  } catch (error) {
    return handleRejection(error);
  }
}

/**
 * This property holds the page area. Expressed in the unit of measure given by
 * MapMode (default dots). The string consists of two ASCII numbers separated by
 * a comma, in the following order: horizontal size, vertical size.
 *
 * This page area is determined by the hardware capability of the printer.
 * - CT-S251 Series: “432,1662”
 * - CT-S281/281II Series: “384,938”
 * - CT-D101/150/151, CT-E301/351/601/651, CT-S310II/601/651/801/851/601II/651II/801II/851II/ 801III/851III/751/2000, PMU3300 Series: "576,1662"
 * - CT-S4000/4500 Series: "832,1662"
 * - CMP-20 Series: "384,938"
 * - CMP-30 Series: "576,938"
 *
 * For example, if the string is “384,938”, then the page size is 384 horizontal
 * units by 938 vertical units, and the station print area is a rectangle
 * beginning at the top left point (0,0), and continuing up to the bottom
 * right point (383,937).
 *
 * The connect method must be complete before accessing this property. This
 * property is set in connect method.
 */
export async function getPageModeArea() {
  try {
    return CitizenEscposprinter.getPageModeArea();
  } catch (error) {
    return handleRejection(error);
  }
}

// [ ] Refactor direct wrappers into a class based API
// 1. For multiple printer instances
// 2. Property accessors instead of get*/set* wrapper methods

/**
 * This property holds the print area of Page Mode. Expressed in the unit of
 * measure given by MapMode (default dots). The maximum print area is the page
 * area. The string consists of four ASCII numbers separated by commas, in the
 * following order: horizontal start, vertical start, horizontal size, vertical
 * size.
 *
 * Text written to the right edge of the print area will wrap to the next line.
 * Any text or image written beyond the bottom of the print area will be
 * truncated.
 *
 * For example, if the string is “50,100,200,400”, then the station print area
 * is a rectangle beginning at the point (50,100), and continuing up to the
 * point (249,499).
 *
 * The connect method must be complete before accessing this property. This
 * property is initialized to “0,0,0,0” at connect method.
 */
export async function getPageModePrintArea() {
  try {
    return CitizenEscposprinter.getPageModePrintArea();
  } catch (error) {
    return handleRejection(error);
  }
}

export async function setPageModePrintArea(area: string) {
  try {
    return CitizenEscposprinter.setPageModePrintArea(area);
  } catch (error) {
    return handleRejection(error);
  }
}

/**
 * This property holds the print direction of the Page Mode print area. The
 * print direction values are as follows.
 *
 * | Value                  | Meaning                                                                 |
 * | :--------------------- | :---------------------------------------------------------------------- |
 * | `CMP_PD_LEFT_TO_RIGHT` | Print left to right, starting at top left position of the print area,   |
 * |                        | i.e., normal printing.                                                  |
 * | `CMP_PD_BOTTOM_TO_TOP` | Print bottom to top, starting at the bottom left position of the print  |
 * |                        | area, i.e., rotated left 90° printing.                                  |
 * | `CMP_PD_RIGHT_TO_LEFT` | Print right to left, starting at the bottom right position of the print |
 * |                        | area, i.e., upside down printing.                                       |
 * | `CMP_PD_TOP_TO_BOTTOM` | Print top to bottom, starting at the top right position of the print    |
 * |                        | area, i.e., rotated right 90° printing.                                 |
 *
 * Setting this property may also change PageModeHorizontalPosition and
 * PageModeVerticalPosition. Setting this property will have an effect on the
 * current print area. By changing the print area, it is possible to generate a
 * receipt or slip with text printed in multiple rotations.
 *
 * The connect method must be complete before accessing this property. This
 * property is initialized to `CMP_PD_LEFT_TO_RIGHT` at connect method.
 */
export async function getPageModePrintDirection(): Promise<ESCPOSPrinterPageModePrintDirection> {
  try {
    return CitizenEscposprinter.getPageModePrintDirection();
  } catch (error) {
    return handleRejection(error);
  }
}

export async function setPageModePrintDirection(
  direction: ESCPOSPrinterPageModePrintDirection,
) {
  try {
    return CitizenEscposprinter.setPageModePrintDirection(direction);
  } catch (error) {
    return handleRejection(error);
  }
}

/**
 * This property holds the horizontal start position offset within the Page Mode
 * print area, expressed in the unit of dot.
 *
 * The horizontal direction is the same as the actual PageModePrintDirection
 * property.
 *
 * A read/get on this property will return the horizontal position offset set by
 * the last write/set and not the current position.
 *
 * The connect method must be complete before accessing this property. This
 * property is initialized to zero (0) at connect method.
 */
export async function getPageModeHorizontalPosition() {
  try {
    return CitizenEscposprinter.getPageModeHorizontalPosition();
  } catch (error) {
    return handleRejection(error);
  }
}

export async function setPageModeHorizontalPosition(position: number) {
  try {
    return CitizenEscposprinter.setPageModeHorizontalPosition(position);
  } catch (error) {
    return handleRejection(error);
  }
}

/**
 * This property holds the vertical start position offset within the Page Mode
 * print area, expressed in the unit of dot.
 *
 * The vertical direction is perpendicular to the direction specified in the
 * actual PageModePrintDirection property.
 *
 * A read/get on this property will return the vertical position offset set by
 * the last write/set and not the current position.
 *
 * The connect method must be complete before accessing this property. This
 * property is initialized to zero (0) at connect method.
 */
export async function getPageModeVerticalPosition() {
  try {
    return CitizenEscposprinter.getPageModeVerticalPosition();
  } catch (error) {
    return handleRejection(error);
  }
}

export async function setPageModeVerticalPosition(position: number) {
  try {
    return CitizenEscposprinter.setPageModeVerticalPosition(position);
  } catch (error) {
    return handleRejection(error);
  }
}

/**
 * This property holds the spacing of each single-high print line, including
 * both the printed line height plus the whitespace between each pair of lines,
 * expressed in the unit of dot.
 *
 * Depending upon the current line spacing, a multi-high print line might exceed
 * this value. In this case, the whitespace is zero.
 *
 * The connect method must be complete before accessing this property. This
 * property is initialized to 34 at connect method.
 */
export async function getRecLineSpacing() {
  try {
    return CitizenEscposprinter.getRecLineSpacing();
  } catch (error) {
    return handleRejection(error);
  }
}

export async function setRecLineSpacing(spacing: number) {
  try {
    return CitizenEscposprinter.setRecLineSpacing(spacing);
  } catch (error) {
    return handleRejection(error);
  }
}

/**
 * This property holds the mapping mode of the printer. The mapping mode defines
 * the unit of measure used for other properties, such as line heights and line
 * spacing. The map mode values are as follows.
 *
 * | Value           | Meaning                  |
 * |:----------------|:-------------------------|
 * | CMP_MM_DOTS     | The printer’s dot width. |
 * | CMP_MM_TWIPS    | 1/1440 of an inch.       |
 * | CMP_MM_ENGLISH  | 0.001 inch.              |
 * | CMP_MM_METRIC   | 0.01 millimeter.         |
 *
 * The method and the properties to be affected by the MapMode property are as
 * follows:
 * - `printBitmap` method: width, alignment
 * - `printBitmapData` method: width, alignment
 * - `setNVBitmap` method: width
 * - `printBarcode` method: height, width, alignment
 * - `printPDF417` method: moduleWidth, alignment
 * - `printQRCode` method: moduleSize, alignment
 * - `printGS1DataBarStacked` method: moduleSize, maxSize, alignment
 * - `unitFeed` method: ufCount
 * - `watermarkPrint` method: pass, feed
 * - `PageModeArea` property
 * - `PageModePrintArea` property
 * - `PageModeHorizontalPosition` property
 * - `PageModeVerticalPosition` property
 * - `RecLineSpacing` property
 *
 * The connect method must be complete before accessing this property. This
 * property is initialized to CMP_MM_DOTS at connect method.
 */
export async function getMapMode(): Promise<ESCPOSPrinterMapMode> {
  try {
    return CitizenEscposprinter.getMapMode();
  } catch (error) {
    return handleRejection(error);
  }
}

export async function setMapMode(mode: ESCPOSPrinterMapMode) {
  try {
    return CitizenEscposprinter.setMapMode(mode);
  } catch (error) {
    return handleRejection(error);
  }
}

export async function getRecCharacterSpacing() {
  throw new Error(
    "Not implemented in iOS SDK, file a feature request if you need this in Android.",
  );
}

export async function setRecCharacterSpacing(_spacing: number) {
  throw new Error(
    "Not implemented in iOS SDK, file a feature request if you need this in Android.",
  );
}

export async function getRecKanjiLeftSpacing() {
  throw new Error(
    "Not implemented in iOS SDK, file a feature request if you need this in Android.",
  );
}

export async function setRecKanjiLeftSpacing(_spacing: number) {
  throw new Error(
    "Not implemented in iOS SDK, file a feature request if you need this in Android.",
  );
}

export async function getRecKanjiRightSpacing() {
  throw new Error(
    "Not implemented in iOS SDK, file a feature request if you need this in Android.",
  );
}

export async function setRecKanjiRightSpacing(_spacing: number) {
  throw new Error(
    "Not implemented in iOS SDK, file a feature request if you need this in Android.",
  );
}

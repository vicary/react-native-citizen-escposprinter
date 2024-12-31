import type { TurboModule } from "react-native";
import { TurboModuleRegistry } from "react-native";

export interface Spec extends TurboModule {
  connect(
    /** @type ESCPOSPrinterConnectType */
    connectType: number,
    address: string,
    port: number,
    timeout: number,
  ): Promise<number>;

  disconnect(id: number): Promise<void>;

  setEncoding(id: number, encoding: string): Promise<void>;

  printerCheck(id: number): Promise<void>;

  status(
    id: number,
    /** ESCPOSPrinterStatus */
    type: number,
  ): Promise<number>;

  printText(
    id: number,
    data: string,
    /** @type ESCPOSPrinterPrintAlignment */
    alignment: number,
    /** @type ESCPOSPrinterTextAttribute */
    attribute: number,
    /** @type ESCPOSPrinterTextSize */
    textSize: number,
  ): Promise<void>;

  printPaddingText(
    id: number,
    data: string,
    /** @type ESCPOSPrinterTextAttribute */
    attribute: number,
    /** @type ESCPOSPrinterTextSize */
    textSize: number,
    length: number,
    /** @type ESCPOSConst.CMP_SIDE_RIGHT | ESCPOSConst.CMP_SIDE_LEFT */
    side: number,
  ): Promise<void>;

  printTextLocalFont(
    id: number,
    data: string,
    /** @type ESCPOSPrinterPrintAlignment */
    alignment: number,
    /** @type ESCPOSPrinterTypeface */
    fontType: string,
    point: number,
    /** @type ESCPOSPrinterFontStyle */
    style: number,
    /** 1-1000 */
    hRatio: number,
    /** 1-1000 */
    vRatio: number,
  ): Promise<void>;

  printBitmap(
    id: number,
    data: string,
    width: number,
    /** @type ESCPOSPrinterPrintAlignment */
    alignment: number,
    /** @type ESCPOSPrinterBitmapMode */
    mode: number,
  ): Promise<void>;

  printBarCode(
    id: number,
    data: string,
    /** @type ESCPOSPrinterBarcodeType */
    symbology: number,
    height: number,
    width: number,
    /** @type ESCPOSPrinterPrintAlignment */
    alignment: number,
    /** @type ESCPOSPrinterTextPosition */
    textPosition: number,
  ): Promise<void>;

  printPDF417(
    id: number,
    data: string,
    digits: number,
    steps: number,
    moduleWidth: number,
    stepHeight: number,
    /** @type ESCPOSPrinterPDF417ECLevel */
    ECLevel: number,
    /** @type ESCPOSPrinterPrintAlignment */
    alignment: number,
  ): Promise<void>;

  printQRCode(
    id: number,
    data: string,
    moduleSize: number,
    /** @type ESCPOSPrinterQRCodeECLevel */
    ECLevel: number,
    /** @type ESCPOSPrinterPrintAlignment */
    alignment: number,
  ): Promise<void>;

  printGS1DataBarStacked(
    id: number,
    data: string,
    /** @type ESCPOSPrinterGS1DatabarType */
    symbology: number,
    moduleSize: number,
    maxSize: number,
    /** @type ESCPOSPrinterPrintAlignment */
    alignment: number,
  ): Promise<void>;

  cutPaper(
    id: number,
    /** @type ESCPOSPrinterCutType */
    type: number,
  ): Promise<void>;

  unitFeed(id: number, ufCount: number): Promise<void>;

  markFeed(
    id: number,
    /** @type ESCPOSPrinterMarkFeedType */
    type: number,
  ): Promise<void>;

  openDrawer(
    id: number,
    /** @type ESCPOSPrinterDrawer */
    drawer: number,
    pulseLen: number,
  ): Promise<void>;

  transactionPrint(
    id: number,
    /** @type ESCPOSPrinterTransactionControl */
    control: number,
  ): Promise<void>;

  rotatePrint(
    id: number,
    /** @type ESCPOSPrinterRotation */
    rotation: number,
  ): Promise<void>;

  pageModePrint(
    id: number,
    /** @type ESCPOSPrinterPageModeControl */
    control: number,
  ): Promise<void>;

  clearPrintArea(id: number): Promise<void>;

  clearOutput(id: number): Promise<void>;

  printData(id: number, data: string): Promise<void>;

  printNormal(id: number, data: string): Promise<void>;

  watermarkPrint(
    id: number,
    start: number,
    nvImageNumber: number,
    pass: number,
    feed: number,
    repeat: number,
  ): Promise<void>;

  printNVBitmap(id: number, nvImageNumber: number): Promise<void>;

  searchCitizenPrinter(
    /** @type ESCPOSPrinterSearchType */
    connectType: number,
    timeout: number,
  ): Promise<object[]>;

  searchESCPOSPrinter(
    /** @type ESCPOSPrinterSearchType */
    connectType: number,
    timeout: number,
  ): Promise<string[]>;

  printerCheckEx(
    id: number,
    /** @type ESCPOSPrinterConnectType */
    connectType: number,
    address: string,
    port: number,
    timeout: number,
  ): Promise<number>;

  openDrawerEx(
    id: number,
    /** @type ESCPOSPrinterDrawer */
    drawer: number,
    pulseLen: number,
    /** @type ESCPOSPrinterConnectType */
    connectType: number,
    address: string,
    port: number,
    timeout: number,
  ): Promise<void>;

  setPrintCompletedTimeout(id: number, timeout: number): Promise<void>;

  setLog(
    id: number,
    mode: number,
    path: string,
    maxSize: number,
  ): Promise<void>;

  getVersionCode(): Promise<number>;

  getVersionName(): Promise<string>;

  getPageModeArea(id: number): Promise<string>;

  getPageModePrintArea(id: number): Promise<string>;

  setPageModePrintArea(id: number, area: string): Promise<void>;

  getPageModePrintDirection(id: number): Promise<number>;

  setPageModePrintDirection(
    id: number,
    /** @type ESCPOSPrinterPageModePrintDirection */
    direction: number,
  ): Promise<void>;

  getPageModeHorizontalPosition(id: number): Promise<number>;

  setPageModeHorizontalPosition(id: number, position: number): Promise<void>;

  getPageModeVerticalPosition(id: number): Promise<number>;

  setPageModeVerticalPosition(id: number, position: number): Promise<void>;

  getRecLineSpacing(id: number): Promise<number>;

  setRecLineSpacing(id: number, spacing: number): Promise<void>;

  getMapMode(id: number): Promise<number>;

  setMapMode(
    id: number,
    /** @type ESCPOSPrinterMapMode */
    mode: number,
  ): Promise<void>;
}

export default TurboModuleRegistry.getEnforcing<Spec>("CitizenEscposprinter");

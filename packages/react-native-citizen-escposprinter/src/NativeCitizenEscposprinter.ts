import type { TurboModule } from "react-native";
import { TurboModuleRegistry } from "react-native";

export interface Spec extends TurboModule {
  connect(
    /** @type ESCPOSPrinterConnectType */
    type: number,
    address: string,
    port?: number,
    timeout?: number,
  ): Promise<boolean>;

  disconnect(): Promise<void>;

  setEncoding(encoding: string): Promise<void>;

  printerCheck(): Promise<void>;

  status(
    /** ESCPOSPrinterStatus */
    type?: number,
  ): Promise<number>;

  printText(
    data: string,
    /** @type ESCPOSPrinterPrintAlignment */
    alignment: number,
    /** @type ESCPOSPrinterTextAttribute */
    attribute: number,
    /** @type ESCPOSPrinterTextSize */
    textSize: number,
  ): Promise<void>;

  printPaddingText(
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
    data: string,
    width?: number,
    /** @type ESCPOSPrinterPrintAlignment */
    alignment?: number,
    /** @type ESCPOSPrinterBitmapMode */
    mode?: number,
  ): Promise<void>;

  printBarCode(
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
    data: string,
    moduleSize: number,
    /** @type ESCPOSPrinterQRCodeECLevel */
    ECLevel: number,
    /** @type ESCPOSPrinterPrintAlignment */
    alignment: number,
  ): Promise<void>;

  printGS1DataBarStacked(
    data: string,
    /** @type ESCPOSPrinterGS1DatabarType */
    symbology: number,
    moduleSize: number,
    maxSize: number,
    /** @type ESCPOSPrinterPrintAlignment */
    alignment: number,
  ): Promise<void>;

  cutPaper(
    /** @type ESCPOSPrinterCutType */
    type: number,
  ): Promise<void>;

  unitFeed(ufCount: number): Promise<void>;

  markFeed(
    /** @type ESCPOSPrinterMarkFeedType */
    type: number,
  ): Promise<void>;

  openDrawer(
    /** @type ESCPOSPrinterDrawer */
    drawer: number,
    pulseLen: number,
  ): Promise<void>;

  transactionPrint(
    /** @type ESCPOSPrinterTransactionControl */
    control: number,
  ): Promise<void>;

  rotatePrint(
    /** @type ESCPOSPrinterRotation */
    rotation: number,
  ): Promise<void>;

  pageModePrint(
    /** @type ESCPOSPrinterPageModeControl */
    control: number,
  ): Promise<void>;

  clearPrintArea(): Promise<void>;

  clearOutput(): Promise<void>;

  printData(data: string): Promise<void>;

  printNormal(data: string): Promise<void>;

  printNVBitmap(nvImageNumber: number): Promise<void>;

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
    /** @type ESCPOSPrinterConnectType */
    connectType: number,
    address: string,
    port?: number,
    timeout?: number,
  ): Promise<void>;

  openDrawerEx(
    /** @type ESCPOSPrinterDrawer */
    drawer: number,
    pulseLen: number,
    /** @type ESCPOSPrinterConnectType */
    connectType: number,
    address: string,
    port?: number,
    timeout?: number,
  ): Promise<void>;

  setPrintCompletedTimeout(timeout: number): Promise<void>;

  setLog(mode: number, path: string, maxSize: number): Promise<void>;

  getVersionCode(): Promise<number>;

  getVersionName(): Promise<string>;
}

export default TurboModuleRegistry.getEnforcing<Spec>("CitizenEscposprinter");

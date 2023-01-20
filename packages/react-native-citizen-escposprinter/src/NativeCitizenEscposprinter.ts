import type { TurboModule } from "react-native";
import { TurboModuleRegistry } from "react-native";
import type {
  CitizenPrinerInfo,
  ESCPOSConst,
  ESCPOSPrinterBarcodeType,
  ESCPOSPrinterConnectType,
  ESCPOSPrinterCutType,
  ESCPOSPrinterDrawer,
  ESCPOSPrinterGS1DatabarType,
  ESCPOSPrinterMarkFeedType,
  ESCPOSPrinterPageModeControl,
  ESCPOSPrinterPDF417ECLevel,
  ESCPOSPrinterPrintAlignment,
  ESCPOSPrinterQRCodeECLevel,
  ESCPOSPrinterRotation,
  ESCPOSPrinterSearchType,
  ESCPOSPrinterTextPosition,
  ESCPOSPrinterTransactionControl,
  ESCPOSPrinterTypeface,
} from "./ESCPOSConst";

export interface Spec extends TurboModule {
  connect(
    type:
      | ESCPOSConst.CMP_PORT_Bluetooth
      | ESCPOSConst.CMP_PORT_Bluetooth_Insecure
      | ESCPOSConst.CMP_PORT_WiFi
      | ESCPOSConst.CMP_PORT_USB,
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
    alignment: ESCPOSPrinterPrintAlignment,
    /** ESCPOSPrinterTextAttribute */
    attribute: number,
    /** ESCPOSPrinterTextSize */
    textSize: number,
  ): Promise<void>;

  printPaddingText(
    data: string,
    /** ESCPOSPrinterTextAttribute */
    attribute: number,
    /** ESCPOSPrinterTextSize */
    textSize: number,
    length: number,
    side: ESCPOSConst.CMP_SIDE_RIGHT | ESCPOSConst.CMP_SIDE_LEFT,
  ): Promise<void>;

  printTextLocalFont(
    data: string,
    alignment: ESCPOSPrinterPrintAlignment,
    fontType: ESCPOSPrinterTypeface,
    point: number,
    /** ESCPOSPrinterFontStyle */
    style: number,
    /** 1-1000 */
    hRatio: number,
    /** 1-1000 */
    vRatio: number,
  ): Promise<void>;

  printBitmap(
    /** base64 encoded bitmap data */
    data: string,
    width?: number,
    alignment?: ESCPOSPrinterPrintAlignment,
    /** ESCPOSPrinterBitmapMode */
    mode?: number,
  ): Promise<void>;

  printBarCode(
    data: string,
    symbology: ESCPOSPrinterBarcodeType,
    height: number,
    width: number,
    alignment: ESCPOSPrinterPrintAlignment,
    textPosition: ESCPOSPrinterTextPosition,
  ): Promise<void>;

  printPDF417(
    data: string,
    digits: number,
    steps: number,
    moduleWidth: number,
    stepHeight: number,
    ECLevel: ESCPOSPrinterPDF417ECLevel,
    alignment: ESCPOSPrinterPrintAlignment,
  ): Promise<void>;

  printQRCode(
    data: string,
    moduleSize: number,
    ECLevel: ESCPOSPrinterQRCodeECLevel,
    alignment: ESCPOSPrinterPrintAlignment,
  ): Promise<void>;

  printGS1DataBarStacked(
    data: string,
    symbology: ESCPOSPrinterGS1DatabarType,
    moduleSize: number,
    maxSize: number,
    alignment: ESCPOSPrinterPrintAlignment,
  ): Promise<void>;

  cutPaper(type: ESCPOSPrinterCutType): Promise<void>;

  unitFeed(ufCount: number): Promise<void>;

  markFeed(type: ESCPOSPrinterMarkFeedType): Promise<void>;

  openDrawer(drawer: ESCPOSPrinterDrawer, pulseLen: number): Promise<void>;

  transactionPrint(control: ESCPOSPrinterTransactionControl): Promise<void>;

  rotatePrint(rotation: ESCPOSPrinterRotation): Promise<void>;

  pageModePrint(control: ESCPOSPrinterPageModeControl): Promise<void>;

  clearPrintArea(): Promise<void>;

  clearOutput(): Promise<void>;

  printData(data: string): Promise<void>;

  printNormal(data: string): Promise<void>;

  printNVBitmap(nvImageNumber: number): Promise<void>;

  searchCitizenPrinter(
    connectType: ESCPOSPrinterSearchType,
    timeout: number,
  ): Promise<CitizenPrinerInfo[]>;

  searchESCPOSPrinter(
    connectType:
      | ESCPOSConst.CMP_PORT_Bluetooth
      | ESCPOSConst.CMP_PORT_Bluetooth_Insecure
      | ESCPOSConst.CMP_PORT_WiFi,
    timeout: number,
  ): Promise<string[]>;

  printerCheckEx(
    connectType: ESCPOSPrinterConnectType,
    address: string,
    port?: number,
    timeout?: number,
  ): Promise<void>;

  openDrawerEx(
    drawer: ESCPOSPrinterDrawer,
    pulseLen: number,
    connectType: ESCPOSPrinterConnectType,
    address: string,
    port?: number,
    timeout?: number,
  ): Promise<void>;

  setPrintCompletedTimeout(timeout: number): Promise<void>;

  setLog(mode: 0 | 1 | 2, path: string, maxSize: number): Promise<void>;

  getVersionCode(): Promise<number>;

  getVersionName(): Promise<string>;
}

export default TurboModuleRegistry.getEnforcing<Spec>("CitizenEscposprinter");

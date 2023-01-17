import { NativeModules, Platform } from "react-native";
import { ESCPOSConst } from "./ESCPOSConst";

const LINKING_ERROR =
  "The package 'react-native-citizen-escposprinter' doesn't seem to be linked. Make sure: \n\n" +
  Platform.select({ ios: "- You have run 'pod install'\n", default: "" }) +
  "- You rebuilt the app after installing the package\n" +
  "- You are not using Expo Go\n";

// @ts-expect-error ts(7017)
const isTurboModuleEnabled = global.__turboModuleProxy != null;

const CitizenEscposprinter =
  (isTurboModuleEnabled
    ? // eslint-disable-next-line @typescript-eslint/no-var-requires
      require("./NativeCitizenEscposprinter").default
    : NativeModules.CitizenEscposprinter) ??
  new Proxy(
    {},
    {
      get() {
        throw new Error(LINKING_ERROR);
      },
    },
  );

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
export function connect(
  connectType:
    | ESCPOSConst.CMP_PORT_Bluetooth
    | ESCPOSConst.CMP_PORT_Bluetooth_Insecure
    | ESCPOSConst.CMP_PORT_WiFi
    | ESCPOSConst.CMP_PORT_USB,
  address: string,
  port = 9100,
): Promise<void> {
  return CitizenEscposprinter.connect(connectType, address, port);
}

/**
 * This method is used to disconnect the printer connection.
 *
 * When the end of the print or some kind of errors occurs, please disconnect
 * the connection by the execution of this method.
 */
export function disconnect(): Promise<void> {
  return CitizenEscposprinter.disconnect();
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
export function setEncoding(encoding: string): Promise<void> {
  return CitizenEscposprinter.setEncoding(encoding);
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
export function printerCheck(): Promise<void> {
  return CitizenEscposprinter.printerCheck();
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
export function status(
  type:
    | ESCPOSConst.CMP_STS_PRINTEROFF
    | ESCPOSConst.CMP_STS_MSR_READ
    | ESCPOSConst.CMP_STS_PAPER_EMPTY
    | ESCPOSConst.CMP_STS_COVER_OPEN
    | ESCPOSConst.CMP_STS_BATTERY_LOW
    | ESCPOSConst.CMP_STS_PAPER_NEAREMPTY
    | ESCPOSConst.CMP_STS_DRAWER_LEVEL_H
    | ESCPOSConst.CMP_STS_ONPRESENTER = 0,
): Promise<number> {
  return CitizenEscposprinter.status(type);
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
export function printText(
  data: string,
  alignment:
    | ESCPOSConst.CMP_ALIGNMENT_LEFT
    | ESCPOSConst.CMP_ALIGNMENT_CENTER
    | ESCPOSConst.CMP_ALIGNMENT_RIGHT,
  attribute:
    | ESCPOSConst.CMP_FNT_DEFAULT
    | ESCPOSConst.CMP_FNT_FONTB
    | ESCPOSConst.CMP_FNT_FONTC
    | ESCPOSConst.CMP_FNT_BOLD
    | ESCPOSConst.CMP_FNT_REVERSE
    | ESCPOSConst.CMP_FNT_UNDERLINE,
  textSize:
    | ESCPOSConst.CMP_TXT_1WIDTH
    | ESCPOSConst.CMP_TXT_2WIDTH
    | ESCPOSConst.CMP_TXT_3WIDTH
    | ESCPOSConst.CMP_TXT_4WIDTH
    | ESCPOSConst.CMP_TXT_5WIDTH
    | ESCPOSConst.CMP_TXT_6WIDTH
    | ESCPOSConst.CMP_TXT_7WIDTH
    | ESCPOSConst.CMP_TXT_8WIDTH
    | ESCPOSConst.CMP_TXT_1HEIGHT
    | ESCPOSConst.CMP_TXT_2HEIGHT
    | ESCPOSConst.CMP_TXT_3HEIGHT
    | ESCPOSConst.CMP_TXT_4HEIGHT
    | ESCPOSConst.CMP_TXT_5HEIGHT
    | ESCPOSConst.CMP_TXT_6HEIGHT
    | ESCPOSConst.CMP_TXT_7HEIGHT
    | ESCPOSConst.CMP_TXT_8HEIGHT,
): Promise<void> {
  return CitizenEscposprinter.printText(data, alignment, attribute, textSize);
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
export function printPaddingText(
  data: string,
  attribute:
    | ESCPOSConst.CMP_FNT_DEFAULT
    | ESCPOSConst.CMP_FNT_FONTB
    | ESCPOSConst.CMP_FNT_FONTC
    | ESCPOSConst.CMP_FNT_BOLD
    | ESCPOSConst.CMP_FNT_REVERSE
    | ESCPOSConst.CMP_FNT_UNDERLINE,
  textSize:
    | ESCPOSConst.CMP_TXT_1WIDTH
    | ESCPOSConst.CMP_TXT_2WIDTH
    | ESCPOSConst.CMP_TXT_3WIDTH
    | ESCPOSConst.CMP_TXT_4WIDTH
    | ESCPOSConst.CMP_TXT_5WIDTH
    | ESCPOSConst.CMP_TXT_6WIDTH
    | ESCPOSConst.CMP_TXT_7WIDTH
    | ESCPOSConst.CMP_TXT_8WIDTH
    | ESCPOSConst.CMP_TXT_1HEIGHT
    | ESCPOSConst.CMP_TXT_2HEIGHT
    | ESCPOSConst.CMP_TXT_3HEIGHT
    | ESCPOSConst.CMP_TXT_4HEIGHT
    | ESCPOSConst.CMP_TXT_5HEIGHT
    | ESCPOSConst.CMP_TXT_6HEIGHT
    | ESCPOSConst.CMP_TXT_7HEIGHT
    | ESCPOSConst.CMP_TXT_8HEIGHT,
  length: number,
  side: ESCPOSConst.CMP_SIDE_RIGHT | ESCPOSConst.CMP_SIDE_LEFT,
): Promise<void> {
  return CitizenEscposprinter.printPaddingText(
    data,
    attribute,
    textSize,
    length,
    side,
  );
}

export function searchESCPOSPrinter(
  ifType:
    | ESCPOSConst.CMP_PORT_Bluetooth
    | ESCPOSConst.CMP_PORT_Bluetooth_Insecure
    | ESCPOSConst.CMP_PORT_WiFi,
  timeout: number,
): Promise<string[]> {
  return CitizenEscposprinter.searchESCPOSPrinter(ifType, timeout);
}

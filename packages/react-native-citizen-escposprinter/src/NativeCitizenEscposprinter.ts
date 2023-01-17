import type { TurboModule } from "react-native";
import { TurboModuleRegistry } from "react-native";
import type { ESCPOSConst } from "./ESCPOSConst";

export interface Spec extends TurboModule {
  connect(
    type:
      | ESCPOSConst.CMP_PORT_Bluetooth
      | ESCPOSConst.CMP_PORT_Bluetooth_Insecure
      | ESCPOSConst.CMP_PORT_WiFi
      | ESCPOSConst.CMP_PORT_USB,
    address: string,
    port?: number,
  ): Promise<boolean>;

  disconnect(): Promise<void>;

  setEncoding(encoding: string): Promise<void>;

  printerCheck(): Promise<void>;

  status(
    type?:
      | ESCPOSConst.CMP_STS_PRINTEROFF
      | ESCPOSConst.CMP_STS_MSR_READ
      | ESCPOSConst.CMP_STS_PAPER_EMPTY
      | ESCPOSConst.CMP_STS_COVER_OPEN
      | ESCPOSConst.CMP_STS_BATTERY_LOW
      | ESCPOSConst.CMP_STS_PAPER_NEAREMPTY
      | ESCPOSConst.CMP_STS_DRAWER_LEVEL_H
      | ESCPOSConst.CMP_STS_ONPRESENTER,
  ): Promise<number>;

  printText(
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
  ): Promise<void>;

  printPaddingText(
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
  ): Promise<void>;

  searchESCPOSPrinter(
    type:
      | ESCPOSConst.CMP_PORT_Bluetooth
      | ESCPOSConst.CMP_PORT_Bluetooth_Insecure
      | ESCPOSConst.CMP_PORT_WiFi,
    timeout: number,
  ): Promise<string[]>;
}

export default TurboModuleRegistry.getEnforcing<Spec>("CitizenEscposprinter");

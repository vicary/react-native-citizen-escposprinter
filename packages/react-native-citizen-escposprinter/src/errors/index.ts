/**
 * | Return value                   | Description                                                                    |
 * |--------------------------------|--------------------------------------------------------------------------------|
 * | CMP_SUCCESS (0)                | The operation is success.                                                      |
 * | CMP_E_CONNECTED (1001)         | The printer is already connected.                                              |
 * | CMP_E_DISCONNECT (1002)        | The printer is not connected.                                                  |
 * | CMP_E_NOTCONNECT (1003)        | Failed connection to the printer.                                              |
 * | CMP_E_CONNECT_NOTFOUND (1004)  | Failed to check the support model after connecting to the device.              |
 * | CMP_E_CONNECT_OFFLINE (1005)   | Failed to check the printer status after connecting to the device.             |
 * | CMP_E_NOCONTEXT (1006)         | The context is not specified.                                                  |
 * | CMP_E_BT_DISABLE (1007)        | The setting of the Bluetooth device is invalid.                                |
 * | CMP_E_BT_NODEVICE (1008)       | The Bluetooth device is not found.                                             |
 * | CMP_E_ILLEGAL (1101)           | Unsupported operation with the Device, or an invalid parameter value was used. |
 * | CMP_E_OFFLINE (1102)           | The printer is off-line.                                                       |
 * | CMP_E_NOEXIST (1103)           | The file name does not exist.                                                  |
 * | CMP_E_FAILURE (1104)           | The Service cannot perform the requested procedure.                            |
 * | CMP_E_TIMEOUT (1105)           | The Service timed out waiting for a response from the printer.                 |
 * | CMP_E_NO_LIST (1106)           | The printer cannot be found in the printer search.                             |
 * | CMP_EX_DEV_NO_PRINTER (62000)  | Failed connection to the printer.                                              |
 * | CMP_EX_DEV_OPEN_ERROR (62100)  | Unable to connect socket or port.                                              |
 * | CMP_EX_DEV_SEND_ERROR (62101)  | Failed to send command to printer.                                             |
 * | CMP_EX_DEV_NO_RESPONSE (62102) | No command response from the printer.                                          |
 * | CMP_EPTR_COVER_OPEN (1201)     | The cover of the printer opens.                                                |
 * | CMP_EPTR_REC_EMPTY (1202)      | The printer is out of paper.                                                   |
 * | CMP_EPTR_BADFORMAT (1203)      | The specified file is in an unsupported format.                                |
 * | CMP_EPTR_TOOBIG (1204)         | The specified bitmap is too big.                                        |
 */

import { ESCPOSConst } from "../ESCPOSConst";

export abstract class PrinterError extends Error {
  constructor(readonly code: number, message: string) {
    super(message);
  }
}

export class Connected extends PrinterError {
  constructor() {
    super(ESCPOSConst.CMP_E_CONNECTED, "The printer is already connected.");
  }
}

export class Disconnected extends PrinterError {
  constructor() {
    super(ESCPOSConst.CMP_E_DISCONNECT, "The printer is not connected.");
  }
}

export class NotConnected extends PrinterError {
  constructor() {
    super(ESCPOSConst.CMP_E_NOTCONNECT, "Failed connection to the printer.");
  }
}

export class ConnectNotFound extends PrinterError {
  constructor() {
    super(
      ESCPOSConst.CMP_E_CONNECT_NOTFOUND,
      "Failed to check the support model after connecting to the device.",
    );
  }
}

export class ConnectOffline extends PrinterError {
  constructor() {
    super(
      ESCPOSConst.CMP_E_CONNECT_OFFLINE,
      "Failed to check the printer status after connecting to the device.",
    );
  }
}

export class NoContext extends PrinterError {
  constructor() {
    super(ESCPOSConst.CMP_E_NOCONTEXT, "The context is not specified.");
  }
}

export class BluetoothDisable extends PrinterError {
  constructor() {
    super(
      ESCPOSConst.CMP_E_BT_DISABLE,
      "The setting of the Bluetooth device is invalid.",
    );
  }
}

export class BluetoothNoDevice extends PrinterError {
  constructor() {
    super(ESCPOSConst.CMP_E_BT_NODEVICE, "The Bluetooth device is not found.");
  }
}

export class Illegal extends PrinterError {
  constructor() {
    super(
      ESCPOSConst.CMP_E_ILLEGAL,
      "Unsupported operation with the Device, or an invalid parameter value was used.",
    );
  }
}

export class Offline extends PrinterError {
  constructor() {
    super(ESCPOSConst.CMP_E_OFFLINE, "The printer is off-line.");
  }
}

export class NoExist extends PrinterError {
  constructor() {
    super(ESCPOSConst.CMP_E_NOEXIST, "The file name does not exist.");
  }
}

export class Failure extends PrinterError {
  constructor() {
    super(
      ESCPOSConst.CMP_E_FAILURE,
      "The Service cannot perform the requested procedure.",
    );
  }
}

export class Timeout extends PrinterError {
  constructor() {
    super(
      ESCPOSConst.CMP_E_TIMEOUT,
      "The Service timed out waiting for a response from the printer.",
    );
  }
}

export class NoList extends PrinterError {
  constructor() {
    super(
      ESCPOSConst.CMP_E_NO_LIST,
      "The printer cannot be found in the printer search.",
    );
  }
}

export class NoPrinterExtended extends PrinterError {
  constructor() {
    super(
      ESCPOSConst.CMP_EX_DEV_NO_PRINTER,
      "Failed connection to the printer.",
    );
  }
}

export class OpenErrorExtended extends PrinterError {
  constructor() {
    super(
      ESCPOSConst.CMP_EX_DEV_OPEN_ERROR,
      "Unable to connect socket or port.",
    );
  }
}

export class SendErrorExtended extends PrinterError {
  constructor() {
    super(
      ESCPOSConst.CMP_EX_DEV_SEND_ERROR,
      "Failed to send command to printer.",
    );
  }
}

export class NoResponseExtended extends PrinterError {
  constructor() {
    super(
      ESCPOSConst.CMP_EX_DEV_NO_RESPONSE,
      "No command response from the printer.",
    );
  }
}

export class CoverOpen extends PrinterError {
  constructor() {
    super(ESCPOSConst.CMP_EPTR_COVER_OPEN, "The cover of the printer opens.");
  }
}

export class RecEmpty extends PrinterError {
  constructor() {
    super(ESCPOSConst.CMP_EPTR_REC_EMPTY, "The printer is out of paper.");
  }
}

export class BadFormat extends PrinterError {
  constructor() {
    super(
      ESCPOSConst.CMP_EPTR_BADFORMAT,
      "The specified file is in an unsupported format.",
    );
  }
}

export class TooBig extends PrinterError {
  constructor() {
    super(ESCPOSConst.CMP_EPTR_TOOBIG, "The specified bitmap is too big.");
  }
}

export const getPrintError = (code: number): PrinterError | null => {
  switch (code) {
    case ESCPOSConst.CMP_E_CONNECTED:
      return new Connected();
    case ESCPOSConst.CMP_E_DISCONNECT:
      return new Disconnected();
    case ESCPOSConst.CMP_E_NOTCONNECT:
      return new NotConnected();
    case ESCPOSConst.CMP_E_CONNECT_NOTFOUND:
      return new ConnectNotFound();
    case ESCPOSConst.CMP_E_CONNECT_OFFLINE:
      return new ConnectOffline();
    case ESCPOSConst.CMP_E_NOCONTEXT:
      return new NoContext();
    case ESCPOSConst.CMP_E_BT_DISABLE:
      return new BluetoothDisable();
    case ESCPOSConst.CMP_E_BT_NODEVICE:
      return new BluetoothNoDevice();
    case ESCPOSConst.CMP_E_ILLEGAL:
      return new Illegal();
    case ESCPOSConst.CMP_E_OFFLINE:
      return new Offline();
    case ESCPOSConst.CMP_E_NOEXIST:
      return new NoExist();
    case ESCPOSConst.CMP_E_FAILURE:
      return new Failure();
    case ESCPOSConst.CMP_E_TIMEOUT:
      return new Timeout();
    case ESCPOSConst.CMP_E_NO_LIST:
      return new NoList();
    case ESCPOSConst.CMP_EX_DEV_NO_PRINTER:
      return new NoPrinterExtended();
    case ESCPOSConst.CMP_EX_DEV_OPEN_ERROR:
      return new OpenErrorExtended();
    case ESCPOSConst.CMP_EX_DEV_SEND_ERROR:
      return new SendErrorExtended();
    case ESCPOSConst.CMP_EX_DEV_NO_RESPONSE:
      return new NoResponseExtended();
    case ESCPOSConst.CMP_EPTR_COVER_OPEN:
      return new CoverOpen();
    case ESCPOSConst.CMP_EPTR_REC_EMPTY:
      return new RecEmpty();
    case ESCPOSConst.CMP_EPTR_BADFORMAT:
      return new BadFormat();
    case ESCPOSConst.CMP_EPTR_TOOBIG:
      return new TooBig();
    default:
      return null;
  }
};

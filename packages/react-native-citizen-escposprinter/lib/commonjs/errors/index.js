"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getPrintError = exports.TooBig = exports.Timeout = exports.RecEmpty = exports.PrinterError = exports.Offline = exports.NotConnected = exports.NoList = exports.NoExist = exports.NoContext = exports.Illegal = exports.Failure = exports.Disconnected = exports.CoverOpen = exports.Connected = exports.ConnectOffline = exports.ConnectNotFound = exports.BluetoothNoDevice = exports.BluetoothDisable = exports.BadFormat = void 0;
var _ESCPOSConst = require("../ESCPOSConst");
/**
 * | Return value                  | Description                                                                    |
 * |-------------------------------|--------------------------------------------------------------------------------|
 * | CMP_SUCCESS (0)               | The operation is success.                                                      |
 * | CMP_E_CONNECTED (1001)        | The printer is already connected.                                              |
 * | CMP_E_DISCONNECT (1002)       | The printer is not connected.                                                  |
 * | CMP_E_NOTCONNECT (1003)       | Failed connection to the printer.                                              |
 * | CMP_E_CONNECT_NOTFOUND (1004) | Failed to check the support model after connecting to the device.              |
 * | CMP_E_CONNECT_OFFLINE (1005)  | Failed to check the printer status after connecting to the device.             |
 * | CMP_E_NOCONTEXT (1006)        | The context is not specified.                                                  |
 * | CMP_E_BT_DISABLE (1007)       | The setting of the Bluetooth device is invalid.                                |
 * | CMP_E_BT_NODEVICE (1008)      | The Bluetooth device is not found.                                             |
 * | CMP_E_ILLEGAL (1101)          | Unsupported operation with the Device, or an invalid parameter value was used. |
 * | CMP_E_OFFLINE (1102)          | The printer is off-line.                                                       |
 * | CMP_E_NOEXIST (1103)          | The file name does not exist.                                                  |
 * | CMP_E_FAILURE (1104)          | The Service cannot perform the requested procedure.                            |
 * | CMP_E_TIMEOUT (1105)          | The Service timed out waiting for a response from the printer.                 |
 * | CMP_E_NO_LIST (1106)          | The printer cannot be found in the printer search.                             |
 * | CMP_EPTR_COVER_OPEN (1201)    | The cover of the printer opens.                                                |
 * | CMP_EPTR_REC_EMPTY (1202)     | The printer is out of paper.                                                   |
 * | CMP_EPTR_BADFORMAT (1203)     | The specified file is in an unsupported format.                                |
 * | CMP_EPTR_TOOBIG (1204)        | The specified bitmap is too big.                                        |
 */

class PrinterError extends Error {
  constructor(code, message) {
    super(message);
    this.code = code;
  }
}
exports.PrinterError = PrinterError;
class Connected extends PrinterError {
  constructor() {
    super(_ESCPOSConst.ESCPOSConst.CMP_E_CONNECTED, "The printer is already connected.");
  }
}
exports.Connected = Connected;
class Disconnected extends PrinterError {
  constructor() {
    super(_ESCPOSConst.ESCPOSConst.CMP_E_DISCONNECT, "The printer is not connected.");
  }
}
exports.Disconnected = Disconnected;
class NotConnected extends PrinterError {
  constructor() {
    super(_ESCPOSConst.ESCPOSConst.CMP_E_NOTCONNECT, "Failed connection to the printer.");
  }
}
exports.NotConnected = NotConnected;
class ConnectNotFound extends PrinterError {
  constructor() {
    super(_ESCPOSConst.ESCPOSConst.CMP_E_CONNECT_NOTFOUND, "Failed to check the support model after connecting to the device.");
  }
}
exports.ConnectNotFound = ConnectNotFound;
class ConnectOffline extends PrinterError {
  constructor() {
    super(_ESCPOSConst.ESCPOSConst.CMP_E_CONNECT_OFFLINE, "Failed to check the printer status after connecting to the device.");
  }
}
exports.ConnectOffline = ConnectOffline;
class NoContext extends PrinterError {
  constructor() {
    super(_ESCPOSConst.ESCPOSConst.CMP_E_NOCONTEXT, "The context is not specified.");
  }
}
exports.NoContext = NoContext;
class BluetoothDisable extends PrinterError {
  constructor() {
    super(_ESCPOSConst.ESCPOSConst.CMP_E_BT_DISABLE, "The setting of the Bluetooth device is invalid.");
  }
}
exports.BluetoothDisable = BluetoothDisable;
class BluetoothNoDevice extends PrinterError {
  constructor() {
    super(_ESCPOSConst.ESCPOSConst.CMP_E_BT_NODEVICE, "The Bluetooth device is not found.");
  }
}
exports.BluetoothNoDevice = BluetoothNoDevice;
class Illegal extends PrinterError {
  constructor() {
    super(_ESCPOSConst.ESCPOSConst.CMP_E_ILLEGAL, "Unsupported operation with the Device, or an invalid parameter value was used.");
  }
}
exports.Illegal = Illegal;
class Offline extends PrinterError {
  constructor() {
    super(_ESCPOSConst.ESCPOSConst.CMP_E_OFFLINE, "The printer is off-line.");
  }
}
exports.Offline = Offline;
class NoExist extends PrinterError {
  constructor() {
    super(_ESCPOSConst.ESCPOSConst.CMP_E_NOEXIST, "The file name does not exist.");
  }
}
exports.NoExist = NoExist;
class Failure extends PrinterError {
  constructor() {
    super(_ESCPOSConst.ESCPOSConst.CMP_E_FAILURE, "The Service cannot perform the requested procedure.");
  }
}
exports.Failure = Failure;
class Timeout extends PrinterError {
  constructor() {
    super(_ESCPOSConst.ESCPOSConst.CMP_E_TIMEOUT, "The Service timed out waiting for a response from the printer.");
  }
}
exports.Timeout = Timeout;
class NoList extends PrinterError {
  constructor() {
    super(_ESCPOSConst.ESCPOSConst.CMP_E_NO_LIST, "The printer cannot be found in the printer search.");
  }
}
exports.NoList = NoList;
class CoverOpen extends PrinterError {
  constructor() {
    super(_ESCPOSConst.ESCPOSConst.CMP_EPTR_COVER_OPEN, "The cover of the printer opens.");
  }
}
exports.CoverOpen = CoverOpen;
class RecEmpty extends PrinterError {
  constructor() {
    super(_ESCPOSConst.ESCPOSConst.CMP_EPTR_REC_EMPTY, "The printer is out of paper.");
  }
}
exports.RecEmpty = RecEmpty;
class BadFormat extends PrinterError {
  constructor() {
    super(_ESCPOSConst.ESCPOSConst.CMP_EPTR_BADFORMAT, "The specified file is in an unsupported format.");
  }
}
exports.BadFormat = BadFormat;
class TooBig extends PrinterError {
  constructor() {
    super(_ESCPOSConst.ESCPOSConst.CMP_EPTR_TOOBIG, "The specified bitmap is too big.");
  }
}
exports.TooBig = TooBig;
const getPrintError = code => {
  switch (code) {
    case _ESCPOSConst.ESCPOSConst.CMP_E_CONNECTED:
      return new Connected();
    case _ESCPOSConst.ESCPOSConst.CMP_E_DISCONNECT:
      return new Disconnected();
    case _ESCPOSConst.ESCPOSConst.CMP_E_NOTCONNECT:
      return new NotConnected();
    case _ESCPOSConst.ESCPOSConst.CMP_E_CONNECT_NOTFOUND:
      return new ConnectNotFound();
    case _ESCPOSConst.ESCPOSConst.CMP_E_CONNECT_OFFLINE:
      return new ConnectOffline();
    case _ESCPOSConst.ESCPOSConst.CMP_E_NOCONTEXT:
      return new NoContext();
    case _ESCPOSConst.ESCPOSConst.CMP_E_BT_DISABLE:
      return new BluetoothDisable();
    case _ESCPOSConst.ESCPOSConst.CMP_E_BT_NODEVICE:
      return new BluetoothNoDevice();
    case _ESCPOSConst.ESCPOSConst.CMP_E_ILLEGAL:
      return new Illegal();
    case _ESCPOSConst.ESCPOSConst.CMP_E_OFFLINE:
      return new Offline();
    case _ESCPOSConst.ESCPOSConst.CMP_E_NOEXIST:
      return new NoExist();
    case _ESCPOSConst.ESCPOSConst.CMP_E_FAILURE:
      return new Failure();
    case _ESCPOSConst.ESCPOSConst.CMP_E_TIMEOUT:
      return new Timeout();
    case _ESCPOSConst.ESCPOSConst.CMP_E_NO_LIST:
      return new NoList();
    case _ESCPOSConst.ESCPOSConst.CMP_EPTR_COVER_OPEN:
      return new CoverOpen();
    case _ESCPOSConst.ESCPOSConst.CMP_EPTR_REC_EMPTY:
      return new RecEmpty();
    case _ESCPOSConst.ESCPOSConst.CMP_EPTR_BADFORMAT:
      return new BadFormat();
    case _ESCPOSConst.ESCPOSConst.CMP_EPTR_TOOBIG:
      return new TooBig();
    default:
      return null;
  }
};
exports.getPrintError = getPrintError;
//# sourceMappingURL=index.js.map
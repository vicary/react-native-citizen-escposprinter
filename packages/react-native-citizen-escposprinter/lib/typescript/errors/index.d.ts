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
export declare abstract class PrinterError extends Error {
    readonly code: number;
    constructor(code: number, message: string);
}
export declare class Connected extends PrinterError {
    constructor();
}
export declare class Disconnected extends PrinterError {
    constructor();
}
export declare class NotConnected extends PrinterError {
    constructor();
}
export declare class ConnectNotFound extends PrinterError {
    constructor();
}
export declare class ConnectOffline extends PrinterError {
    constructor();
}
export declare class NoContext extends PrinterError {
    constructor();
}
export declare class BluetoothDisable extends PrinterError {
    constructor();
}
export declare class BluetoothNoDevice extends PrinterError {
    constructor();
}
export declare class Illegal extends PrinterError {
    constructor();
}
export declare class Offline extends PrinterError {
    constructor();
}
export declare class NoExist extends PrinterError {
    constructor();
}
export declare class Failure extends PrinterError {
    constructor();
}
export declare class Timeout extends PrinterError {
    constructor();
}
export declare class NoList extends PrinterError {
    constructor();
}
export declare class CoverOpen extends PrinterError {
    constructor();
}
export declare class RecEmpty extends PrinterError {
    constructor();
}
export declare class BadFormat extends PrinterError {
    constructor();
}
export declare class TooBig extends PrinterError {
    constructor();
}
export declare const getPrintError: (code: number) => PrinterError | null;
//# sourceMappingURL=index.d.ts.map
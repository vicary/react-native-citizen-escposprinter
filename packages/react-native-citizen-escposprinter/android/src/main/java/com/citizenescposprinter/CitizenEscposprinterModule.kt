package com.citizenescposprinter

import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.Promise

import com.citizen.sdk.ESCPOSConst
import com.citizen.sdk.ESCPOSPrinter

class CitizenEscposprinterModule internal constructor(context: ReactApplicationContext) :
  CitizenEscposprinterSpec(context) {

  val printer = ESCPOSPrinter()

  init {
    printer.setContext(context)
  }

  /** TODO: Look up error messages from code. */
  protected fun handleRejection(promise: Promise, errorCode: Int) {
    promise.reject(errorCode.toString())
  }

  override fun getName(): String {
    return NAME
  }

  @ReactMethod
  override fun connect(connectType: Int, address: String, port: Int = 9100, promise: Promise) {
    val ret: Int;

    if (connectType == ESCPOSConst.CMP_PORT_WiFi) {
      ret = printer.connect(connectType, address, port)
    } else if (
      connectType == ESCPOSConst.CMP_PORT_Bluetooth ||
      connectType == ESCPOSConst.CMP_PORT_Bluetooth_Insecure
    ) {
      ret = printer.connect(connectType, address)
    } else if (connectType == ESCPOSConst.CMP_PORT_USB) {
      ret = printer.connect(connectType)
    } else {
      ret = ESCPOSConst.CMP_E_ILLEGAL
    }

    if (ret == ESCPOSConst.CMP_SUCCESS) {
      promise.resolve()
    } else {
      handleRejection(promise, ret)
    }
  }

  @ReactMethod
  override fun disconnect(promise: Promise) {
    val ret = printer.disconnect()

    if (ret == ESCPOSConst.CMP_SUCCESS) {
      promise.resolve()
    } else {
      handleRejection(promise, ret)
    }
  }

  @ReactMethod
  override fun setEncoding(encoding: String, promise: Promise) {
    val ret = printer.setEncoding(encoding)

    if (ret == ESCPOSConst.CMP_SUCCESS) {
      promise.resolve()
    } else {
      handleRejection(promise, ret)
    }
  }

  @ReactMethod
  override fun printerCheck(promise: Promise) {
    val ret = printer.printerCheck()

    if (ret == ESCPOSConst.CMP_SUCCESS) {
      promise.resolve()
    } else {
      handleRejection(promise, ret)
    }
  }

  @ReactMethod
  override fun status(type: Int, promise: Promise) {
    val status = if (type > 0) printer.status(type) else printer.status()

    promise.resolve(status)
  }

  @ReactMethod
  override fun printText(data: String, alignment: Int, attribute: Int, textSize: Int, promise: Promise) {
    val ret = printer.printText(data, alignment, attribute, textSize)

    if (ret == ESCPOSConst.CMP_SUCCESS) {
      promise.resolve()
    } else {
      handleRejection(promise, ret)
    }
  }

  @ReactMethod
  override fun printPaddingText(
    data: String,
    attribute: Int,
    textSize: Int,
    length: Int,
    side: Int,
    promise: Promise
  ) {
    val ret = printer.printPaddingText(data, attribute, textSize, length, side)

    if (ret == ESCPOSConst.CMP_SUCCESS) {
      promise.resolve()
    } else {
      handleRejection(promise, ret)
    }
  }

  @ReactMethod
  override fun searchESCPOSPrinter(ifType: Int, timeout: Int, promise: Promise) {
    val errorCode = IntArray(1)
    val printers = printer.searchESCPOSPrinter(
          ESCPOSConst.CMP_PORT_WiFi,
          3,
          errorCode
        );
    val result = ArrayList<String>();

    if (errorCode[0] != ESCPOSConst.CMP_E_NO_LIST) {
      handleRejection(promise, errorCode[0])
    } else if (errorCode[0] == CMP_SUCCESS) {
      result += errorCode[0].toString()
      result.addAll(printers)
    }

    promise.resolve(
      Arguments.makeNativeArray(
        result
      )
    )
  }

  companion object {
    const val NAME = "CitizenEscposprinter"
  }
}

package com.citizenescposprinter

import android.graphics.Typeface
import android.util.Base64
import androidx.lifecycle.ViewTreeLifecycleOwner
import androidx.lifecycle.lifecycleScope
import com.citizen.sdk.CitizenPrinterInfo
import com.citizen.sdk.ESCPOSConst
import com.citizen.sdk.ESCPOSPrinter
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactMethod
import kotlin.comparisons.compareBy
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.GlobalScope
import kotlinx.coroutines.launch

class CitizenEscposprinterModule internal constructor(context: ReactApplicationContext) :
    CitizenEscposprinterSpec(context) {

  val printer = ESCPOSPrinter()

  init {
    printer.setContext(context)
  }

  companion object {
    const val NAME = "CitizenEscposprinter"
  }

  override fun getName(): String {
    return NAME
  }

  protected val coroutineScope: CoroutineScope
    get() {
      val view = getCurrentActivity()?.getCurrentFocus()
      if (view != null) {
        val scope = ViewTreeLifecycleOwner.get(view)?.lifecycleScope
        if (scope != null) {
          return scope
        }
      }

      return GlobalScope
    }

  /** TODO: Look up error messages from code. */
  protected fun handleRejection(promise: Promise, errorCode: Int) {
    promise.reject("ESCPOSPrinter", errorCode.toString())
  }
  protected fun handleRejection(promise: Promise, error: Throwable) {
    promise.reject("ESCPOSPrinter", error)
  }

  @ReactMethod
  override fun connect(
      connectType: Int,
      address: String,
      port: Int,
      timeout: Int,
      promise: Promise
  ) {
    coroutineScope.launch {
      val ret =
          when (connectType) {
            ESCPOSConst.CMP_PORT_WiFi ->
                if (port > 0)
                    if (timeout > 0) printer.connect(connectType, address, port, timeout)
                    else printer.connect(connectType, address, port)
                else printer.connect(connectType, address)
            ESCPOSConst.CMP_PORT_Bluetooth, ESCPOSConst.CMP_PORT_Bluetooth_Insecure ->
                printer.connect(connectType, address)
            // ESCPOSConst.CMP_PORT_USB -> printer.connect(connectType, device)
            else -> ESCPOSConst.CMP_E_ILLEGAL
          }

      if (ret == ESCPOSConst.CMP_SUCCESS) {
        promise.resolve(null)
      } else {
        handleRejection(promise, ret)
      }
    }
  }

  @ReactMethod
  override fun disconnect(promise: Promise) {
    coroutineScope.launch {
      val ret = printer.disconnect()

      if (ret == ESCPOSConst.CMP_SUCCESS) {
        promise.resolve(null)
      } else {
        handleRejection(promise, ret)
      }
    }
  }

  @ReactMethod
  override fun setEncoding(encoding: String, promise: Promise) {
    coroutineScope.launch {
      val ret = printer.setEncoding(encoding)
      if (ret == ESCPOSConst.CMP_SUCCESS) {
        promise.resolve(null)
      } else {
        handleRejection(promise, ret)
      }
    }
  }

  @ReactMethod
  override fun printerCheck(promise: Promise) {
    coroutineScope.launch {
      val ret = printer.printerCheck()

      if (ret == ESCPOSConst.CMP_SUCCESS) {
        promise.resolve(null)
      } else {
        handleRejection(promise, ret)
      }
    }
  }

  @ReactMethod
  override fun status(type: Int, promise: Promise) {
    coroutineScope.launch {
      val status = if (type > 0) printer.status(type) else printer.status()

      promise.resolve(status)
    }
  }

  @ReactMethod
  override fun printText(
      data: String,
      alignment: Int,
      attribute: Int,
      textSize: Int,
      promise: Promise
  ) {
    coroutineScope.launch {
      val ret = printer.printText(data, alignment, attribute, textSize)

      if (ret == ESCPOSConst.CMP_SUCCESS) {
        promise.resolve(null)
      } else {
        handleRejection(promise, ret)
      }
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
    coroutineScope.launch {
      val ret = printer.printPaddingText(data, attribute, textSize, length, side)

      if (ret == ESCPOSConst.CMP_SUCCESS) {
        promise.resolve(null)
      } else {
        handleRejection(promise, ret)
      }
    }
  }

  @ReactMethod
  override fun printTextLocalFont(
      data: String,
      alignment: Int,
      fontType: String,
      point: Int,
      style: Int,
      hRatio: Int,
      vRatio: Int,
      promise: Promise
  ) {
    coroutineScope.launch {
      val font =
          when (fontType) {
            "DEFAULT" -> Typeface.DEFAULT
            "DEFAULT_BOLD" -> Typeface.DEFAULT_BOLD
            "MONOSPACE" -> Typeface.MONOSPACE
            "SANS_SERIF" -> Typeface.SANS_SERIF
            "SERIF" -> Typeface.SERIF
            else -> null
          }

      if (font != null) {
        val ret = printer.printTextLocalFont(data, alignment, font, point, style, hRatio, vRatio)

        if (ret == ESCPOSConst.CMP_SUCCESS) {
          promise.resolve(null)
        } else {

          handleRejection(promise, ret)
        }
      }
    }
  }

  @ReactMethod
  override fun printBitmap(data: String, width: Int, alignment: Int, mode: Int, promise: Promise) {
    coroutineScope.launch {
      try {

        val bytes = Base64.decode(data, Base64.DEFAULT)
        val ret: Int

        if (mode > 0) {
          ret = printer.printBitmap(bytes, width, alignment, mode)
        } else {
          ret = printer.printBitmap(bytes, width, alignment)
        }

        if (ret == ESCPOSConst.CMP_SUCCESS) {
          promise.resolve(null)
        } else {
          handleRejection(promise, ret)
        }
      } catch (e: Throwable) {
        handleRejection(promise, e)
      }
    }
  }

  @ReactMethod
  override fun printBarCode(
      data: String,
      symbology: Int,
      height: Int,
      width: Int,
      alignment: Int,
      textPosition: Int,
      promise: Promise
  ) {
    coroutineScope.launch {
      val ret = printer.printBarCode(data, symbology, height, width, alignment, textPosition)

      if (ret == ESCPOSConst.CMP_SUCCESS) {
        promise.resolve(null)
      } else {
        handleRejection(promise, ret)
      }
    }
  }

  @ReactMethod
  override fun printPDF417(
      data: String,
      digits: Int,
      steps: Int,
      moduleWidth: Int,
      stepHeight: Int,
      ECLevel: Int,
      alignment: Int,
      promise: Promise
  ) {
    coroutineScope.launch {
      val ret =
          printer.printPDF417(data, digits, steps, moduleWidth, stepHeight, ECLevel, alignment)

      if (ret == ESCPOSConst.CMP_SUCCESS) {
        promise.resolve(null)
      } else {
        handleRejection(promise, ret)
      }
    }
  }

  @ReactMethod
  override fun printQRCode(
      data: String,
      moduleSize: Int,
      ECLevel: Int,
      alignment: Int,
      promise: Promise
  ) {
    coroutineScope.launch {
      val ret = printer.printQRCode(data, moduleSize, ECLevel, alignment)

      if (ret == ESCPOSConst.CMP_SUCCESS) {
        promise.resolve(null)
      } else {
        handleRejection(promise, ret)
      }
    }
  }

  @ReactMethod
  override fun printGS1DataBarStacked(
      data: String,
      symbology: Int,
      moduleSize: Int,
      maxSize: Int,
      alignment: Int,
      promise: Promise
  ) {
    coroutineScope.launch {
      val ret = printer.printGS1DataBarStacked(data, symbology, moduleSize, maxSize, alignment)

      if (ret == ESCPOSConst.CMP_SUCCESS) {
        promise.resolve(null)
      } else {
        handleRejection(promise, ret)
      }
    }
  }

  @ReactMethod
  override fun cutPaper(type: Int, promise: Promise) {
    coroutineScope.launch {
      val ret = printer.cutPaper(type)

      if (ret == ESCPOSConst.CMP_SUCCESS) {
        promise.resolve(null)
      } else {
        handleRejection(promise, ret)
      }
    }
  }

  @ReactMethod
  override fun unitFeed(ufCount: Int, promise: Promise) {
    coroutineScope.launch {
      val ret = printer.unitFeed(ufCount)

      if (ret == ESCPOSConst.CMP_SUCCESS) {
        promise.resolve(null)
      } else {
        handleRejection(promise, ret)
      }
    }
  }

  @ReactMethod
  override fun markFeed(type: Int, promise: Promise) {
    coroutineScope.launch {
      val ret = printer.markFeed(type)

      if (ret == ESCPOSConst.CMP_SUCCESS) {
        promise.resolve(null)
      } else {
        handleRejection(promise, ret)
      }
    }
  }

  @ReactMethod
  override fun openDrawer(drawer: Int, pulseLen: Int, promise: Promise) {
    coroutineScope.launch {
      val ret = printer.openDrawer(drawer, pulseLen)

      if (ret == ESCPOSConst.CMP_SUCCESS) {
        promise.resolve(null)
      } else {
        handleRejection(promise, ret)
      }
    }
  }

  @ReactMethod
  override fun transactionPrint(control: Int, promise: Promise) {
    coroutineScope.launch {
      val ret = printer.transactionPrint(control)

      if (ret == ESCPOSConst.CMP_SUCCESS) {
        promise.resolve(null)
      } else {
        handleRejection(promise, ret)
      }
    }
  }

  @ReactMethod
  override fun rotatePrint(rotation: Int, promise: Promise) {
    coroutineScope.launch {
      val ret = printer.rotatePrint(rotation)

      if (ret == ESCPOSConst.CMP_SUCCESS) {
        promise.resolve(null)
      } else {
        handleRejection(promise, ret)
      }
    }
  }

  @ReactMethod
  override fun pageModePrint(control: Int, promise: Promise) {
    coroutineScope.launch {
      val ret = printer.pageModePrint(control)

      if (ret == ESCPOSConst.CMP_SUCCESS) {
        promise.resolve(null)
      } else {
        handleRejection(promise, ret)
      }
    }
  }

  @ReactMethod
  override fun clearPrintArea(promise: Promise) {
    coroutineScope.launch {
      val ret = printer.clearPrintArea()

      if (ret == ESCPOSConst.CMP_SUCCESS) {
        promise.resolve(null)
      } else {
        handleRejection(promise, ret)
      }
    }
  }

  @ReactMethod
  override fun clearOutput(promise: Promise) {
    coroutineScope.launch {
      val ret = printer.clearOutput()

      if (ret == ESCPOSConst.CMP_SUCCESS) {
        promise.resolve(null)
      } else {
        handleRejection(promise, ret)
      }
    }
  }

  @ReactMethod
  override fun printData(data: String, promise: Promise) {
    coroutineScope.launch {
      val bytes = Base64.decode(data, Base64.DEFAULT)
      val ret = printer.printData(bytes)

      if (ret == ESCPOSConst.CMP_SUCCESS) {
        promise.resolve(null)
      } else {
        handleRejection(promise, ret)
      }
    }
  }

  @ReactMethod
  override fun printNormal(data: String, promise: Promise) {
    coroutineScope.launch {
      val ret = printer.printNormal(data)

      if (ret == ESCPOSConst.CMP_SUCCESS) {
        promise.resolve(null)
      } else {
        handleRejection(promise, ret)
      }
    }
  }

  @ReactMethod
  override fun printNVBitmap(nvImageNumber: Int, promise: Promise) {
    coroutineScope.launch {
      val ret = printer.printNVBitmap(nvImageNumber)

      if (ret == ESCPOSConst.CMP_SUCCESS) {
        promise.resolve(null)
      } else {
        handleRejection(promise, ret)
      }
    }
  }

  @ReactMethod
  override fun searchCitizenPrinter(connectType: Int, timeout: Int, promise: Promise) {
    coroutineScope.launch {
      val errorCode = IntArray(1)
      val printers = printer.searchCitizenPrinter(connectType, timeout, errorCode)
      val result = Arguments.createArray()

      if (errorCode[0] == ESCPOSConst.CMP_SUCCESS) {
        if (errorCode[0] != ESCPOSConst.CMP_E_NO_LIST) {
          printers.sortedWith(
              compareBy(String.CASE_INSENSITIVE_ORDER) { it: CitizenPrinterInfo -> it.ipAddress }
                  .thenBy(String.CASE_INSENSITIVE_ORDER) { it.macAddress }
                  .thenBy(String.CASE_INSENSITIVE_ORDER) { it.deviceName }
                  .thenBy(String.CASE_INSENSITIVE_ORDER) { it.bdAddress }
          )

          printers.forEach {
            val map = Arguments.createMap()

            if (!it.ipAddress.isNullOrEmpty()) map.putString("ipAddress", it.ipAddress)
            if (!it.macAddress.isNullOrEmpty()) map.putString("macAddress", it.macAddress)
            if (!it.deviceName.isNullOrEmpty()) map.putString("deviceName", it.deviceName)
            if (!it.bdAddress.isNullOrEmpty()) map.putString("bdAddress", it.bdAddress)

            result.pushMap(map)
          }
        }
      } else {
        handleRejection(promise, errorCode[0])
      }

      promise.resolve(result)
    }
  }

  @ReactMethod
  override fun searchESCPOSPrinter(connectType: Int, timeout: Int, promise: Promise) {
    coroutineScope.launch {
      val errorCode = IntArray(1)
      val printers = printer.searchESCPOSPrinter(connectType, timeout, errorCode)
      val result = ArrayList<String>()

      printers.sort()

      if (errorCode[0] == ESCPOSConst.CMP_SUCCESS) {
        if (errorCode[0] != ESCPOSConst.CMP_E_NO_LIST) {
          result.addAll(printers)
        }
      } else {
        handleRejection(promise, errorCode[0])
      }

      promise.resolve(Arguments.makeNativeArray(result))
    }
  }

  @ReactMethod
  override fun printerCheckEx(
      connectType: Int,
      address: String,
      port: Int?,
      timeout: Int?,
      promise: Promise
  ) {
    coroutineScope.launch {
      val status = IntArray(1)
      val ret =
          when (connectType) {
            ESCPOSConst.CMP_PORT_WiFi ->
                if (port != null)
                    if (timeout != null)
                        printer.printerCheckEx(status, connectType, address, port, timeout)
                    else printer.printerCheckEx(status, connectType, address, port)
                else printer.printerCheckEx(status, connectType, address)
            ESCPOSConst.CMP_PORT_Bluetooth, ESCPOSConst.CMP_PORT_Bluetooth_Insecure ->
                printer.printerCheckEx(status, connectType, address)
            // ESCPOSConst.CMP_PORT_USB -> printer.connect(connectType, device)
            else -> ESCPOSConst.CMP_E_ILLEGAL
          }

      if (ret == ESCPOSConst.CMP_SUCCESS) {
        promise.resolve(status[0])
      } else {
        handleRejection(promise, ret)
      }
    }
  }

  @ReactMethod
  override fun openDrawerEx(
      drawer: Int,
      pulseLen: Int,
      connectType: Int,
      address: String,
      port: Int?,
      timeout: Int?,
      promise: Promise
  ) {
    coroutineScope.launch {
      val ret =
          when (connectType) {
            ESCPOSConst.CMP_PORT_WiFi ->
                if (port != null)
                    if (timeout != null)
                        printer.openDrawerEx(drawer, pulseLen, connectType, address, port, timeout)
                    else printer.openDrawerEx(drawer, pulseLen, connectType, address, port)
                else printer.openDrawerEx(drawer, pulseLen, connectType, address)
            ESCPOSConst.CMP_PORT_Bluetooth, ESCPOSConst.CMP_PORT_Bluetooth_Insecure ->
                printer.openDrawerEx(drawer, pulseLen, connectType, address)
            // ESCPOSConst.CMP_PORT_USB -> printer.connect(connectType, device)
            else -> ESCPOSConst.CMP_E_ILLEGAL
          }

      if (ret == ESCPOSConst.CMP_SUCCESS) {
        promise.resolve(null)
      } else {
        handleRejection(promise, ret)
      }
    }
  }

  @ReactMethod
  override fun setPrintCompletedTimeout(timeout: Int, promise: Promise) {
    coroutineScope.launch {
      val ret = printer.setPrintCompletedTimeout(timeout)

      if (ret == ESCPOSConst.CMP_SUCCESS) {
        promise.resolve(null)
      } else {
        handleRejection(promise, ret)
      }
    }
  }

  @ReactMethod
  override fun setLog(mode: Int, path: String, maxSize: Int, promise: Promise) {
    coroutineScope.launch {
      printer.setLog(mode, path, maxSize)
      promise.resolve(null)
    }
  }

  @ReactMethod
  override fun getVersionCode(promise: Promise) {
    val versionCode = printer.getVersionCode()
    promise.resolve(versionCode)
  }

  @ReactMethod
  override fun getVersionName(promise: Promise) {
    val versionName = printer.getVersionName()
    promise.resolve(versionName)
  }
}
